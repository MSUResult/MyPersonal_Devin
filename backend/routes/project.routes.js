import { Router } from "express";
import { body } from "express-validator";
import * as projectController from "../controller/project.controller.js";
import * as authMiddleWare from "../middleware/auth.middleware.js";

const router = Router();

console.log("📌 Project routes initialized");

router.post(
  "/create",
  authMiddleWare.authUser,
  body("name").isString().withMessage("Name is required"),
  (req, res, next) => {
    console.log("📌 POST /projects/create hit");
    next();
  },
  projectController.createProject
);

router.get("/all", authMiddleWare.authUser, projectController.getAllProject);

router.put(
  "/add-user",
  authMiddleWare.authUser,
  body("projectId").isString().withMessage("Project ID is required"),
  body("users")
    .isArray({ min: 1 })
    .withMessage("Users must be an array of strings")
    .bail()
    .custom((users) => users.every((user) => typeof user === "string"))
    .withMessage("Each user must be a string"),
  projectController.addUserToProject
);


router.get('/get-project/:projectId',
    authMiddleWare.authUser,
    projectController.getProjectById
)

export default router;
