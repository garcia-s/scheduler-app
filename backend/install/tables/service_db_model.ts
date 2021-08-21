import { database } from "../../core/conf";
import pg from 'pg';

export const createServiceTable: () => Promise<void> = async () => {
    try {
        const pool = new pg.Pool(database);
        console.log('CREATING SERVICE TABLE');
        await pool.query(`
            CREATE TABLE public.service
            (   
                "id" uuid NOT NULL,
                "maxParallelPerUser" int NOT NULL,
                "hasTimeframe" boolean NOT NULL,
                "timeframe" integer,
                "isMultitask" boolean NOT NULL
            )`
        )
        pool.end();
        console.log('DONE!');
    } catch (e) {
        console.error('ERROR WHILE CREATING THE SERVICE TABLE');
        throw new Error(e);
    }
}

// final String id;
// final num maxParallelPerUser;
// final List<String> designatedAreas;
// final bool hasTimeframe;
// final Duration? timeframe;
// final bool isMultitask;