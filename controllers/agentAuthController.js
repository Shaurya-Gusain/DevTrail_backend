const Agent = require("../models/Agent");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER
exports.registerAgent = async (req, res) => {
  try {
    const { name, email, password, phone, cities } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const agent = new Agent({
      name,
      email,
      password: hashedPassword,
      phone,
      whatsappNumber: phone,
      cities,
      isVerified: true,
    });

    await agent.save();

    res.json({ message: "Agent registered successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// LOGIN
exports.loginAgent = async (req, res) => {
  try {
    const { email, password } = req.body;

    const agent = await Agent.findOne({ email });
    if (!agent) return res.status(400).json({ error: "Agent not found" });

    const isMatch = await bcrypt.compare(password, agent.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    // 🔥 FIXED: SAME SECRET + SAME PAYLOAD FORMAT
    const token = jwt.sign({ userId: agent._id, role: "agent" }, "secretkey", {
      expiresIn: "7d",
    });

    res.json({ token, agent });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
