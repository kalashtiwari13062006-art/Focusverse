const mongoose = require("mongoose");

const performanceSchema = new mongoose.Schema({
  deviceId: { type: mongoose.Schema.Types.ObjectId, ref: "Device", required: true },
  cpuUsage: { type: String, default: "0%" },
  ramUsage: { type: String, default: "0GB" },
  temperature: { type: String, default: "30C" },
  fps: { type: Number, default: 60 },
  batteryLevel: { type: Number, default: 100 },
  apps: [
    {
      appName: String,
      batteryUsage: String,
      screenTime: String
    }
  ],
  recordedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Performance", performanceSchema);
