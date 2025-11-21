import { validationResult } from "express-validator";
import * as userService from "../services/user.service.js";
import userModel from "../models/user.model.js";
import redisClinet from "../services/redis.service.js";

export const createUserController = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await userService.createUser(req.body);
    const token = user.generateJWT();

    res.status(201).json({ user, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const loginController = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, password } = req.body;

    // 1️⃣ Find user
    const user = await userModel.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json({ errors: "Invalid credentials" });
    }

    // 2️⃣ Compare password
    const isMatch = await user.isValidPassword(password);

    if (!isMatch) {
      return res.status(400).json({ errors: "Invalid password" });
    }

    // 3️⃣ Generate token
    const token = user.generateJWT();

    res.status(200).json({
      message: "Login successful",
      user,
      token,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const profileController = async (req, res) => {
  console.log(req.user);

  res.status(200).json({
    user: req.user,
  });
};

export const logoutController = async (req, res) => {
  try {
    const token = req.cookies.token || req.headers.authorization.split(" ")[1];

    redisClinet.set(token, "logout", "EX", 60 * 60 * 24);

    delete user._doc.password;

    res.status(201).json({
      message: "logout succ",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};
