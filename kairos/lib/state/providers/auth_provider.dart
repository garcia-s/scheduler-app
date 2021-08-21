import 'package:flutter/material.dart';
import 'package:vortex/models/user.dart';

class AuthProvider with ChangeNotifier {
  User? _user;
  bool _loading = false;

  void setLoading(bool load) {
    _loading = load;
    notifyListeners();
  }

  User? get user => _user;
  get loading => _loading;

  setCredentials(User user) {
    _user = user;
    _loading = false;
    notifyListeners();
  }
}
