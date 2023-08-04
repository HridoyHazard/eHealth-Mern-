import express from "express";
import dotenv from 'dotenv'
import meds from "./data/meds.js";
import doctors from "./data/doctors.js";

dotenv.config()
const port = process.env.PORT || 5000;

const app = express();

app.get("/", (req, res) => {
  res.send("Api is running...");
});

app.get('/api/meds', (req,res) => {
  res.json(meds);
})

app.get('/api/meds/:id', (req,res) => {
  const med = meds.find((p) => p._id === req.params.id)
  res.json(med);
})
app.get('/api/doctors', (req,res) => {
  res.json(doctors);
})

app.get('/api/doctors/:id', (req,res) => {
  const doctor = doctors.find((p) => p._id === req.params.id)
  res.json(doctor);
})

app.listen(port, () => console.log(`Server running on port ${port}`));
