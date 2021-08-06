import 'package:flutter/material.dart';
import 'package:scheduler/conf/server.dart';
import 'package:socket_io_client/socket_io_client.dart' as io;

enum SocketStatus { connected, error, disconnected }
class ConnectionProvider extends ChangeNotifier {

  SocketStatus _status = SocketStatus.disconnected;

  SocketStatus get status => _status;

  late final io.Socket _client;

  io.Socket get socket => _client;

  ConnectionProvider() {
    _client = io.io(
      ServerInformation.address,
      io.OptionBuilder()
          .setTransports(['websocket'])
          .setReconnectionDelay(300)
          .setReconnectionAttempts(10)
          .build(),
      // for Flutter OR DART VM
    );
    _client.onConnect((data) {
      _status = SocketStatus.connected;
      notifyListeners();
    });
    _client.onDisconnect((reason) {
      _status =
          reason == 'io server disconnect' || reason == 'io client disconnect'
              ? SocketStatus.disconnected
              : SocketStatus.error;
      notifyListeners();
    });

    _client.onConnectError((data) {
      _status = SocketStatus.error;
      notifyListeners();
    });
  }
}
