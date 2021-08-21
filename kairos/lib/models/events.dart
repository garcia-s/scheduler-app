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

  const EventSet({
    required this.create,
    required this.modify,
    required this.delete,
    required this.initialize,
    required this.createdEvent,
    required this.updatedEvent,
    required this.deletedEvent,
    required this.initialData,
    required this.successCreated,
    required this.successDeleted,
    required this.successModified,
    required this.initError,
    required this.errorCreated,
    required this.errorDeleted,
    required this.errorModified
  });
}
