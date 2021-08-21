import { database } from "../../core/conf";
import pg from "pg";
import { su } from "../install_conf";

export const createDbandUser: () => Promise<void> = async () => {
    try {
        const pool = new pg.Pool(su);
        await pool.query(`CREATE USER ${database.user} WITH PASSWORD '${database.password}'`);
        console.log('Creating Database user')
        await pool.query(`CREATE DATABASE ${database.database} OWNER ${database.user}`);
        console.log('Creating Database');
        pool.end();
    } catch (e) {
        console.error('ERROR WHILE CREATING DATABASE AND DB USER');
        throw new Error(e);
    }
}