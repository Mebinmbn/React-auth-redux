import express from "express";
import cors from "cors";
import connetToMongoDB from "./db/db.js";
import authRouter from "./routes/auth.js";
import userAuthRouter from "./routes/userAuth.js";
import adminRouter from "./routes/admin.js";
import userRouter from "./routes/user.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/admin", adminRouter);
app.use("/api/userAuth", userAuthRouter);
app.use("/api/user", userRouter);

app.listen(5000, () => {
  connetToMongoDB();
  console.log("Server is running on port 5000");
});
