import { Request, Response } from "express";
import User from "../models/userModel";

interface AuthenticatedRequest extends Request {
  userId?: string; 
}

// Get current user
const getCurrentUser = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(400).json({ message: "User ID is missing" });
    }

    const currentUser = await User.findById(userId);

    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(currentUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "User can't be found, something went wrong" });
  }
};

// Create current user
const createCurrentUser = async (req: Request, res: Response) => {
  try {
    const { auth0Id } = req.body;
    const existingUser = await User.findOne({ auth0Id });

    if (existingUser) {
      return res.status(200).send();
    }

    const newUser = new User(req.body);
    await newUser.save();

    res.status(201).json(newUser.toObject());
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating user" });
  }
};

// Update current user
const updateCurrentUser = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { name, addressLine1, country, city } = req.body;
    const userId = req.userId;

    if (!userId) {
      return res.status(400).json({ message: "User ID is missing" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = name || user.name;
    user.addressLine1 = addressLine1 || user.addressLine1;
    user.city = city || user.city;
    user.country = country || user.country;

    await user.save();

    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "User failed to update" });
  }
};

export default {
  getCurrentUser,
  createCurrentUser,
  updateCurrentUser,
};
