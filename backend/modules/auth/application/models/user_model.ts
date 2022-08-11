import { DataTypes, Model } from "sequelize";
import { sequelizeConnection } from "../../../../core/conf";

export default class UserModel extends Model {}

UserModel.init(
  {
    id: { type: DataTypes.UUID, allowNull: false, primaryKey: true },
    email: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.TEXT, allowNull: false },
  },
  {
    sequelize: sequelizeConnection,
    modelName: "User",
  }
);
