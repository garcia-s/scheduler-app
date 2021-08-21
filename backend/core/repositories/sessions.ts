
import { PoolClient } from "pg";
import { Session } from "../../core/models/session";
import { getClient } from "../conf";
import crypto from 'crypto'

export const createSession: (
    session: Session,
    client?: PoolClient
) => Promise<boolean> = async (session, client) => {
    try {
        client = client ? client : await getClient();
        await client!.query(`
            INSERT INTO sessions (id, "user", ip, started, expires)
            VALUES ($1, $2, $3, $4, $5)`,
            [
                session.id,
                session.user,
                session.ip,
                session.started,
                session.expires,
            ])
        return true;
    } catch (e) {
        console.log(e)
        throw e;
        // LOG TO A FILE
    } finally {
        client!.release()
    }
}

export const createRandomSessionId: () => Promise<string> = async () => {
    let id = crypto.randomBytes(32).toString('base64');
    if (!await isSessionIdUsed(id)) id = await createRandomSessionId()
    return id
}

const isSessionIdUsed: (
    id: string,
    client?: PoolClient
) => Promise<boolean> = async (id, client) => {
    try {
        client = client ? client : await getClient();
        return await (await client!.query('SELECT * FROM sessions WHERE id = $1', [id]))
            .rowCount === 0;
    } catch (e) {
        // LOG TO A FILE
        throw e;
    } finally {
        client!.release();
    }
}

// SESSIONS SHOULD BE INVALIDATED NOT PERMANENTLY DELETED TO PRESERVE A LOG IF THIS SESSIONS
//  THIS IS JUST A CLEANUP FUNCTION FOR THE TESTS ON THE SESSION DATABASE MODEL
//  SESSIONS CAN BE DELETED AFTER A WHILE TO OPTIMIZE BUT THEY SOULD BE DELETED IN A SINGLE TRANSACTION

export const deleteSession: (params: {
    id: string, client?: PoolClient
}) => Promise<boolean> = async ({ id, client }) => {
    try {
        client = client ? client : await getClient();
        return await (await client!.query('DELETE from sessions WHERE id = $1', [id]))
            .rowCount === 1;
       
    } catch(e) {
        throw(e)
    } finally{
        client!.release();
    }
}