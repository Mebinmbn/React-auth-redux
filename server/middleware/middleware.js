import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

dotenv.config();

const middleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    if (!decoded) {
      return res.status(401).json({ success: false, message: "Wrong token" });
    }
    const user = await User.findById({ _id: decoded.id });
    if (!user) {
      return res.status(404).json({ success: false, message: "No user" });
    }

    if (user.role !== "admin") {
      return res
        .status(403)
        .json({ success: false, message: "Access Restricted to admin only" });
    }
    const newUser = { name: user.name, id: user._id };
    req.user = newUser;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Please Login" });
  }
};

export default middleware;
