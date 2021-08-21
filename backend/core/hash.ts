import { salt } from './conf'
import crypto from 'crypto'

const hash: (p: string) => Promise<string> = (password) => {
    return new Promise((resolve, reject) => {
        crypto.scrypt(password, salt, 256, (err, key) => {
            if (err) reject(err);
            resolve(key.toString('hex'))
        });
    })
}
export default hash


