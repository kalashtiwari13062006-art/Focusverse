const express = require("express");
const router = express.Router();
const Device = require("../models/Device");
const auth = require("../middleware/auth");

// Get all devices for a user
router.get("/", auth, async (req, res) => {
  const devices = await Device.find({ userId: req.user.id });
  res.json(devices);
});

// Add device
router.post("/", auth, async (req, res) => {
  try {
    const device = await Device.create({ ...req.body, userId: req.user.id });
    res.json({ message: "Device added", device });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete device
router.delete("/:id", auth, async (req, res) => {
  await Device.findByIdAndDelete(req.params.id);
  res.json({ message: "Device deleted" });
});

module.exports = router;
