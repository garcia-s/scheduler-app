import 'package:flutter/material.dart';
import 'package:scheduler/data/models/user.dart';

class AuthProvider extends ChangeNotifier {
  AuthProvider();

  User? _user;

  User? get user => _user;

  void setUser(User u) {
    _user = u;
    notifyListeners();
  }
}
