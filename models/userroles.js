"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserRoles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Roles, User }) {
      // define association here
      this.belongsTo(Roles, { foreignKey: "roleId", as: "roles" });
      this.belongsTo(User, { foreignKey: "userId", as: "user" });
    }
  }
  UserRoles.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      roleId: { type: DataTypes.INTEGER, allowNull: false },
      userId: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      sequelize,
      tableName: "user_roles",
      modelName: "UserRoles",
    }
  );
  return UserRoles;
};
