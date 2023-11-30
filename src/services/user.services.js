const { models } = require("../libs/sequelize");

//Funcion para listar todos los user
async function index() {
  const user = await models.user.findAll();
  return user;
}

//Funcion para crear un nuevo user
async function store(body) {
  const user = await models.user.create(body);
  return user;
}

//Funcion para mostrar un user
async function show(id) {
  const user = await models.user.findByPk(id);
  return user;
}

//Funcion para actualizar un user
async function update(id, body) {
  const [affectedRows, [updateduser]] = await models.user.update(body, {
    where: {
      id,
    },
    returning: true,
  });
  return updateduser; 
}

//Funcion para eliminar un user
async function destroy(id) {
  const user = await models.user.findByPk(id);
  const deleteduser = await models.user.destroy({
    where: {
      id,
    },
    returning: true,
  });
  if (deleteduser) {
    return user;
  }
  return null;
}

//Exportar las funciones del controlador
module.exports = {
  index,
  store,
  show,
  update,
  destroy,
};
