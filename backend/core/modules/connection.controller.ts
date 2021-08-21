import isLoginInfo from "../validators/is_login_info";
import { Server, Socket } from "socket.io"
import { auth } from "../events";
import { getUserByLoginInfo, userExists } from "../repositories/users";
import initializeProductModule from "./products/products.module";
import { User } from "../models/user";
import initializeTableModule from "./tables/tables.module";

const connectionController: (io: Server, socket: Socket) => void = async (io, socket) => {

    let locked = false;
    let tries = 0;
    let lockedtimes = 0;
    let timer: any;

    socket.on(auth.signIn, async (arg: any) => {

        if (locked) return;
        if (typeof arg != 'object' ||
            !isLoginInfo(arg.password, arg.username) ||
            !(await userExists({ username: arg.username }))) {
            tries++

            if (tries > 3) {
                locked = true
                lockedtimes++
                const time = lockedtimes * 10000;
                socket.emit(auth.error, { type: 'auth-locked', data: time })
                return timer = setTimeout(() => {
                    locked = false;
                    socket.emit(auth.unlocked);
                }, time)
            }
            return socket.emit(auth.error, { type: 'auth-error' });
        }

        const user = await getUserByLoginInfo(arg)
        if (!user) {
            //TODO:  ADD ATTEMPT TO THE USER IN THE DATABASE AND/OR LOCK HIM
            return socket.emit(auth.error, 'This is an error string');
        }

        // socket.join(user.id);     Not necessary just yet
        delete user.password
        socket.emit(auth.current, user)

        // initialize modules for this user.
        initializeTableModule(socket, user as User);
        initializeProductModule(socket, user as User);


    });

    socket.on('disconnect', () => {
        clearTimeout(timer)
        socket.removeAllListeners
    });
}

export default connectionController