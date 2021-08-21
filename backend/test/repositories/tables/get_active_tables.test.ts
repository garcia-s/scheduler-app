import { createTable, deleteTable, getActiveTables } from "../../../core/repositories/tables";
import { closePool } from "../../../core/conf";
import { Table } from "../../../core/models/table";
import { v4 as uuid } from 'uuid';

describe('get-active-tables-repository >', () => {
    afterAll(async () => await closePool())

    test('Returns an array data types', async () => {
        const res = await getActiveTables();
        expect(Array.isArray(res)).toBeTruthy();
    })


    test('Returns an array that contains a recently created table', async () => {
        const table: Table = {
            id: uuid(),
            active: true,
            capacity: 5,
            name: 'POLUTED TABLE get active-tables'
        }
        await createTable(table)

        const res = await getActiveTables();
        const found = res.find((e) => e.id === table.id)
        expect(found.id).toBe(table.id);
        //  Cleanup
        const clean = await deleteTable(table.id)
        expect(clean).toBeTruthy();
    });
});