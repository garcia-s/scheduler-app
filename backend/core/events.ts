export const auth = {
    signIn: 'auth:sign-in',
    current: 'auth:current-user',
    updatedUser: 'auth:user-update',
    error: 'auth:error',
    locked: 'auth:locked',
    unlocked: 'auth:unlocked'
}


export const tables = {
    room: 'tables-room',
    // Requests
    create: 'tables:create',
    modify: 'tables:modify',
    delete: 'tables:delete',
    initialize: 'tables:initialize',

    // events
    createdTableEvent: 'tables:created-table',
    updatedTableEvent: 'tables:updated-table',
    deletedTableEvent: 'tables:deleted-table',

    //Responses
    initialData: 'tables:initial-data',
    successCreated: 'tables:success-created',
    succesDeleted: 'tables:success-deleted',
    succesModifiedd: 'tables:success-modified',

    //Errors
    errorCreated: 'tables:error-created',
    errorDeleted: 'tables:error-deleted',
    errorModified: 'tables:error-modified'

}


export const products = {
    room: 'products-room',
    // Requests
    create: 'products:create',
    modify: 'products:modify',
    delete: 'products:delete',
    initialize: 'products:initialize',

    // events
    createdProductEvent: 'products:created-table',
    updatedProductEvent: 'products:updated-table',
    deletedProductEvent: 'products:deleted-table',

    //Responses
    initialData: 'products:initial-data',
    successCreated: 'products:success-created',
    succesDeleted: 'products:success-deleted',
    succesModifiedd: 'products:success-modified',

    //Errors
    errorCreated: 'products:error-created',
    errorDeleted: 'products:error-deleted',
    errorModified: 'products:error-modified'
}


export const categories = {
    room: 'categories-room',
    // Requests
    create: 'categories:create',
    modify: 'categories:modify',
    delete: 'categories:delete',
    initialize: 'categories:initialize',

    // events
    createdTableEvent: 'categories:created-table',
    updatedTableEvent: 'categories:updated-table',
    deletedTableEvent: 'categories:deleted-table',

    //Responses
    initialData: 'categories:initial-data',
    successCreated: 'categories:success-created',
    succesDeleted: 'categories:success-deleted',
    succesModifiedd: 'categories:success-modified',

    //Errors
    errorCreated: 'categories:error-created',
    errorDeleted: 'categories:error-deleted',
    errorModified: 'categories:error-modified'
}