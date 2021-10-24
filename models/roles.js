"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Roles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ UserRoles }) {
      // define association here
      this.hasOne(UserRoles, {
        foreignKey: "roleId",
        as: "roles",
      });
    }
  }
  Roles.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      name: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      tableName: "roles",
      modelName: "Roles",
    }
  );
  return Roles;
};
