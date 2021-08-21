export type EventSet = {
    room: string
    create: string
    modify: string
    delete: string
    initialize: string
    createdEvent: string
    updatedEvent: string
    deletedEvent: string
    initialData: string
    successCreated: string
    successDeleted: string
    successModified: string
    initError: string
    errorCreated: string
    errorDeleted: string
    errorModified: string
}

const createEventSet: (prefix: string) => EventSet = (prefix) => ({
    room: prefix + '-room',
    create: prefix + ':create',
    modify: prefix + ':modify',
    delete: prefix + ':delete',
    initialize: prefix + ':initialize',
    createdEvent: prefix + ':created-table',
    updatedEvent: prefix + ':updated-table',
    deletedEvent: prefix + ':deleted-table',
    initialData: prefix + ':initial-data',
    successCreated: prefix + ':success-created',
    successDeleted: prefix + ':success-deleted',
    successModified: prefix + ':success-modified',
    initError: prefix + ':init-error',
    errorCreated: prefix + ':error-created',
    errorDeleted: prefix + ':error-deleted',
    errorModified: prefix + ':error-modified',

})
export default createEventSet