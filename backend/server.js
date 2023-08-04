import express from "express";

const port = 5000;

const app = express();

app.get("/", (req, res) => {
  res.send("Api is running...");
});

app.listen(port, () => console.log(`Server running on port ${port}`));
