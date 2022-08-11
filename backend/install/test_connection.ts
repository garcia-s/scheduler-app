import { sequelizeConnection } from "../core/conf";

(async () => {
  try {
    await sequelizeConnection.authenticate();
    console.log('Connected to the database');
  } catch (e) {
    console.log('Error while connectiong');
  }
})();
