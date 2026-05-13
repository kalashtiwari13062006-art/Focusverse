const mongoose = require("mongoose");

const screenSettingsSchema = new mongoose.Schema({
  deviceId: { type: mongoose.Schema.Types.ObjectId, ref: "Device", required: true },
  brightness: { type: Number, default: 70 },
  refreshRate: { type: Number, default: 60 },
  darkMode: { type: Boolean, default: false },
  autoRotate: { type: Boolean, default: true },
  screenTimeout: { type: Number, default: 30 },
  resolution: { type: String, default: "1080x2400" },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("ScreenSettings", screenSettingsSchema);
