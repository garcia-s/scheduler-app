
import { Server, Socket } from 'socket.io';
import { createServer } from 'http'
import connectionController from './core/modules/connection.controller';

const server = createServer();
const io = new Server(server, {
    cors: {
        origin: (_, cb) => { cb(null, true) },
        methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
    }
})

io.on('connect', (socket: Socket) => connectionController(io, socket))
server.listen(3000, () => console.log('Running on port 3000'))