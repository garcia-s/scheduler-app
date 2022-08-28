import { DataSource, DataSourceOptions } from "typeorm";
import AccessControlGroupModel from "./modules/auth/application/models/access/access_control_group_model";
import AccessControlPolicyModel from "./modules/auth/application/models/access/access_control_policy_model";
import AccessControlUserModel from "./modules/auth/application/models/access/access_control_user_model";
import UserModel from "./modules/auth/application/models/auth/user_model";

const dataSourceOptions: DataSourceOptions =
  process.env.NODE_ENV !== "production"
    ? {
        type: "postgres",
        host: "localhost",
        port: 5432,
        username: "scheduler_user",
        password: "perono",
        database: "scheduler_db",
        entities: [
          UserModel,
          AccessControlUserModel,
          AccessControlGroupModel,
          AccessControlPolicyModel,
        ],
        synchronize: true,
        logging: false,
      }
    : {
        type: "postgres",
        host: "localhost",
        port: 5432,
        username: "scheduler_user",
        password: "peroyes",
        database: "scheduler_db",
        entities: [
          UserModel,
          AccessControlUserModel,
          AccessControlGroupModel,
          AccessControlPolicyModel,
        ],
        synchronize: true,
        logging: false,
      };

export const PostgresDataSource = new DataSource(dataSourceOptions);

