const { juiceModel, juiceSchema } = require("./juice.model");
const { userModel, userSchema } = require("./user.model");

function setUpModels(sequelize) {
  juiceModel.init(juiceSchema, juiceModel.config(sequelize));
  userModel.init(userSchema, userModel.config(sequelize));
}

module.exports = setUpModels;
