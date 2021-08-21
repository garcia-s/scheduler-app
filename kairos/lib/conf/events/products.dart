import 'package:vortex/models/events.dart';

const productEvents = EventSet(
  create: 'products:create',
  modify: 'products:modify',
  delete: 'products:delete',
  initialize: 'products:initialize',
  createdEvent: 'products:created-table',
  updatedEvent: 'products:updated-table',
  deletedEvent: 'products:deleted-table',
  initialData: 'products:initial-data',
  successCreated: 'products:success-created',
  successDeleted: 'products:success-deleted',
  successModified: 'products:success-modified',
  initError: 'products:init-error',
  errorCreated: 'products:error-created',
  errorDeleted: 'products:error-deleted',
  errorModified: 'products:error-modified',
);
