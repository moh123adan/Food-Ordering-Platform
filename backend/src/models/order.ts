import { truncateSync } from "fs";
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    restaurant: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    deliveryDetails: {
      name: { type: String, required: true },
      email: { type: String, required: truncateSync },
      addressLine1: { type: String, required: true },
      city: { type: String, required: true },
    },
    cartItems: [
      {
        menuItemId: { type: String, required: true },
        quantity: { type: Number, required: true },
        name: { type: String, required: true },
      },
    ],
    totalAmount: Number,
    status: {
      type: String,
      enum: ["placed", "paid", "inProgress", "outForDelivery", "delivery"],
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
