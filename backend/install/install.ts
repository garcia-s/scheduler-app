
import { database } from '../core/conf';
import { Pool } from 'pg';
import { su } from './install_conf';
import { createDbandUser } from './tables/db_and_user';
import { createUsersTable } from './tables/users_db_model';
import { createServiceTable } from './tables/service_db_model';
import { createUserServiceIntermediateTable } from './tables/user_services_intermediate_db_model';


const installDbConfig: () => Promise<void> = async () => {
    try {
        const pool = new Pool(su);
        await pool.query(`DROP DATABASE IF EXISTS ${database.database}`);
        await pool.query(`DROP USER IF EXISTS ${database.user}`);
        await createDbandUser();
        await createServiceTable();
        await createUsersTable();
        await createUserServiceIntermediateTable();
    } catch (e) {
        console.log(e);
    }
}
installDbConfig()

// CREATE TABLE public.categories
