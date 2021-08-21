
import { deleteTab } from "../../../core/repositories/tabs";
import PGMock2, { getPool } from "pgmock2";
import { Pool } from "pg";

describe('tabs-repository-delete: Delete a category', () => {
    const mockdb = new PGMock2;
    let mockpool = getPool(mockdb);

    test('Throws error when wrong connection data is provided', async () => {
        return expect(deleteTab({
            pool: new Pool({
                user: 'faked',
                database: 'falsedata',
                host: 'localhost',
                password: 'sdasdccasd',
                port: 5432,
            }),
            id: '123'
        })).rejects.toThrow('Database authentication error')
    })

    test('Returns true when correct data is deleted', () => {
        mockdb.add(`DELETE FROM tabs WHERE id = '123'`, [], { rowCount: 1 });
        return expect(deleteTab({ pool: mockpool, id: '123' }))
            .resolves.toBeTruthy();
    })
})