import { DataSource, DataSourceOptions } from "typeorm";
import GroupModel from "./modules/authentication/application/models/access/access_control_group_model";
import PolicyModel from "./modules/authentication/application/models/access/access_control_policy_model";
import UserModel from "./modules/authentication/application/models/access/access_control_user_model";
import UserModel from "./modules/authentication/application/models/user_model";

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
				UserModel,
				GroupModel,
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
				UserModel,
				GroupModel,
				PolicyModel,
			],
			synchronize: true,
			logging: false,
		};


export const PostgresDataSource = new DataSource(dataSourceOptions);

