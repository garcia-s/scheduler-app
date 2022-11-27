import { DataSource, DataSourceOptions } from "typeorm";
import GroupModel from "./modules/access_control/application/models/group_model";
import PolicyAttributeModel from "./modules/access_control/application/models/policy_attribute_model";
import PolicyModel from "./modules/access_control/application/models/policy_model";
import UserModel from "./modules/access_control/application/models/user_model";
import AuthenticationUserModel from "./modules/authentication/application/models/user_model";

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
				AuthenticationUserModel,
				GroupModel,
				PolicyAttributeModel,
				PolicyModel,
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
				AuthenticationUserModel,
				GroupModel,
				PolicyAttributeModel,
				PolicyModel,
				
			],
			synchronize: true,
			logging: false,
		};


export const PostgresDataSource = new DataSource(dataSourceOptions);

