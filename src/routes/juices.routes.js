//Crear un enrutador de express en el que todas las rutas inician con api
const router = require("express").Router();
const { validatorHandler } = require("../middlewares/validator.handler");
const {
  getSchema,
  createSchema,
  updateSchema,
} = require("../schemas/juice.schema");

//Importar el controlador de juices
const service = require("../services/juice.services");

//Middleware
router.use((req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect("/auth/signin");
  }
});

//Definir las rutas de la aplicación
router.get("/", async (req, res) => {
  const juices = await service.index();
  res.render("./admin/juices/juices", {
    juices: juices,
  });
  console.log(req.url);
});

router.get("/:id", validatorHandler(getSchema, "params"), async (req, res) => {
  const id = req.params.id;
  const juice = await service.show(id);
  res.json(juice);
});

router.post("/", validatorHandler(createSchema, "body"), async (req, res) => {
  const body = req.body;
  const juice = await service.store(body);
  res.json(juice);
});

router.put("/:id", validatorHandler(updateSchema, "body"), async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const juice = await service.update(id, body);
  res.json(juice);
});

router.delete(
  "/:id",
  validatorHandler(getSchema, "params"),
  async (req, res) => {
    const id = req.params.id;
    const juice = await service.destroy(id);
    res.json(juice);
  }
);

//Exportar el enrutador
module.exports = router;
