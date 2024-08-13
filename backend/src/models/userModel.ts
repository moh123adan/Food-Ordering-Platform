import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    auth0Id: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: true,
    },
    addressLine1: {
      type: String,
    },
    city: {
      type: String,
    },
    country: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const User: any = mongoose.model("User", userSchema);

export default User;
