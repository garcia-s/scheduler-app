import { Pool, PoolClient, PoolConfig } from "pg"

export const secret: string = '26774b20a3f70239de74748a3eb839b77490df401acfd942a0c0da3d03d44b7bad159453baa985a8396c1cc30d2ae59a3def06912beac40d1c09993b1f4cafb2dc36041c80478fd512f9db74ff'
export const salt: string = '5df8f3185a038d31b31bad984bef0d0dabd4a9c8c1a4b95eac3cefe9bf9419e42da39bdcfb69b04233d50b41fe0acd8e65c054e54411f3286a82d7cb4a3faed2'

export const database: PoolConfig = {
    user: 'kairoslocal',
    database: 'kairoslocal',
    host: 'localhost',
    password: 'kraken323256',
    port: 5432,
}

const pool: Pool = new Pool(database)

export const getClient: () => Promise<PoolClient> = async () => await pool.connect()

export const closePool: () => Promise<void> = async () => await pool.end();