import { validationResult } from "express-validator";
import UserModel from "../models/user.model.js";
import * as projectService from "../services/project.service.js";

export const createProject = async (req, res) => {
  console.log("📌 createProject controller reached");
  console.log("➡️ Incoming Request Body:", req.body);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("❌ Validation Errors:", errors.array());
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name } = req.body; // no need for email
    console.log("🔍 Extracted name:", name);

    // Use logged-in user's ID from JWT
    const userId = req.user.id;
    console.log("✅ Logged-in User ID from JWT:", userId);

    // Create project
    console.log("🛠 Calling projectService.createProject...");
    const newProject = await projectService.createProject({ name, userId });

    console.log("🎉 Project created successfully:", newProject);

    res.status(201).json({
      message: "Project created successfully",
      project: newProject,
    });
  } catch (error) {
    console.error("🚨 Error in createProject:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getAllProject = async (req, res) => {
  try {
    const loggedInUser = await UserModel.findOne({
      email: req.user.email,
    });

    const allUserProjects = await projectService.getAllProjectByuserId({
      userId: loggedInUser._id,
    });

    return res.status(200).json({
      projects: allUserProjects,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

export const addUserToProject = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { projectId, users } = req.body;

    const loggedInUser = await userModel.findOne({
      email: req.user.email,
    });

    const project = await projectService.addUsersToProject({
      projectId,
      users,
      userId: loggedInUser._id,
    });

    return res.status(200).json({
      project,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
};
