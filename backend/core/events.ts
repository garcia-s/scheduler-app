import createEventSet from "./models/event_set"

export const authEvents = {
    signIn: 'auth:sign-in',
    current: 'auth:current-user',
    updatedUser: 'auth:user-update',
    error: 'auth:error',
    locked: 'auth:locked',
    unlocked: 'auth:unlocked'
}


export const usersEvents = createEventSet('users')

export const servicesEvents = createEventSet('services')

// events

