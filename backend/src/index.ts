import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import colors from "colors";
import myUserRoute from "./routes/myUserRoute";

const connectDB = async () => {
  const conn = await mongoose
    .connect(process.env.MONGO_URI?.toString() || "")
    .then(() => console.log(`MongoDB connected succesfully`))
    .catch((error) => console.error(`Error connecting to MongoDB`));
};

connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use("/api/my/user", myUserRoute);

app.listen(7000, () => {
  console.log("server started on localhost:7000 ");
});
