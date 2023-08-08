import express from "express";
import dotenv from "dotenv";
dotenv.config();
import doctors from "./data/doctors.js";
import bloods from "./data/bloods.js";
import connectDB from "./config/db.js";
import medicineRoutes from "./routes/medicineRoutes.js";
import doctorRoutes from "./routes/doctorRoutes.js"
import bloodRoutes from "./routes/bloodRoutes.js"
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";


const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.get("/", (req, res) => {
  res.send("Api is running...");
});

app.use("/api/meds", medicineRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/bloods", bloodRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port ${port}`));
