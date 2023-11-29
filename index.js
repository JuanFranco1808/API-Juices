//Librerias externas
require("dotenv").config();

//Crear un servidor básico de Express
const express = require("express");

const app = express();
const routerApi = require("./src/routes");
const PORT = process.env.PORT;
const APP_NAME = process.env.APP_NAME;

//Permitir tráfico en formato JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(require("cookie-parser")());
app.use(require("body-parser").urlencoded({ extended: true }));
app.use(
  require("express-session")({
    secret: "Ingenieria informatica web 2",
    resave: true,
    saveUninitialized: true,
  })
);
require("./src/config/passport")(app);

//Motor de plantillas EJS
app.set("views", "./src/views");
app.set("view engine", "ejs");

//Definir las rutas de la aplicación
routerApi(app);

//prueba
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/admin", (req, res) => {
  res.render("admin/index");
});

//Iniciar el servidor
app.listen(PORT, () => {
  console.log(`${APP_NAME} is running on http://localhost:${PORT}`);
});
