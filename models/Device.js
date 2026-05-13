const mongoose = require("mongoose");

const deviceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  deviceName: { type: String, required: true },
  androidVersion: { type: String, default: "" },
  ram: { type: String, default: "" },
  storage: { type: String, default: "" },
  batteryHealth: { type: String, default: "100%" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Device", deviceSchema);
