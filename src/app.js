const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");
const path = require("path");

const express = require("express");
const hbs = require("hbs");

const app = express();

const public_directory = path.join(__dirname, "../public");

//getting handlebars location
const views_path = path.join(__dirname, "../templates/views");
//setting up hbs handlebars
app.set("view engine", "hbs");
app.set("views", views_path);

//setting up partials
const partials_path = path.join(__dirname, "../templates/partials");
hbs.registerPartials(partials_path);

//using static pages directory
app.use(express.static(public_directory));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather app",
    name: "kit"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "Weatehr app about",
    name: "kit"
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "address not provided"
    });
  }
  geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({error});
    }
    forecast(latitude, longitude, (error, forecastdata) => {
      if (error) {
        return res.send({error});
      }
      res.send({
        location: location,
        forecast: forecastdata,
        address: req.query.address
      });
    });
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    msg: "hello welcome to this website",
    title: "HELP",
    name: "kit"
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    name: "kit"
  });
});

app.listen(9000, () => {
  console.log("server started on port 9000");
});
