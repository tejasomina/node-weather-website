const path = require("path");
const express = require("express");
const hbs = require("hbs");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

// Define paths for Express config
const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// APIs
app.get("/api/weather", (req, res) => {
  var query = req.query;
  console.log(query);
  if (!query.location) {
    return res.status(400).json({ error: "You must provide a location" });
  }

  geocode.find(query, (err, { latitude, longitude, location } = {}) => {
    if (err) {
      console.log("Status 400 in geocode API");
      return res.status(400).send(err);
    }
    forecast.find(latitude, longitude, (err, forecastData) => {
      if (err) {
        console.log("Status 400 in forecast API");
        return res.status(400).send(err);
      }
      forecastData.location = location;
      return res.status(200).json(forecastData);
    });
  });
});

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Sarath Somina",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Sarath Somina",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    text: "This page in under construction",
    name: "Sarath Somina",
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({ error: "You must provide a search term" });
  }

  console.log(req.query);
  res.send({ products: [] });
});

app.get("*", (req, res) => {
  res.render("404", { title: "404 Not Found", errorMessage: "My 404 page" });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000.");
});
