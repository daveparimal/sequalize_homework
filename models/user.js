"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ AadharCardDetails, Addresses, UserRoles }) {
      // define association here
      this.belongsTo(AadharCardDetails, {
        foreignKey: "aadharId",
        as: "aadhaarcarddetails",
      });
      this.hasOne(Addresses, {
        foreignKey: "userId",
        as: "address",
      });
      this.hasOne(UserRoles, {
        foreignKey: "userId",
        as: "userroles",
      });
    }
  }
  User.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      full_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Null now allowed" },
          notEmpty: { msg: "Cannot be empty" },
        },
      },
      country_code: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "Null now allowed" },
          notEmpty: { msg: "Cannot be empty" },
        },
      },
      aadharId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          notEmpty: false,
          notNull: false,
        },
      },
    },
    {
      sequelize,
      tableName: "users",
      modelName: "User",
    }
  );
  return User;
};
