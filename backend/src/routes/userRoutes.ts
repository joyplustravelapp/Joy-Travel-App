import express, { Request, response, Response } from "express";
import User, { IUser } from "../models/User";
import multer from "multer";
import path from "path";
import fs from "fs";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"; // Import bcrypt for password hashing
import nodemailer from "nodemailer";
import twilio from "twilio";
import { error } from "console";

const router = express.Router();
const otpStore: { [key: string]: { otp: string; expiresAt: number } } = {}; // Temporary store

// Nodemailer setup for email OTP
const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 465,
  secure: true,
  auth: {
    user: "rgoyal4122@gmail.com",
    pass: "vrolxlszdhowpkxt",
  },
});

// Twilio setup for SMS OTP
const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID || "ACd73329dd7ccb6f7036176c28af07c3a0",
  process.env.TWILIO_AUTH_TOKEN || "36181e0def19e443e5850d2cce25547d"
);

// Generate a random OTP
const generateOTP = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

// Send OTP to email or phone
router.post("/send-otp", async (req: Request, res: Response): Promise<any> => {
  const { email, phone } = req.body;
  const otp = generateOTP();
  const expiresAt =
    Date.now() + parseInt(process.env.OTP_EXPIRATION || "300") * 1000;

  try {
    if (email) {
      // Send OTP via email
      await transporter.sendMail(
        {
          from: process.env.EMAIL_USER,
          to: email,
          subject: "Your OTP Code",
          text: `Your OTP code is ${otp}`,
        },
        (error, emailResponse) => {
          if (error) throw error;
          console.log("success");
          response.end();
        }
      );
    } else if (phone) {
      // Send OTP via SMS
      await twilioClient.messages
        .create({
          body: `Your OTP code is ${otp}`,
          messagingServiceSid: "MG68193725a56b3ecd78baa66050e644e0",
          to: "+919635257519",
        })
        .then(() => res.status(200).json({ msg: "Message Sent" }));
    } else {
      return res
        .status(400)
        .json({ message: "Email or phone number is required" });
    }

    // Store OTP in memory
    const key = email || phone;
    otpStore[key] = { otp, expiresAt };

    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error sending OTP", error });
  }
});

// Verify OTP
router.post("/verify-otp", (req: Request, res: Response): any => {
  const { email, phone, otp } = req.body;
  const key = email || phone;

  if (!otpStore[key]) {
    return res.status(400).json({ message: "No OTP found or OTP expired" });
  }

  const { otp: storedOtp, expiresAt } = otpStore[key];

  // Check if OTP is expired
  if (Date.now() > expiresAt) {
    delete otpStore[key];
    return res.status(400).json({ message: "OTP has expired" });
  }

  // Verify OTP
  if (otp !== storedOtp) {
    return res.status(400).json({ message: "Incorrect OTP" });
  }

  // OTP is correct, proceed to the next step
  delete otpStore[key];
  res.status(200).json({ message: "OTP verified successfully" });
});

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
// router.post(
//   "/create",
//   // upload.single("profilePicture"),
//   async (req: Request, res: Response): Promise<any> => {
//     console.log(req.body);
//     const { email, password }: IUser = req.body;
//     console.log(JSON.stringify(email), password);
//     try {
//       // const profilePicturePath = req.file
//       //   ? `/uploads/${req.file.filename}`
//       //   : null; // Path to the uploaded file

//       // Hash the password before saving it
//       const hashedPassword = await bcrypt.hash(password, 10);
//       console.log(hashedPassword);
//       const userProfile = {
//         ...req.body,
//         password: hashedPassword,
//         // profilePicture: profilePicturePath,
//       };
//       console.log(userProfile);
//       const existingUser = await User.findOne({
//         email,
//       });
//       if (existingUser) {
//         return res.status(400).json({ message: "Email already in use" });
//       }

//       const newUser = new User(userProfile);
//       console.log(newUser);
//       await newUser.save();
//       const userId = newUser._id;
//       const secret = process.env.JWT_SECRET as string;
//       const token = await jwt.sign({ userId }, secret);

//       res.status(201).json({ message: "User created successfully", token });
//     } catch (error) {
//       res.status(500).json({ message: "Error creating profile", error });
//     }
//   }
// );
router.post("/create", async (req: Request, res: Response): Promise<any> => {
  const { email, password }: IUser = req.body;
  console.log("Request body:", req.body);

  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    console.log("Email:", email, "Password:", password);

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed Password:", hashedPassword);

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const userProfile = {
      ...req.body,
      password: hashedPassword,
    };

    const newUser = new User(userProfile);
    await newUser.save();
    console.log("User saved successfully:", newUser);

    const secret = process.env.JWT_SECRET as string;
    const token = await jwt.sign({ userId: newUser._id }, secret);

    res.status(201).json({ message: "User created successfully", token });
  } catch (error: any) {
    console.error("Error creating profile:", error);
    res
      .status(500)
      .json({ message: "Error creating profile", error: error.message });
  }
});


// Login user
router.post("/login", async (req: Request, res: Response): Promise<any> => {
  const { email, password } = req.body;

  try {
    // Find user by username
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const userId = user._id;
    const secret = process.env.JWT_SECRET as string;
    const token = await jwt.sign({ userId }, secret);

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
});

// Update existing user profile
router.put(
  "/edit/:id",
  upload.single("profilePicture"),
  async (req: Request, res: Response): Promise<any> => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const { username, email }: IUser = req.body;

      // Check if username or email already exists (excluding the current user)
      const existingUser = await User.findOne({
        $or: [{ username }, { email }],
        _id: { $ne: req.params.id },
      });
      if (existingUser) {
        return res
          .status(400)
          .json({ message: "Username or email already in use" });
      }

      // Update profile picture if a new one is uploaded
      const profilePicturePath = req.file
        ? `/uploads/${req.file.filename}`
        : user.profilePicture; // Keep the old picture if no new file is uploaded

      // Update user profile with new data
      const updatedProfile = {
        ...req.body,
        profilePicture: profilePicturePath,
      };

      // Perform the update
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { $set: updatedProfile },
        { new: true } // Return the updated document
      );

      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: "Error updating profile", error });
    }
  }
);

export default router;
