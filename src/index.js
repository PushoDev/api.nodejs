const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");

const app = express();
// Config de Morgan
app.use(morgan("dev"));

// port de Project
const puerto = process.env.PORT || 3000;
const serverColor = "\x1b[31m%s\x1b[0m";

// Configuración de Body-Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configuración de CORS
app.use(cors());

// Route Raíz
const router = require("./routes/routes");
app.use("/", router);

// Puerto de Salida
app.listen(puerto, () => {
  console.log(serverColor, `Star Api in puerto ${puerto}`);
});