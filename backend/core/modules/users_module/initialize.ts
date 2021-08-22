import { usersEvents } from "../../events"
import { Socket } from "socket.io"
import { getAllUsers } from "../../repositories/users";
import { User } from "../../models/user";

const initializeUsersModule: (socket: Socket) => void = (socket) => {
    socket.rooms.add(usersEvents.room)
    socket.once(usersEvents.initialize, async () => {

        const userlist: User[] = await getAllUsers()
        console.log(userlist)
        socket.emit(usersEvents.initialData, userlist)

    });
}
export default initializeUsersModule