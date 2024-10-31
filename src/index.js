const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// port de Project
const puerto = process.env.PORT || 3000;
const serverColor = "\x1b[31m%s\x1b[0m";

// Configuración de Body-Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Route Raíz
app.get("/", function (req, res) {
  res.send("Hello World");
});

// Puerto de Salida
app.listen(puerto, () => {
  console.log(serverColor, `Star Api in puerto ${puerto}`);
});