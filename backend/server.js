import path from "path";
import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";
import medicineRoutes from "./routes/medicineRoutes.js";
import doctorRoutes from "./routes/doctorRoutes.js";
import bloodRoutes from "./routes/bloodRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
// import appointmentRoutes from "./routes/appointmentRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import cookieParser from "cookie-parser";

const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Api is running...");
});

app.use(cookieParser());

app.use("/api/meds", medicineRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
// app.use("/api/appointments", appointmentRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/bloods", bloodRoutes);
app.use("/api/upload", uploadRoutes);

app.get("/api/config/paypal", (req, res) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port ${port}`));
