

export type Session = {
    id: string,
    user: string,
    ip: string,
    started: Date,
    expires: Date
}

export const isSession = (t: Object): t is Session => (
    // Session id cant be empty
    (typeof (t as Session).id === 'string' && (t as Session).id != '') &&
    // IP should be a valid ip
    typeof (t as Session).ip === 'string')
