import 'dart:async';
import 'package:socket_io_client/socket_io_client.dart' as io;
import 'package:vortex/models/user.dart';

class AuthEvents {
  static const String error = 'auth:error';
  static const String currentUser = 'auth:current-user';
  static const String authenticate = 'auth:sign-in';
  static const String locked = 'auth:locked';
  static const String unlocked = 'unlocked';
  static const String updatedUser = 'auth:user-update';
}

class AuthRepository {
  final io.Socket _socket;

  AuthRepository(this._socket);

  Future<User> loginWithUserNameAndPassword(
      String username, String password) async {
    Completer<User> _completer = Completer();
    _socket.once(AuthEvents.currentUser, (d) {
      //TODO: TYPECHECK THIS SHIT
      _completer.complete(
        User(
          services: (d['services'] as List).isEmpty ? [] : d['services'],
          admin: d['admin'] ?? false,
          root: d['root'] ?? false,
          username: d['username'],
          name: d['name'],
          id: d['id'],
        ),
      );
      _socket.off(AuthEvents.error);
    });

    _socket.once(AuthEvents.error, (data) {
      _completer.completeError(data);
      _socket.off(AuthEvents.error);
      _socket.off(AuthEvents.currentUser);
    });

    _socket.emit(AuthEvents.authenticate, {
      'username': username,
      'password': password,
    });
    return _completer.future;
  }

  logoutUser() {}
}
