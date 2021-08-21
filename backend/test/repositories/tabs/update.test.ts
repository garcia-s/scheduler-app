
import { updateTab } from "../../../core/repositories/tabs"
import PGMock2, { getPool } from "pgmock2";
import { Pool } from "pg"



describe('tabs-repository-update: Updates a tab', () => {

    const mockdb = new PGMock2;
    let mockpool = getPool(mockdb);

    test('Throws error when wrong connection data is provided', async () => {
        return expect(updateTab({
            pool: new Pool({
                user: 'faked',
                database: 'falsedata',
                host: 'localhost',
                password: 'sdasdccasd',
                port: 5432,
            }),
            id: '123',
            data: { table: '3' }
        })).rejects.toThrow('Database authentication error')
    })

    test('Returns false if no updated data is provided', async () => {
        return expect(updateTab({
            pool: mockpool,
            id: '123',
            data: {}
        })).resolves.toBeFalsy();
    });


    test('Returns false when 0 rows are affected', async () => {
        mockdb.add(`UPDATE tabs SET table = '3' WHERE id='123'`,
            [],
            { rowCount: 0 });
        await expect(updateTab({
            pool: mockpool,
            id: '123',
            data: { table: '3' }
        })).resolves.toBeFalsy();
    })


    test('Inserts data when necessary and returns true', async () => {

        mockdb.add(`UPDATE tabs SET table = '3' WHERE id='123'`,
            [],
            { rowCount: 1 });
        await expect(updateTab({
            pool: mockpool,
            id: '123',
            data: { table: '3' }
        })).resolves.toBeTruthy();


        mockdb.add(`UPDATE tabs SET isActive = true WHERE id='123'`,
            [],
            { rowCount: 1 });
        await expect(updateTab({
            pool: mockpool,
            id: '123',
            data: { isActive: true }
        })).resolves.toBeTruthy();
    })
})