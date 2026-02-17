const express = require("express")
const axios = require("axios")
const cors = require("cors")

const app = express()
app.use(cors())

const PORT = process.env.PORT || 5000

app.get("/api/server-status", async (req, res) => {
  try {
    const response = await axios.get(
      "http://148.113.25.251:30120/players.json"
    )

    const playersData = response.data

    const formattedPlayers = playersData.map(player => ({
      id: player.id,
      name: player.name,
      ping: player.ping
    }))

    res.json({
      success: true,
      count: playersData.length,
      players: formattedPlayers
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      count: 0,
      players: []
    })
  }
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
