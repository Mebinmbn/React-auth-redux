import dotenv from "dotenv";
import express from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

dotenv.config();

const router = express.Router();

router.post("/register", async (req, res) => {
  console.log(req.body);
  try {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      console.log("User exist", user);
      return res
        .status(401)
        .json({ success: false, message: "User already exits" });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashPassword });
    await newUser.save();
    console.log("user created");
    return res
      .status(200)
      .json({ success: true, message: "Account Created Successfully" });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ success: false, message: "Error in Creating User" });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User does not exit" });
    }
    if (user.role !== "user") {
      return res
        .status(403)
        .json({ success: false, message: "Access restricted to admin only" });
    }

    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      return res
        .status(401)
        .json({ success: false, message: "Wrong Creditials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "5h",
    });
    return res.status(200).json({
      success: true,
      token,
      user: { name: user.name, role: user.role, id: user._id },

      message: "Successfully Logged in",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, message: "Error in Login" });
  }
});

export default router;
