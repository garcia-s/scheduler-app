import { DataTypes, Model } from "sequelize";
import { sequelizeConnection } from "../../../../conf";
import ResourceTypeModel from "./resource_type_model";

export default class ResourceModel extends Model {}

ResourceModel.init(
  {
    id: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
  },
  {
    sequelize: sequelizeConnection,
    modelName: "Resource",
  }
);

ResourceModel.belongsTo(ResourceTypeModel, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
