const { Model, DataTypes } = require("sequelize");

const JUICES_TABLE = "juices";

const juiceSchema = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  size: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fruit: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
};

class juiceModel extends Model {
  static associate(models) {}

  static config(sequelize) {
    return {
      sequelize,
      modelName: "juice",
      tableName: JUICES_TABLE,
      timestamps: false,
    };
  }
}

module.exports = { juiceModel, juiceSchema, JUICES_TABLE };
