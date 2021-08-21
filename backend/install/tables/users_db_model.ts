import { database } from "../../core/conf";
import pg from "pg";

export const createUsersTable: () => Promise<void> = async () => {
    try {
        const pool = new pg.Pool(database);
        console.log('Creating user table');
        await pool.query(`
    CREATE TABLE public.users
    (   
        "id" uuid NOT NULL,
        "username" character varying (60) NOT NULL,
        "name" character varying(150) NOT NULL,
        password text NOT NULL,
        "root" boolean NOT NULL,
        "admin" boolean NOT NULL,
        PRIMARY KEY (id)
    )`)
        pool.end();
        console.log('DONE!');
    } catch (e) {
        console.error('ERROR WHILE CREATING THE USERS TABLE');
        throw new Error(e);
    }
}

