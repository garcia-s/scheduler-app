import { database } from "../../core/conf";
import pg from 'pg';
export const createUserServiceIntermediateTable: () => Promise<void> = async () => {
    try {
        const pool = new pg.Pool(database);
        console.log('CREATING USER/SERVICE INTERMEDIATE TABLE');
        await pool.query(`
            CREATE TABLE public.user_service_intermediate
            (   
                "user" uuid NOT NULL,
                "service" uuid NOT NULL
            )`
        )
        pool.end();
        console.log('DONE!');
    } catch (e) {
        console.error('ERROR WHILE CREATING THE USERS/SERVICE INTERMEDIATE TABLE');
        throw new Error(e);
    }
}