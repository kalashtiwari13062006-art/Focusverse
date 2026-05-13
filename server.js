const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/devices", require("./routes/devices"));
app.use("/api/optimization", require("./routes/optimization"));

// Health Check
app.get("/", (req, res) => {
  res.json({ message: "📱 Mobile Screen Optimizer API Running 🚀", status: "OK" });
});

// MongoDB Connection
const MONGO_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/mobile-screen-optimizer";
mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.log("⚠️  MongoDB not connected — running without DB:", err.message);
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
