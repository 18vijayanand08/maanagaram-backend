const express = require("express")
const cors = require("cors")
const axios = require("axios")

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

// Root test route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀")
})

// Fetch FiveM players
app.get("/api/server-status", async (req, res) => {
  try {
    const response = await axios.get(
      "http://148.113.25.251:30120/players.json"
    )

    const players = response.data

    res.json({
      online: true,
      count: players.length,
      players: players
    })

  } catch (error) {
    console.error(error.message)

    res.status(500).json({
      online: false,
      count: 0,
      players: []
    })
  }
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
