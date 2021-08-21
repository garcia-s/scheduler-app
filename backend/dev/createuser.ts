import { createUser } from "../core/repositories/users";
import {v4 as uuid} from 'uuid';
console.log('Creating User')
createUser({
    user: {
        id: uuid(),
        username: 'username',
        password: 'password',
        name: 'Polluted test user',
        tableModuleAccess: 0,
        productModuleAccess: 0,
    }
}).then(() => console.log('Created User'))