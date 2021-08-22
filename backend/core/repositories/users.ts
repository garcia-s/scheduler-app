import { getClient } from "../conf";
import hash from "../hash";
import { User } from "../models/user";
import { PoolClient } from "pg";



export const createUser: (
    user: User,
) => Promise<boolean> = async (user) => {
    const client = await getClient();
    try {
        const pass = await hash(user.password)
        const response = await client!.query(`INSERT INTO
        users (id, name, username, password, "admin", "root")
        VALUES ($1,$2,$3,$4,$5,$6)`, [
            user.id, user.name,
            user.username,
            pass,
            user.admin,
            user.root
        ]);
        return response.rowCount === 1;
    } catch (e) {
        console.log(e);
        // LOG TO FILE
        // throw Error(e)
    } finally {
        client.release();
    }
}

export const deleteUserById: (p: {
    client?: PoolClient
    id: string
}) => Promise<boolean> = async ({ id, client }) => {
    try {
        client = client ? client : await getClient();
        await client.query('DELETE FROM users WHERE id=$1::uuid', [id])
        return true;
    } catch (e) {
        //TODO: LOG TO FILE
        // throw Error(e)
    } finally {
        client.release();
    }
}



export const getUserByLoginInfo: (
    password: string,
    username: string,
) => Promise<User | null> = async (username, password) => {
    const client = await getClient();
    try {

        const response = await client!.query
            ('SELECT * FROM users WHERE username = $1 AND password = $2',
                [username.toLowerCase(), await hash(password)]);
        response.rows[0].services = [];
        return response.rows[0] ? response.rows[0] as User : null;
    } catch (e) {
        //TODO: LOG TO FILE
        console.log(e)
        // throw new Error(e);
    } finally {
        client.release();
    }
}

export const getUserById: (
    p: {
        client?: PoolClient,
        id: string
    }) => Promise<User | null> = async ({ client, id }) => {
        try {
            client = client ? client : await getClient();
            const response = await client!.query(
                'SELECT * FROM users WHERE id = ($1)::uuid', [id]);
            return response.rows[0] ? response.rows[0] as User : null;
        } catch (e) {
            // throw new Error(e);
        } finally {
            client!.release();
        }
    }


export const userExists: (
    username: string
) => Promise<boolean> = async (username) => {
    const client = await getClient();
    try {

        const response = await client!.query(
            'SELECT * FROM users WHERE username = $1', [username]);
        return response.rows[0] != null;
    } catch (e) {
        // throw new Error(e);
    } finally {
        client.release();
    }
}

// export const changePassword: (params: {

// }) => Promise<User> = ({ new_password, client, id }) => {
//     try { 
//         client = client ? client : await getClient();
//         const response = await client.query
//             ('UPDATE password FROM users WHERE id = $1',
//                 [username, await hash(password)]);
//         return response.rows[0] ? response.rows[0] as User : null;
//     } catch (e) {finally} {

//     }
// }


export const getAllUsers: () => Promise<User[]> = async () => {
    const client = await getClient();
    try {

        const response = await client.query(
            'SELECT * FROM users');
        const rows: User[] = response.rows.map((e) => {
            delete e.password;
            e.services = []
            return e as User
        })
        return rows
    } catch (e) {
        // throw new Error(e);
    } finally {
        client.release();
    }
}