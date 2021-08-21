export type User = {
    id: string
    name: string,
    username: string,
    password: string,
    tableModuleAccess: 0 | 1 | 2 | 3;
    productModuleAccess: 0 | 1 | 2 | 3;
}




// export const isUser = (t: Object): t is User => (
//     typeof (t as User).username === 'string' &&
// )

// export const isUserPermission = (t: Object): t is Order => (
//     typeof (t as Order).tab === 'string' &&
//     typeof (t as Order).server === 'string' &&
//     (typeof (t as Order).isActive === 'boolean' ||
//         typeof (t as Order).isActive === 'undefined')
// )

