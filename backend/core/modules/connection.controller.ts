import isLoginInfo from "../validators/is_login_info";
import { Server, Socket } from "socket.io"

import { getUserByLoginInfo, userExists } from "../repositories/users";
import { User } from "../models/user";
import { authEvents } from "../events";
import initializeUsersModule from "./users_module/initialize";

const connectionController: (io: Server, socket: Socket) => void = async (io, socket) => {

    let locked = false;
    let tries = 0;
    let lockedtimes = 0;
    let timer: any;

    socket.on(authEvents.signIn, async (arg: any) => {

        if (locked) return;
        if (typeof arg != 'object' ||
            !isLoginInfo(arg.password, arg.username) ||
            !(await userExists(arg.username))) {
            tries++

            if (tries > 3) {
                locked = true
                lockedtimes++
                const time = lockedtimes * 10000;
                socket.emit(authEvents.error, { type: 'auth-locked', data: time })
                return timer = setTimeout(() => {
                    locked = false;
                    socket.emit(authEvents.unlocked);
                }, time)
            }
            return socket.emit(authEvents.error, { type: 'auth-error' });
        }

        const user = await getUserByLoginInfo(arg.username, arg.password)
        if (!user) {
            //TODO:  ADD ATTEMPT TO THE USER IN THE DATABASE AND/OR LOCK HIM
            return socket.emit(authEvents.error, 'This is an error string');
        }

        // socket.join(user.id);     Not necessary just yet
        delete user.password
        socket.emit(authEvents.current, user)

        if (user.admin) {
            initializeUsersModule(socket)
        } else {

        }


    });

    socket.on('disconnect', () => {
        clearTimeout(timer)
        socket.removeAllListeners
    });
}

export default connectionController