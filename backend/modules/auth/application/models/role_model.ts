import { Model, DataTypes } from "sequelize/types";
import { sequelizeConnection } from "../../../../conf";

export default class UserRole extends Model {}

UserRole.init(
  {
    id: { type: DataTypes.UUID, allowNull: false, primaryKey: true },
    email: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.TEXT, allowNull: false },
  },
  {
    sequelize: sequelizeConnection,
    modelName: "UserRole",
  }
);
