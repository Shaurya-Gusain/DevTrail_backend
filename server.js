const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const agentAuthRoutes = require("./routes/agentAuthRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/treks", require("./routes/trekRoutes"));
app.use("/api/agents", require("./routes/agentRoutes"));
app.use("/api/agent-auth", agentAuthRoutes); // 🔥 FIXED
app.use("/api/reviews", require("./routes/reviewRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/bookings", require("./routes/bookingRoutes"));

// DB + Server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(5000, () => console.log("Server running on port 5000"));
  })
  .catch((err) => console.log(err));
