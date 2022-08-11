import { DataTypes, Model } from "sequelize";
import { sequelizeConnection } from "../../../../core/conf";
import ResourceModel from "./resource_model";
import ResourceTypeModel from "./resource_type_model";
import UserModel from "./user_model";

export default class UserPolicyModel extends Model {}

UserPolicyModel.init(
  {
    id: { type: DataTypes.UUID, allowNull: false, primaryKey: true },
  },
  {
    sequelize: sequelizeConnection,
    modelName: "UserPolicy",
  }
);
UserPolicyModel.hasOne(UserModel);
UserPolicyModel.hasOne(ResourceTypeModel);
UserPolicyModel.hasMany(ResourceModel);
