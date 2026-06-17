const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { connectDB } = require("./config/db");
const cartRoutes = require("./routes/cartRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Shopping Cart Backend Running",
  });
});

app.use("/api/cart", cartRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log("=================================");
      console.log(` Server running on port ${PORT}`);
      console.log(` http://localhost:${PORT}`);
      console.log("=================================");
    });
  } catch (error) {
    console.error(" Failed to Start Server");
    console.error(error.message);
    process.exit(1);
  }
};

startServer();