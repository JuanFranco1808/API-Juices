const {models} = require('../libs/sequelize')

//Funcion para listar todos los juices
async function index() {
    const juice = await models.juice.findAll();
    return juice;
}

//Funcion para crear un nuevo juice
async function store(body) {
    const juice = await models.juice.create(body);
    return juice;
}

//Funcion para mostrar un juice
async function show(id) {
    const juice = await models.juice.findByPk(id);
    return juice;
}

//Funcion para actualizar un juice
async function update(id, body) {
    const [affectedRows, [updatedjuice]] = await models.juice.update(body, {
        where: {
            id
        },
        returning: true
    });
    return updatedjuice;
}

//Funcion para eliminar un juice
async function destroy(id) {
    const juice = await models.juice.findByPk(id);
    const deletedjuice = await models.juice.destroy({
        where: {
            id
        },
        returning: true
    });
    if(deletedjuice){
        return juice;
    }
    return null;
}

//Exportar las funciones del controlador
module.exports = {
    index,
    store,
    show,
    update,
    destroy
}