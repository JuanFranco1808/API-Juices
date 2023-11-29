//Crear un enrutador de express en el que todas las rutas inician con api
const router = require("express").Router();
const { validatorHandler } = require("../middlewares/validator.handler");
const {
  getSchema,
  createSchema,
  updateSchema,
} = require("../schemas/user.schema");

//Importar el controlador de useros
const service = require("../services/user.services");

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
  const users = await service.index();
  res.json(users);
  console.log(req.url);
});

router.get(
  "/:id",
  validatorHandler(getSchema, "params"),
  async (req, res) => {
    const id = req.params.id;
    const user = await service.show(id);
    res.json(user);
  }
);

router.post(
  "/",
  validatorHandler(createSchema, "body"),
  async (req, res) => {
    const body = req.body;
    const user = await service.store(body);
    res.json(user);
  }
);

router.put(
  "/:id",
  validatorHandler(updateSchema, "body"),
  async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    const user = await service.update(id, body);
    res.json(user);
  }
);

router.delete(
  "/:id",
  validatorHandler(getSchema, "params"),
  async (req, res) => {
    const id = req.params.id;
    const user = await service.destroy(id);
    res.json(user);
  }
);

//Exportar el enrutador
module.exports = router;
