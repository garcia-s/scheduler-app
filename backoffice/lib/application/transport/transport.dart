import 'dart:convert';
import 'dart:io';
import 'package:client/application/transport/interface.dart';

class TransportListener {
  final String event;
  final void Function(dynamic data) listener;
  final bool once;

  TransportListener({
    required this.event,
    required this.listener,
    required this.once,
  });
}

class TransportClient implements ITransportClient {
  final WebSocket _channel;
  List<TransportListener> _listeners = [];

  TransportClient._fromSocket(this._channel) {
    _channel.listen((message) {
      try {
        List<TransportListener> listeners = _listeners;
        Map<String, dynamic> event = jsonDecode(message);
        for (int i = 0; i < listeners.length; i++) {
          if (listeners[i].event != event['event']) continue;
          listeners[i].listener(event['data']);
          if (listeners[i].once != true) continue;
          _listeners.remove(listeners[i]);
        }
      } catch (e) {
        //
      }
    });
  }

  static Future<TransportClient> connect(String url) async {
    WebSocket socket = await WebSocket.connect(url);
    return TransportClient._fromSocket(socket);
  }

  @override
  void on(String event, void Function(dynamic data) listener) => _listeners = [
        ..._listeners,
        TransportListener(event: event, listener: listener, once: false)
      ];

  void once(String event, void Function(dynamic data) listener) =>
      _listeners = [
        ..._listeners,
        TransportListener(event: event, listener: listener, once: true)
      ];

  void send(String event, {dynamic data}) => _channel.add(jsonEncode({
        "event": event,
        "data": data,
      }));

  void close() {
    _listeners = [];
    _channel.close();
  }
}
