import { PoolConfig } from "pg"

export const su: PoolConfig = {
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'postgres',
    port: 5432,
}