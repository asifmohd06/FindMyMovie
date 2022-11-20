const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const monngoose = require("mongoose");
const ejsmate = require("ejs-mate");
const session = require("express-session");
const axios = require("axios");

const url = process.env.PORT || 3000;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.engine("ejs", ejsmate);

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

app.listen(url, () => {
  console.log("port 3000");
});
let showData = [];

app.get("/", async (req, res) => {
  showData = [];
  const options = {
    method: "POST",
    url: "https://yts.torrentbay.to/api/v2/list_movies.json",
    params: {
      sort_by: "year",
    },
    headers: {
      "User-Agent": "axios 1.1.3",
    },
  };
  await axios
    .request(options)
    .then((response) => {
      const result = response.data.data.movies;
      if (result) {
        result.forEach((element) => {
          showData.push(element);
        });
      }
    })
    .catch((error) => {
      console.log(error);
      res.render("error");
    });

  res.render("home", { showData });
});

app.get("/search", async (req, res) => {
  showData = [];
  const { query } = req.query;

  const options = {
    method: "GET",
    url: "https://yts.torrentbay.to/api/v2/list_movies.json",
    params: {
      query_term: query,
    },
  };

  await axios
    .request(options)
    .then((response) => {
      const result = response.data.data.movies;
      if (result) {
        result.forEach((element) => {
          showData.push(element);
        });
      }

      res.render("home", { showData });
    })
    .catch((error) => {
      console.error(error);
    });
});

app.get("/details/:id", async (req, res) => {
  const id = req.params.id;
  // console.log(id)
  const options = {
    method: "GET",
    url: "https://yts.torrentbay.to/api/v2/movie_details.json",
    params: {
      movie_id: id,
      with_images: true,
      with_cast: true,
    },
  };

  await axios
    .request(options)
    .then((response) => {
      const data = response.data.data.movie;
      res.render("details", { data });
    })
    .catch((error) => {
      console.error(error);
    });
});

module.exports = app;
