import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:vortex/models/config.dart';
import 'package:vortex/repositories/local/config_repository.dart';
import 'package:vortex/state/providers/config_provider.dart';

// The ConfigProvider should be UP in the widget three,
// other wise this will fail
class ConfigMediator {
  final BuildContext _context;
  final ConfigRepository _repo = ConfigRepository();
  late final ConfigProvider _provider;

  ConfigMediator(this._context) {
    _provider = Provider.of<ConfigProvider>(_context, listen: false);
  }

  static Future<void> init(ConfigProvider provider) async {
    Config data = await ConfigRepository().getConfigData();
    provider.init(data);
  }

  Future<bool> updateServer(String server) async {
    if (!await _repo.setServer(server)) return false;
    _provider.updateServer(server);
    return true;
  }

  Future<bool> updateMode(bool darkMode) async {
    if (!await _repo.setMode(darkMode)) return false;
    _provider.updateMode(darkMode);
    return true;
  }
}
