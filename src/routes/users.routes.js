//Crear un enrutador de express en el que todas las rutas inician con api
const router = require("express").Router();
const { validatorHandler } = require("../middlewares/validator.handler");
const { accessLog } = require("../middlewares/access.log");
const {
  getSchema,
  createSchema,
  updateSchema,
} = require("../schemas/user.schema");
const { sendEmail } = require("../services/sendEmails");

//Importar el controlador de user
const service = require("../services/user.services");

//Middleware
router.use((req, res, next) => {
  accessLog(req.method, req.path);
  if (req.user) {
    next();
  } else {
    res.redirect("/auth/signin");
  }
});

//Definir las rutas de la aplicación
router.get("/users", async (req, res) => {
  accessLog(req.method, req.path);
  const users = await service.index();
  res.render("admin/users/users", {
    users: users,
  });
});

router.get("/create", async (req, res) => {
  accessLog(req.method, req.path);
  res.render("admin/users/create");
});

/* router.get(
  "users/:id",
  validatorHandler(getSchema, "params"),
  async (req, res) => {
    const id = req.params.id;
    const users = await service.show(id);
    res.render("admin/users/users/:id", {
      users: users,
    });
  }
); */

router.post(
  "/store",
  validatorHandler(createSchema, "body"),
  async (req, res) => {
    accessLog(req.method, req.path);
    const body = req.body;
    const user = await service.store(body);
    sendEmail();
    res.redirect("/admin/users/users");
  }
);

router.get("/edit/:id", async (req, res) => {
  accessLog(req.method, req.path);
  const id = req.params.id;
  const user = await service.show(id);
  res.render("admin/users/edit", {
    user: user,
  });
});

router.post(
  "/update",
  validatorHandler(updateSchema, "body"),
  async (req, res) => {
    accessLog(req.method, req.path);
    const id = req.body.id;
    const body = req.body;
    const user = await service.update(id, body);
    res.redirect("/admin/users/users");
  }
);

router.post(
  "/destroy/:id",
  validatorHandler(getSchema, "params"),
  async (req, res) => {
    accessLog(req.method, req.path);
    const id = req.params.id;
    const user = await service.destroy(id);
    res.redirect("/admin/users/users");
  }
);

//Exportar el enrutador
module.exports = router;
