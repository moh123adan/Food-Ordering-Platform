import { Request, Response } from "express";
import User from "../models/userModel";

//get current user
const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const userId = ({_id: userId._id})
    const currentUser = await User.findOne({ _id: req.userId });

    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(currentUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "user can't find, something went wrong" });
  }
};
const createCurrentUser = async (req: Request, res: Response) => {
  //check if the user exists
  // create the user if it doesn't exist
  // return the user object to the calling client
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

//update current user
const updateCurrentUser = async (req: Request, res: Response) => {
  try {
    const { name, addressLine1, country, city } = req.body;

    const user = await User.findById(req.userId);

    if (!user) {
      res.status(404).json({ message: "User not found" });
    }
    (user.name = name),
      (user.addressLine1 = addressLine1),
      (user.coutry = country);
    user.city = city;

    await user.save();

    res.send(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "user failed to update" });
  }
};

export default {
  getCurrentUser,
  createCurrentUser,
  updateCurrentUser,
};
