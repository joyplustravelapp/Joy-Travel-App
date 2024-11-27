// const upcomingTrips = [
//   {
//     id: "1",
//     title: "Backpacking Vietnam - South to North 🇻🇳",
//     location: "Vietnam",
//     date: "March 20 - March 30",
//     image: "rectangle-3372.png",
//   },
//   {
//     id: "2",
//     title: "Backpacking Vietnam - South to North 🇻🇳",
//     location: "Vietnam",
//     date: "March 20 - March 30",
//     image: "rectangle-3372.png",
//   },
//   // Add more trips as needed
// ];

import express, { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import Plan from "../models/Plan";
import User, { IUser } from "../models/User";

const router = express.Router();

// Extended Request interface to include user
export interface RequestWithUser extends Request {
  user?: IUser;
}

// JWT payload interface
interface JWTPayload extends JwtPayload {
  id: string;
}

// Middleware to verify JWT token
const verifyToken = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      res.status(401).json({ message: "Access token is missing" });
      return;
    }

    // Extract token from "Bearer <token>"
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.slice(7)
      : authHeader;

    //   console.log(token);
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not configured");
    }
    // Verify and decode token
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as JWTPayload;
    // Find user
    const user = await User.findById(decoded.userId);
    // console.log(user);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    req.user = user;
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      res.status(403).json({ message: "Invalid or expired token" });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
};

// Route to get upcoming trips
router.get(
  "/upcoming-trips",
  verifyToken,
  async (req: RequestWithUser, res: Response): Promise<void> => {
    // console.log(req.user?._id?.toString());
    try {
      if (!req.user) {
        res.status(401).json({ message: "User not authenticated" });
        return;
      }
      const userEmail = req.user.email;

      if (!userEmail) {
        res.status(400).json({ message: "User email not found" });
        return;
      }
      // Fetch upcoming trips where the user's email matches
      const today = new Date();
      const upcomingTrips = await Plan.find({
        $or: [
          { email: userEmail }, // Condition for the user's email
          { companions: req.user?._id?.toString() }, // Condition for user ID in companions array
        ],
        from: { $gte: today }, // Condition for upcoming dates
      })
        .sort({ from: 1 }) // Sort by date in ascending order
        .lean(); // Return plain JavaScript objects // Convert to plain JavaScript objects
      console.log(upcomingTrips);
      res.json({
        success: true,
        upcomingTrips,
      });
    } catch (error) {
      console.error("Error fetching upcoming trips:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch upcoming trips",
      });
    }
  }
);

//Route for a specific plan
router.get(
  "/trip/:id",
  verifyToken,
  async (req: RequestWithUser, res: Response): Promise<void> => {
    try {
      const trip = await Plan.findById(req.params.id).sort({ from: 1 }).lean();

      if (!trip) {
        res.status(401).json({ message: "Trip not found" });
        return;
      }

      console.log(trip);
      res.json({
        success: true,
        trip,
      });
    } catch (error) {
      console.error("Error fetching upcoming trips:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch upcoming trips",
      });
    }
  }
);

//Route for trending trips
router.get(
  "/trending-trips",
  verifyToken,
  async (req: RequestWithUser, res: Response): Promise<void> => {
    try {
      if (!req.user) {
        res.status(401).json({ message: "User not authenticated" });
        return;
      }

      const userEmail = req.user.email;

      if (!userEmail) {
        res.status(400).json({ message: "User email not found" });
        return;
      }
      // Fetch upcoming trips where the user's email matches
      const today = new Date();
      console.log(today);
      //   const upcomingTrips = await Plan.find({
      //     from: { $gte: today },
      //   })
      //     .sort({ from: 1 })
      //     .lean(); // Convert to plain JavaScript objects
      const trending = await Plan.aggregate([
        {
          $match: {
            from: { $gte: today },
          },
        },
        {
          $addFields: {
            companionsCount: { $size: "$companions" },
          },
        },
        {
          $sort: { companionsCount: -1 }, // Sort by the number of companions in descending order
        },
        {
          $limit: 3, // Get only the plan with the most companions
        },
      ]);
      console.log(trending);
      res.json({
        success: true,
        trending,
      });
    } catch (error) {
      console.error("Error fetching upcoming trips:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch upcoming trips",
      });
    }
  }
);
export default router;
