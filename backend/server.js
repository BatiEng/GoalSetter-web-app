import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import colors from "colors";
import goalRouter from "./routes/goalRoutes.js";
import userRouter from "./routes/userRoutes.js";
import { connectDB } from "./config/db.js";
dotenv.config();

const PORT = process.env.PORT || 5001;
connectDB();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/goals", goalRouter);
app.use("/api/users", userRouter);

app.listen(PORT, () => {
  console.log(`server is litening via port ${PORT}`);
});
