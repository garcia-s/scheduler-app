import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:vortex/models/user.dart';
import 'package:vortex/repositories/remote/auth_repository.dart';
import 'package:vortex/state/providers/auth_provider.dart';
import 'package:vortex/state/providers/connection_provider.dart';

class AuthMediator {
  late final AuthProvider _auth;
  late final ConnectionProvider _conn;
  AuthMediator(BuildContext context) {
    _auth = Provider.of<AuthProvider>(context, listen: false);
    _conn = Provider.of<ConnectionProvider>(context, listen: false);
  }

  Future<bool> loginWithUserAndPass(String username, String password) async {
    try {
      final AuthRepository repo = AuthRepository(_conn.socket!);
      final User user =
          await repo.loginWithUserNameAndPassword(username, password);
      _auth.setCredentials(user);
      return true;
    } catch (e) {
      return false;
      //TODO: LOG THE ERROR
    }
  }
}
