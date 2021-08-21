class EventSet {
  // requests
   final String create;
   final String modify;
   final String delete;
   final String initialize;

  // server-events
   final String createdEvent;
   final String updatedEvent;
   final String deletedEvent;

  //Responses
   final String initialData;
   final String successCreated;
   final String successDeleted;
   final String successModified;

  //Errors
   final String initError;
   final String errorCreated;
   final String errorDeleted;
   final String errorModified;

  const EventSet(String prefix)
      : create = '$prefix:create',
        modify = '$prefix:modify',
        delete = '$prefix:delete',
        initialize = '$prefix:initialize',
        createdEvent = '$prefix:created-table',
        updatedEvent = '$prefix:updated-table',
        deletedEvent = '$prefix:deleted-table',
        initialData = '$prefix:initial-data',
        successCreated = '$prefix:success-created',
        successDeleted = '$prefix:success-deleted',
        successModified = '$prefix:success-modified',
        initError = '$prefix:init-error',
        errorCreated = '$prefix:error-created',
        errorDeleted = '$prefix:error-deleted',
        errorModified = '$prefix:error-modified';
}
