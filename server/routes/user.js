import express from "express";
import User from "../models/User.js";
import middleware from "../middleware/middleware.js";

const router = express.Router();

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const user = await User.findById(id);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    return res.status(200).json({ success: true, user });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Can't retrieve user data" });
  }
});

router.post("/upload/:id", async (req, res) => {
  const { id } = req.params;
  const { profileImage } = req.body;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    user.profileImage = profileImage;
    await user.save();
    return res
      .status(200)
      .json({ success: true, message: "Image uploaded successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Can't update profile image" });
  }
});

export default router;
