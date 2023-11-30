//Crear un enrutador de express en el que todas las rutas inician con api
const router = require("express").Router();
const { validatorHandler } = require("../middlewares/validator.handler");
const { accessLog } = require("../middlewares/access.log");
const {
  getSchema,
  createSchema,
  updateSchema,
} = require("../schemas/juice.schema");
const { sendEmail } = require("../services/sendEmails");

//Importar el controlador de juices
const service = require("../services/juice.services");

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
router.get("/juices", async (req, res) => {
  accessLog(req.method, req.path);
  const juices = await service.index();
  res.render("./admin/juices/juices", {
    juices: juices,
  });
});

router.get("/create", async (req, res) => {
  accessLog(req.method, req.path);
  res.render("admin/juices/create");
});

/* router.get(
  "juices/:id",
  validatorHandler(getSchema, "params"),
  async (req, res) => {
    const id = req.params.id;
    const juices = await service.show(id);
    res.render("admin/juices/juices/:id", {
      juices: juices,
    });
  }
); */

router.post(
  "/store",
  validatorHandler(createSchema, "body"),
  async (req, res) => {
    accessLog(req.method, req.path);
    const body = req.body;
    const juice = await service.store(body);
    sendEmail();
    res.redirect("/admin/juices/juices");
  }
);

router.get("/edit/:id", async (req, res) => {
  accessLog(req.method, req.path);
  const id = req.params.id;
  const juices = await service.show(id);
  res.render("admin/juices/edit", {
    juices: juices,
  });
});

//NO FUNCIONA EL UPDATE :C
router.post(
  "/update",
  validatorHandler(updateSchema, "body"),
  async (req, res) => {
    accessLog(req.method, req.path);
    const id = req.body.id;
    const body = req.body;
    const juice = await service.update(id, body);
    res.redirect("/admin/juices/juices");
  }
);

router.post(
  "/destroy/:id",
  validatorHandler(getSchema, "params"),
  async (req, res) => {
    accessLog(req.method, req.path);
    const id = req.params.id;
    const juice = await service.destroy(id);
    res.redirect("/admin/juices/juices");
  }
);

//Exportar el enrutador
module.exports = router;
