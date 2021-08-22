import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:vortex/models/interface.dart';
import 'package:vortex/models/events.dart';
import 'package:vortex/repositories/remote/list_repository_interface.dart';
import 'package:vortex/state/providers/connection_provider.dart';
import 'package:vortex/state/providers/list_provider_interface.dart';

class ListMediatorInterface<T extends ModelInterface> {
  late final ListRepositoryInterface<T> _repo;
  final EventSet _eventSet;
  final T Function(Map<String, dynamic>) factory;
  final BuildContext _context;

  ListMediatorInterface({
    required BuildContext context,
    required EventSet eventSet,
    required this.factory,
  })  : _eventSet = eventSet,
        _context = context,
        _repo = ListRepositoryInterface<T>(
            socket:
                Provider.of<ConnectionProvider>(context, listen: false).socket!,
            eventSet: eventSet,
            factory: factory);

  ListProviderInterface<T> initialize() {
    ListProviderInterface<T> provider = ListProviderInterface();
    _repo.onDeleted(provider.delete);
    _repo.onCreated(provider.add);
    _repo.onUpdated(provider.update);

    _repo.initialize().then((List<T>? list) {
      list != null ? provider.init(list) : null;
    }).catchError((e) {
      //LOG TO FILE
    });
    return provider;
  }

  static void removeListeners(BuildContext context, EventSet eventSet) {
    final ConnectionProvider _conn = Provider.of<ConnectionProvider>(context);
    _conn.socket!.off(eventSet.deletedEvent);
    _conn.socket!.off(eventSet.updatedEvent);
    _conn.socket!.off(eventSet.createdEvent);
  }

  Future<bool> delete(String id) async {
    try {
      var _provider =
          Provider.of<ListProviderInterface<T>>(_context, listen: false);
      await _repo.delete(id);
      _provider.delete(id);
      return true;
    } catch (e) {
      // LOG TO A FILE
      return false;
    }
  }

  Future<bool> create(T t) async {
    try {
      var _provider =
          Provider.of<ListProviderInterface<T>>(_context, listen: false);
      T _new = await _repo.create(t);
      _provider.add(_new);
      return true;
    } catch (e) {
      return false;
    }
  }
}
