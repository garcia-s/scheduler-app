import 'package:flutter/material.dart';
import 'package:socket_io_client/socket_io_client.dart' as io;

enum SocketStatus {
  connecting,
  connected,
  error,
  disconnected,
  timeout,
}

class ConnectionProvider extends ChangeNotifier {
  SocketStatus _status = SocketStatus.connecting;
  SocketStatus get status => _status;
  io.Socket? _client;

  io.Socket? get socket => _client;

  void connect(String server) {
    _client = io.io(
      server,
      io.OptionBuilder()
          .setTransports(['websocket'])
          .setReconnectionDelay(500)
          .build(),
    );

    _client!.onConnecting((data) {
      _status = SocketStatus.connecting;
      notifyListeners();
    });

    _client!.onConnect((data) {
      _status = SocketStatus.connected;
      notifyListeners();
    });

    _client!.onDisconnect((data) {
      _status = SocketStatus.disconnected;
      notifyListeners();
    });

    _client!.onConnectError((data) {
      _status = SocketStatus.error;
      notifyListeners();
    });
  }
}
