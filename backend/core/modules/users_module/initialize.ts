import { usersEvents } from "../../events"
import { Socket } from "socket.io"

const initializeUsersModule: (socket: Socket) => void = (socket) => {
    socket.rooms.add(usersEvents.room)
}
export default initializeUsersModule