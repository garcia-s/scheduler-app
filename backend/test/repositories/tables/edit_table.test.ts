import { Table, UpdateTableInfo } from "../../../core/models/table"
import { createTable, updateTable } from "../../../core/repositories/tables"
import { v4 as uuid } from 'uuid'
import { closePool } from "../../../core/conf"
describe('edit-table-repository', () => {


    afterAll(() => closePool())

    test('Returns null when the table doesn\'t exist', async () => {
        const obj = { id: uuid(), capacity: 3}
        expect(await updateTable(obj as UpdateTableInfo)).toBeNull()
    })

    test('Ignores extra parameters inserted through the object', async () => {
        const obj = { id: uuid(), capacity: 3, notreal: 'not' }
        expect(await updateTable(obj as UpdateTableInfo)).toBeNull()
    })

    test('Returns a table when correctly inserted', async () => {
        const table: Table = {
            id: uuid(),
            name: 'Polluted edit table repository',
            active: true,
            capacity: 200,
        }
        await createTable(table)
        const edited = await updateTable({ name: 'New Poluted edit Table Repository', id: table.id } as UpdateTableInfo);
        expect(edited).toBeTruthy();
    })
})




