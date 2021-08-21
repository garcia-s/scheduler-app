import 'package:vortex/models/events.dart';

const tableEvents = EventSet(
  create: 'tables:create',
  modify: 'tables:modify',
  delete: 'tables:delete',
  initialize: 'tables:initialize',
  // server-events

  createdEvent: 'tables:created-table',
  updatedEvent: 'tables:updated-table',
  deletedEvent: 'tables:deleted-table',
  //Responses
  initialData: 'tables:initial-data',
  successCreated: 'tables:success-created',
  successDeleted: 'tables:success-deleted',
  successModified: 'tables:success-modified',
  //Errors
  initError: 'tables:init-error',
  errorCreated: 'tables:error-created',
  errorDeleted: 'tables:error-deleted',
  errorModified: 'tables:error-modified',
);
