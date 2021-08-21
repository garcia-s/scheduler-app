
import { Server } from "socket.io";
import socket from 'socket.io-client';
import { createServer } from "http";
import { closePool } from "../../../core/conf";
import tableReadHandler from "../../../core/modules/tables/read.handler";
import { tables } from '../../../core/events';
import { Table } from "../../../core/models/table";
import { v4 as uuid } from 'uuid';
import { createTable, deleteTable } from "../../../core/repositories/tables";

describe('tables-read-handler >', () => {
    let io: Server;
    const port = 2003;
    const http = createServer()
    const table: Table = {
        id: uuid(),
        active: true,
        capacity: 3,
        name: 'Polluted read-handler-test'
    }


    beforeAll((done) => {
        io = new Server(http);
        io.on('connect', (socket) => tableReadHandler(socket));
        http.listen(port, () => done())
    })

    afterAll((done) => {
        closePool().finally(() => http.close(() => done()));
    })

    test('Recieves custom event if connected to the tables room', (done) => {
        const client = socket.io(`http://localhost:${port}`)
        client.on('received-with-table', () => {
            client.close()
            done();
        })
        client.on('connect', () =>
            io.to(tables.room).emit('received-with-table', 'r'))
    })

    test('Receives an event for the initial tableData with an array of tables', (done) => {
        const client = socket.io(`http://localhost:${port}`)
        client.on(tables.initialData, (data: Table[]) => {
            expect(Array.isArray(data)).toBeTruthy();
            client.close()
            done();
        })
    })

    test('Receives a newly inserted table with the initial data', (done) => {
        createTable(table).then(() => {
            const client = socket.io(`http://localhost:${port}`)

            client.on(tables.initialData, (data: Table[]) => {
                if (!Array.isArray(data)) done(new Error('Not an array'))
                expect(data.find((e: any) => (e as Table).id = table.id))
                    .toBeTruthy()
                client.close();
                return deleteTable(table.id).then(() => done());
            })
        }).catch(done)
    })
})