import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:vortex/models/interface.dart';
import 'package:vortex/models/events.dart';
import 'package:vortex/repositories/remote/base_repository.dart';
import 'package:vortex/state/providers/connection_provider.dart';
import 'package:vortex/state/providers/list_provider_interface.dart';

class ListMediatorInterface<T extends ModelInterface> {
  late final ListProviderInterface<T> _provider;
  late final BaseRepository _repo;
  final T Function(Map<String, dynamic>) factory;

  ListMediatorInterface({
    required BuildContext context,
    required EventSet eventSet,
    required this.factory,
  }) {
    _provider = Provider.of<ListProviderInterface<T>>(context, listen: false);
    _repo = BaseRepository<T>(
        socket: Provider.of<ConnectionProvider>(context, listen: false).socket!,
        eventSet: eventSet,
        factory: factory);
  }

  ListProviderInterface<M> initialize<M extends ModelInterface>({
    required BuildContext context,
    required EventSet eventSet,
    required M Function(Map<String, dynamic>) instanceFactory,
  }) {
    ListProviderInterface<M> provider = ListProviderInterface<M>();
    BaseRepository<M> repo = BaseRepository<M>(
        socket: Provider.of<ConnectionProvider>(context, listen: false).socket!,
        eventSet: eventSet,
        factory: instanceFactory);

    repo.onDeleted(provider.delete);
    repo.onCreated(provider.add);
    repo.onUpdated(provider.update);

    repo.initialize().then((List<M>? list) {
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
      T _new = await _repo.create(t);
      _provider.add(_new);
      return true;
    } catch (e) {
      return false;
    }
  }
}
