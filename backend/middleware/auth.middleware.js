import jwt from "jsonwebtoken";
import redisClinet from "../services/redis.service.js";

export const authUser = async (req, res, next) => {
  try {
    let token = null;

    // Log incoming headers and cookies
    console.log("🔍 Cookies:", req.cookies);
    console.log("🔍 Authorization Header:", req.headers.authorization);

    if (req.cookies.token) {
      token = req.cookies.token;
    } else if (req.headers.authorization) {
      token = req.headers.authorization.split(" ")[1];
    }

    console.log("🔍 Extracted Token:", token);

    if (!token) {
      return res.status(401).send({ error: "No token provided" });
    }

    const isBlackListed = await redisClinet.get(token);

    if (isBlackListed) {
      res.cookie(token, "");
      return res.status(401).send({ error: "Unauthorized token" });
    }

    console.log("🔍 Verifying token with secret:", process.env.JWT_SECRET);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("✅ Decoded Token:", decoded);

    req.user = decoded;
    next();
  } catch (error) {
    console.log("❌ JWT ERROR:", error.message);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};
