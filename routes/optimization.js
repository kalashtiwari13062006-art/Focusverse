const express = require("express");
const router = express.Router();
const ScreenSettings = require("../models/ScreenSettings");
const auth = require("../middleware/auth");

// Get optimization for a device
router.get("/:deviceId", auth, async (req, res) => {
  const settings = await ScreenSettings.findOne({ deviceId: req.params.deviceId });
  res.json(settings || {});
});

// Save/Update optimization settings
router.post("/:deviceId", auth, async (req, res) => {
  try {
    let settings = await ScreenSettings.findOne({ deviceId: req.params.deviceId });
    if (settings) {
      settings = await ScreenSettings.findOneAndUpdate(
        { deviceId: req.params.deviceId },
        { ...req.body, updatedAt: Date.now() },
        { new: true }
      );
    } else {
      settings = await ScreenSettings.create({ deviceId: req.params.deviceId, ...req.body });
    }
    res.json({ message: "Settings saved", settings });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// AI Optimization — auto recommend settings
router.get("/:deviceId/optimize", auth, async (req, res) => {
  const batteryLevel = parseInt(req.query.battery) || 100;
  const cpuUsage = parseInt(req.query.cpu) || 30;

  let recommendations = {
    brightness: 70,
    refreshRate: 120,
    darkMode: false,
    batterySaver: false,
    message: "✅ Device is running optimally!"
  };

  if (batteryLevel < 20) {
    recommendations.brightness = 30;
    recommendations.refreshRate = 60;
    recommendations.darkMode = true;
    recommendations.batterySaver = true;
    recommendations.message = "🔋 Low battery! Battery saver mode activated.";
  } else if (batteryLevel < 50) {
    recommendations.brightness = 50;
    recommendations.refreshRate = 90;
    recommendations.darkMode = true;
    recommendations.message = "⚡ Battery moderate. Saving recommended.";
  }

  if (cpuUsage > 80) {
    recommendations.refreshRate = 60;
    recommendations.message += " 🔥 High CPU — reduce refresh rate.";
  }

  res.json({ recommendations });
});

module.exports = router;
