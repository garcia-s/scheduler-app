import { database } from "../../core/conf";
import pg from "pg";


export const createSessionsTable: () => Promise<void> = async () => {
    try {
        const pool = new pg.Pool(database);
        console.log('CREATING SESSIONS TABLE...');
        await pool.query(`
        CREATE TABLE public.sessions
        (
            id character varying(80) NOT NULL,
            "user" uuid NOT NULL,
            "ip" inet NOT NULL,
            "started" timestamp NOT NULL,
            "expires" timestamp NOT NULL,
            PRIMARY KEY (id)
        )`)
        pool.end();
        console.log('DONE!');
    } catch (e) {

        console.error('ERROR WHILE CREATING THE SESSIONS TABLE');
        throw new Error(e);
    }
}