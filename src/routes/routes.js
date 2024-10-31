const { Router } = require("express");
const router = Router();
// Colorres de Trabajo y Respuestas
const initialProject = "\x1b[35m%s\x1b[0m";

// Route Inicio
router.get("/", async (req, res) => {
  console.log(initialProject, "Login del Proyecto");
  res.json(usuarios);
});

const usuarios = require("../database/user.json");

// Función para registrar un usuario
function registrarUsuario(nombre, email, password) {
  const nuevoUsuario = {
    id: usuarios.length + 1,
    nombre,
    email,
    // Utiliza un algoritmo de hash para almacenar la contraseña
    password: hashPassword(password),
    fechaCreacion: new Date(),
    fechaUltimaActualizacion: new Date(),
  };
  usuarios.push(nuevoUsuario);
  fs.writeFileSync("../database/user.json", JSON.stringify(usuarios, null, 2));
  return nuevoUsuario;
}

// Función para login un usuario
function loginUsuario(email, password) {
  const usuario = usuarios.find(
    (user) => user.email === email && user.password === hashPassword(password)
  );
  if (usuario) {
    return usuario;
  } else {
    return null;
  }
}

// Función para hash una contraseña
function hashPassword(password) {
  // Utiliza un algoritmo de hash como bcrypt o scrypt
  const bcrypt = require("bcrypt");
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);
  return hashedPassword;
}

// Route Registro
router.post("/registro", async (req, res) => {
  const { nombre, email, password } = req.body;
  const nuevoUsuario = registrarUsuario(nombre, email, password);
  res.json(nuevoUsuario);
});

// Route Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const usuario = loginUsuario(email, password);
  if (usuario) {
    // Almacena la información del usuario en la sesión
    req.session.usuario = usuario;
    // Redirige al usuario a la ruta /dashboard
    res.redirect("/dashboard");
  } else {
    res.status(401).json({ mensaje: "Credenciales inválidas" });
  }
});

// Route Dashboard
router.get("/dashboard", async (req, res) => {
  if (req.session.usuario) {
    // El usuario está autenticado, puedes mostrar el contenido del dashboard
    res.render("dashboard", { usuario: req.session.usuario });
  } else {
    // El usuario no está autenticado, puedes redirigirlo a la ruta de login
    res.redirect("/login");
  }
});

module.exports = router;
