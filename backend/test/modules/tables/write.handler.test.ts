
import { Server } from "socket.io";
import socket from 'socket.io-client';
import { createServer } from "http";
import { closePool } from "../../../core/conf";
import { tables } from '../../../core/events';
import tablesWriteHandler from "../../../core/modules/tables/write.handler";
import { Table } from "../../../core/models/table";
import { deleteTable } from "../../../core/repositories/tables";

describe('tables-write-handler >', () => {
    let io: Server;
    const port = 2001;
    const http = createServer()

    beforeAll((done) => {
        io = new Server(http);
        io.on('connect', (socket) => tablesWriteHandler(socket));
        http.listen(port, () => done())
    })

    afterAll((done) => {
        closePool().finally(() => http.close(() => done()));
    })
    describe('tables-create-listener', () => { })
    test('Returns error when the data is incomplete', (done) => {
        const client = socket.io(`http://localhost:${port}`)
        client.emit(tables.create, { id: '123', })
        client.on(tables.error, () => {
            client.close();
            done();
        })
        client.on(tables.successCreated, () => {
            client.close();
            done(new Error('Returned succesfully but shoul fail'))
        })
    })

    test('Returns success and the table when data is correctly inserte', (done) => {
        const client = socket.io(`http://localhost:${port}`)
        client.emit(tables.create, {
            name: 'Polluted write handler',
            active: true,
            capacity: 3,
        })
        client.on(tables.error, () => {
            client.close();
            done(new Error('Failed but should succeed'))
        })
        client.on(tables.successCreated, async (data: Table) => {
            // Clean up 
            expect(await deleteTable(data.id)).toBeTruthy()
            client.close();
            done();
        })
    })
    describe('tables-update-listener', () => {
    
    })
})