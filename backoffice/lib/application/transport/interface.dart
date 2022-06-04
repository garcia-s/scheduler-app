abstract class ITransportClient {
  ITransportClient(String url);

  // void close();

  void on(String event, Function(dynamic data) listener);

  // void once(String event, Function(dynamic data) listener);

  // void off(String event, Function(dynamic data) listener);
}
