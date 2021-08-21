import 'package:flutter/material.dart';
import 'package:vortex/models/config.dart';

class ConfigProvider with ChangeNotifier {
  Config? _config;

  Config? get config => _config;

  init(Config conf) {
    _config = _config ?? conf;
    notifyListeners();
  }

  updateMode(bool darkMode) {
    _config?.darkMode = darkMode;
    notifyListeners();
  }

  updateServer(String string) {
    _config?.server = string;
    notifyListeners();
  }
}
