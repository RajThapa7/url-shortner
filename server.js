require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;
app.use(cors());

app.use(express.urlencoded());
app.use("/public", express.static(`${process.cwd()}/public`));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

// Your first API endpoint
let pattern = /(http(s)?):\/\/[(www\.)?a-zA-Z0-9@:%._\+~#=&]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=()]*)/
app.post("/api/shorturl", (req, res) => {
  const original_url = req.body.url;
  const short_url = Math.ceil(Math.random() * 1000);
  if (pattern.test(original_url)) {
    return res.status(200).json({
      original_url,
      short_url,
    });
  }
  else{
    res.status(400).json({
      error: "Invalid URL"
      })
  }
});

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
