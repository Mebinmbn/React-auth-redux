import express from "express";
import middleware from "../middleware/middleware.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/add", middleware, async (req, res) => {
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
    return res.status(200).json({ success: true, message: "User Created" });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ success: false, message: "Error in Creating User" });
  }
});

router.get("/", middleware, async (req, res) => {
  console.log(req.body);
  try {
    const user = await User.find();
    return res.status(200).json({ success: true, user });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Can't retirve user data" });
  }
});

router.put("/:id", middleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;

    const user = await User.findById(id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    user.name = name || user.name;
    user.email = email || user.email;
    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    await user.save();
    return res
      .status(200)
      .json({ success: true, message: "User updated successfully" });
  } catch (error) {
    console.error("Server Error:", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
});

router.delete("/:id", middleware, async (req, res) => {
  try {
    const { id } = req.params;

    const userDelete = await User.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    console.error("Server Error:", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
});
export default router;
