const express = require("express");
const axios = require("axios");
const fs = require("fs");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = process.env.API_KEY;
app.get("/api/weather/:city", async (req, res) => {
  const city = req.params.city;

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );

    saveRecentSearch(city);

    res.json(response.data);
  } catch (error) {
    res.status(404).json({ message: "City not found" });
  }
});

app.get("/api/forecast/:city", async (req, res) => {
  const city = req.params.city;

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
    );

    res.json(response.data);
  } catch (error) {
    res.status(404).json({ message: "Forecast not found" });
  }
});

app.get("/api/weather/coords/:lat/:lon", async (req, res) => {
  const { lat, lon } = req.params;

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );

    res.json(response.data);
  } catch (error) {
    res.status(404).json({ message: "Location not found" });
  }
});

function saveRecentSearch(city) {
  let list = JSON.parse(fs.readFileSync("recent.json"));
  if (!list.includes(city)) {
    list.unshift(city);
    if (list.length > 5) list.pop();
    fs.writeFileSync("recent.json", JSON.stringify(list));
  }
}

app.get("/api/recent", (req, res) => {
  const list = JSON.parse(fs.readFileSync("recent.json"));
  res.json(list);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Backend running on port " + PORT));
