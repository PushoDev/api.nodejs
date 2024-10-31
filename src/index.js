const express = require("express");

const app = express();

// Route Initial
app.get("/", function (req, res) {
  res.send("Hello World");
});

app.listen(8590);
