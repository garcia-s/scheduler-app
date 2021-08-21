import 'dart:convert';

import 'package:mockito/mockito.dart';
import 'package:http/http.dart' as http;
import 'package:socket_io_client/socket_io_client.dart' as io;

class MockClient extends Mock implements http.Client {
  @override
  Future<http.Response> post(
    Uri? uri, {
    Object? body,
    Encoding? encoding,
    Map<String, String>? headers,
  }) =>
      super.noSuchMethod(Invocation.method(#post, [uri]),
          returnValue: Future.value(http.Response('no body', 404)));
}

class MockSocket extends Mock implements io.Socket {
  final Map<String, List<dynamic Function(dynamic)>> _events =
      <String, List<dynamic Function(dynamic)>>{};

  @override
  emit(String event, [dynamic data]) {
    for (dynamic Function(dynamic) el in _events[event]!) {
      el(data);
    }
  }

  @override
  on(String event, dynamic Function(dynamic) handler) {
    _events.putIfAbsent(event, () => <dynamic Function(dynamic)>[]);
    _events[event]!.add(handler);
  }
}
