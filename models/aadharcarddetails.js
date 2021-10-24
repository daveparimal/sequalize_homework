"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class AadharCardDetails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      // define association here
      this.hasOne(User, { foreignKey: "aadharId", as: "user" });
    }
  }
  AadharCardDetails.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Null not allowed" },
          notEmpty: { msg: "Cannot be empty" },
        },
      },
      aadharNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Null not allowed" },
          notEmpty: { msg: "Cannot be empty" },
        },
      },
    },
    {
      sequelize,
      tableName: "aadhaar_card_details",
      modelName: "AadharCardDetails",
    }
  );
  return AadharCardDetails;
};
