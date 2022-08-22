interface EventGroup  {
   [key: string]: EventReqRes
}

type EventReqRes = {
   request: string,
   response: string,
   event: string,
}

export const userEvents: EventGroup  = {
   createUser:{
      request:'users:createUser',
      response: 'users:createUserResponse',
      event: 'users:createdUserEvent'
   },
   login: {
      request:'users:loginUser',
      response:'users:loginUserResponse',
      event:'users:loggedInUser'
   }
}
