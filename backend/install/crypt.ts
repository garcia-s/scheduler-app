import { salt } from '../core/conf'
import crypto from 'crypto'

crypto.scrypt('12312312', salt, 256, (err, key) => {
    console.log(key.toString('hex'))
})