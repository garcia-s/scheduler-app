import { Dialect, Sequelize } from "sequelize";

const DEV_PORT = 5050;

export const PORT =
  process.env.NODE_ENV === "production" ? process.env.PORT : DEV_PORT;

const databaseConnection: {
  database: string;
  username: string;
  password: string;
  host: string;
  dialect: Dialect;
} =
  process.env.NODE_ENV !== "production"
    ? {
        database: "scheduler_db",
        username: "schedule_user",
        password: "perono",
        host: "127.0.0.1",
        dialect: "postgres",
      }
    : {
        database: "scheduler_production_db",
        username: "scheduler_test_user",
        password: "123123123",
        host: "localhost",
        dialect: "postgres",
      };

export const sequelizeConnection = new Sequelize(
  databaseConnection.database,
  databaseConnection.username,
  databaseConnection.password,
  { host: databaseConnection.host, dialect: databaseConnection.dialect }
);
