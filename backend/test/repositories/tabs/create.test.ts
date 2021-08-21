import { createTab } from "../../../core/repositories/tabs";
import PGMock2, { getPool } from "pgmock2";
import { Tab } from "../../../core/models/tab";
import { Pool } from "pg";

describe('tabs-repository-create: create a tab', () => {
    const mockdb = new PGMock2;
    let mockpool = getPool(mockdb);

    const tab: Tab = {
        id: '123',
        table: 'asd12',
        opentime: new Date(),
    }

    test('Throws an error when no connection is established', async () => {
        const fake = new Pool({
            user: 'faked',
            database: 'feasdata',
            host: 'localhost',
            password: 'sdasdccasd',
            port: 5432,
        })

        return expect(createTab({ pool: fake, tab: tab }))
            .rejects.toThrow('Database authentication error')
    })

    test('Returns true when data is inserted', async () => {
        mockdb.add(
            `INSERT INTO tabs 
                (id, table, opentime)
                VALUES (
                    ${tab.id},
                    ${tab.table},
                    ${tab.opentime},
                )`,
            [], {})
        return expect(createTab({ pool: mockpool, tab: tab }))
            .resolves.toBeTruthy();
    })
})