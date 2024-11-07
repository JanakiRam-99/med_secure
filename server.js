const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const Data = require("./data.js");
const cookieParser = require("cookie-parser");
const { UserRouter } = require("./routes/routes.js");

const app = express();
dotenv.config();

// CORS configuration
app.use(cors({
  origin: ["http://localhost:5173", "https://s60-vinay-blogie.onrender.com", "https://blogie-1.netlify.app", "http://localhost:3001", "https://medsecure.netlify.app/"],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(cookieParser());
app.use(express.json());
app.use("/auth", UserRouter);

// Health check route
app.get("/", (req, res) => {
  res.send("I am alive bro!!");
});

app.post('/data', async (req, res) => {
  try {
    const userId = req.body.userId;
    const newData = new Data({ ...req.body, userId });
    const savedData = await newData.save();
    res.status(201).json({ status: true, data: savedData });
  } catch (error) {
    console.log("catch block error")
    res.status(400).json({ status: false, error: error.message });
  }
});

// Get submissions by user ID
app.get('/data/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const userData = await Data.find({ userId });
    res.status(200).json({ status: true, data: userData });
  } catch (error) {
    console.log("catch block error")
    res.status(500).json({ status: false, error: error.message + "catch block" });
  }
});

app.get('/data', async (req, res) => {
  try {
    const allData = await Data.find();
    res.status(200).json(allData);
  } catch (error) {
    res.status(500).json({ status: false, error: error.message });
  }
});



// Start the server and connect to MongoDB
app.listen(process.env.PORT || 3001, async () => {
  try {
    await mongoose.connect("mongodb+srv://vinnugollakoti:vinnu1244@cluster0.cwivpr4.mongodb.net/medsecure");
    console.log("Connected to MongoDB");
    console.log("Server is running");
  } catch (error) {
    console.error("Database connection error:", error);
  }
});
