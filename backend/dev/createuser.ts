import { createUser } from "../core/repositories/users";
import { v4 as uuid } from 'uuid';
console.log('Creating User')
createUser({
    id: uuid(),
    username: 'username',
    password: 'password',
    name: 'Polluted test user',
    services: [],
    admin: true, //has all access to everything even if no services are associated
    root: true, //Cannot be deleted by anyone
}).then(() => console.log('Created User'))