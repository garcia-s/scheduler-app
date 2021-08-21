import { Server, Socket } from "socket.io";
import socket from 'socket.io-client';
import { createServer } from "http";
import { closePool } from "../../core/conf";
import connectionController from "../../core/modules/connection.controller";
import { auth } from "../../core/events";
import { createUser, deleteUserById } from "../../core/repositories/users";
import { User } from "../../core/models/user";
import { v4 as uuid } from 'uuid';

describe('connection-controller >', () => {
    let io: Server;
    const port = 2002;
    const http = createServer()
    const user: User = {
        id: uuid(),
        name: 'Polluted connection controller user',
        password: '123123123',
        username: 'conncontroller',
        tableModuleAccess: 3,
    }

    beforeAll((done) => {
        io = new Server(http);
        io.on('connect', (socket: Socket) => connectionController(io, socket));
        http.listen(port, () => done())
    })

    // afterEach((done) => {
    //     io.close(() => done());
    // });


    afterAll((done) => {
        closePool().finally(() => http.close(() => done()));
    })

    test('Returns auth:error if no data is provided on auth', (done) => {
        const client = socket.io(`http://localhost:${port}`)
        client.emit(auth.signIn)
        client.on(auth.error, () => {
            client.close();
            done()
        })
    });

    test('Returns auth:lock if auth is send unsuccesfully more than 3 times', (done) => {
        const client = socket.io(`http://localhost:${port}`)
        client.emit(auth.signIn)
        client.emit(auth.signIn)
        client.emit(auth.signIn)
        client.on(auth.locked, () => {
            client.close();
            done();
        })
    });


    test('Return auth:error when the an empty object is sent', (done) => {
        const client = socket.io(`http://localhost:${port}`)
        client.emit(auth.signIn, {})
        client.on(auth.error, () => {
            client.close();
            done();
        })
    })


    test('Return auth:error when the an empty object is sent', (done) => {
        const client = socket.io(`http://localhost:${port}`)
        client.emit(auth.signIn, {})
        client.on(auth.error, () => {
            client.close();
            done();
        })
    })

    test('Return auth:error when an non existent user is sent', (done) => {
        const client = socket.io(`http://localhost:${port}`)
        client.emit(auth.signIn, { username: 'fakeuser', password: 'fakepass' });
        client.on(auth.error, () => {
            client.close();
            done();
        });
    })

    test('returns the user when is successfuly loged in', (done) => {
        createUser({ user }).then(() => {
            const client = socket.io(`http://localhost:${port}`)
            client.emit(auth.signIn, {
                username: user.username, password: user.password,
            });

            client.on(auth.current, async (data: User) => {
                expect(data.id).toBe(user.id);
                expect(data.name).toBe(user.name);
                expect(data.username).toBe(user.username);
                await deleteUserById({ id: user.id });
                client.close()
                done();
            });
        })
    });
    test('Unlocks after 10 seconds and responds again', (done) => {
        const client = socket.io(`http://localhost:${port}`)
        client.emit(auth.signIn)
        client.emit(auth.signIn)
        client.emit(auth.signIn)
        client.on(auth.locked, (time: number) => {
            expect(time).toBe(10000);
        })
        client.on(auth.unlocked, () => {
            client.close();
            done();
        })
    }, 20000);
});