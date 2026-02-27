const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// FiveM Players JSON URL
const FIVEM_URL = "http://148.113.25.251:30120/players.json";

/* ROOT ROUTE */
app.get("/", (req, res) => {
  res.send("Maanagaram Backend is Running 🚀");
});

/* SERVER STATUS ROUTE */
app.get("/api/server-status", async (req, res) => {
  try {
    const response = await axios.get(FIVEM_URL, {
      timeout: 2000, // Prevents long waiting when server is down
    });

    const players = response.data || [];

    return res.json({
      success: true,
      online: true,
      count: players.length,
      players: players.map((p) => ({
        id: p.id,
        name: p.name,
      })),
    });
  } catch (error) {
    // 🔥 IMPORTANT: DO NOT RETURN 500
    // Always return 200 JSON so frontend never shows error in console.
    return res.json({
      success: true,
      online: false,
      count: 0,
      players: [],
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
