
const isLoginInfo: (username: any, pass: any) => boolean = (username, password) =>
    (typeof username === 'string' && username.length > 5) &&
    (typeof password === 'string' && password.length > 7);

export default isLoginInfo;