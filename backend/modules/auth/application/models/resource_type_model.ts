import { DataTypes, Model } from "sequelize";
import { sequelizeConnection } from "../../../../core/conf";

export default class ResourceTypeModel extends Model {}

ResourceTypeModel.init(
  {
    id: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    name: { type: DataTypes.TEXT, allowNull: false },
  },
  {
    sequelize: sequelizeConnection,
    modelName: "ResourceType",
  }
);
