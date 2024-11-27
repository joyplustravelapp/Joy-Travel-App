import express, { Request, response, Response } from "express";
import User, { IUser } from "../models/User";
import multer from "multer";
import path from "path";
import fs from "fs";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"; // Import bcrypt for password hashing

import { error } from "console";
import Plan, { IPlan } from "../models/Plan";

const router = express.Router();

// Multer configuration for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, "../uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext); // Rename the file with a timestamp
  },
});

// File filter to only accept images
const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// Create the multer instance
const upload = multer({ storage, fileFilter });

// Get user profile by ID
router.get("/:id", async (req: Request, res: Response): Promise<any> => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching profile", error });
  }
});

// Create new user profile
router.post(
  "/createPlan",
  upload.single("planImage"),
  async (req: Request, res: Response): Promise<any> => {
    const {
      planName,
      email,
      from,
      to,
      planDescription,
      interests,
      destinations,
    }: IPlan = req.body;

    try {
      const planImagePath = req.file
        ? `/uploads/plans/${req.file.filename}`
        : null; // Path to the uploaded file

      const plan = {
        ...req.body,
        planImage: planImagePath,
      };

      const existingUser = await User.findOne({
        email,
      });
      if (!existingUser) {
        return res.status(400).json({ message: "Un-Authorized User" });
      }

      const newPlan = new Plan(plan);
      await newPlan.save();
      const planId = newPlan._id;

      res.status(201).json({ message: "Plan created successfully", planId });
    } catch (error) {
      res.status(500).json({ message: "Error creating plan", error });
    }
  }
);

export default router;
