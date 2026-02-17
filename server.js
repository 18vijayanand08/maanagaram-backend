const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

/* ROOT ROUTE */
app.get("/", (req, res) => {
  res.send("Maanagaram Backend is Running 🚀");
});

/* SERVER STATUS ROUTE */
app.get("/api/server-status", async (req, res) => {
  try {
    const response = await axios.get(
      "http://148.113.25.251:30120/players.json"
    );

    const players = response.data;

    res.json({
      success: true,
      count: players.length,
      players: players.map((p) => ({
        id: p.id,
        name: p.name,
      })),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch players",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
