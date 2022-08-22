import { DataTypes, Model } from "sequelize";
import { sequelizeConnection } from "../../../../conf";

export default class UserModel extends Model {}

UserModel.init(
  {
    id: { type: DataTypes.UUID, allowNull: false, primaryKey: true },
    email: { type: DataTypes.STRING, allowNull: false, unique: true},
    password: { type: DataTypes.TEXT, allowNull: false },
  },
  {
    sequelize: sequelizeConnection,
    modelName: "User",
  }
);
