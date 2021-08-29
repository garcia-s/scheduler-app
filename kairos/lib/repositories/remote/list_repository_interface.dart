import 'dart:async';

import 'package:vortex/helpers/cast.dart';
import 'package:vortex/models/interface.dart';
import 'package:socket_io_client/socket_io_client.dart' as io;
import 'package:vortex/models/events.dart';

class ListRepositoryInterface<D extends ModelInterface> {
  final io.Socket socket;
  final EventSet eventSet;
  final D Function(Map<String, dynamic>) factory;

  ListRepositoryInterface({
    required this.socket,
    required this.eventSet,
    required this.factory,
  });

  void onDeleted(dynamic Function(String) listener) =>
      socket.on(eventSet.deletedEvent, (t) => listener(t as String));

  void onCreated(dynamic Function(D) listener) =>
      socket.on(eventSet.createdEvent, (t) => listener(factory(t)));

  void onUpdated(dynamic Function(D) listener) =>
      socket.on(eventSet.createdEvent, (t) => listener(factory(t)));

  Future<List<D>> initialize() {
    Completer<List<D>> completer = Completer<List<D>>();
    socket.once(eventSet.initialData, (data) {
      socket.off(eventSet.initError);

      var list = castOrNull<List>(data);
      return list != null
          ? completer.complete(
              list.map((t) => factory(t as Map<String, dynamic>)).toList())
          : completer.completeError({
              'type': 'typeguard failed',
              'message': 'Data is corrupted',
            });
    });
    socket.once(eventSet.initError, (e) {
      socket.off(eventSet.initialData);
      completer.completeError(e);
    });
    socket.emit(eventSet.initialize);
    return completer.future;
  }

  Future<String> delete(String id) {
    Completer<String> completer = Completer<String>();
    return completer.future;
  }

  Future<E> create<E extends ModelInterface> (E obj) {
    Completer<E> completer = Completer<E>();

    return completer.future;
  }
}
