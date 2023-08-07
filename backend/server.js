import express from "express";
import dotenv from "dotenv";
import doctors from "./data/doctors.js";
import bloods from "./data/bloods.js";
import connectDB from "./config/db.js";
import medicineRoutes from "./routes/medicineRoutes.js";

dotenv.config();
const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.get("/", (req, res) => {
  res.send("Api is running...");
});

app.use("/api/meds", medicineRoutes);

app.get("/api/doctors", (req, res) => {
  res.json(doctors);
});

app.get("/api/doctors/:id", (req, res) => {
  const doctor = doctors.find((p) => p._id === req.params.id);
  res.json(doctor);
});
app.get("/api/bloods", (req, res) => {
  res.json(bloods);
});
app.get("/api/bloods/:id", (req, res) => {
  const blood = bloods.find((p) => p._id === req.params.id);
  res.json(blood);
});

app.listen(port, () => console.log(`Server running on port ${port}`));
