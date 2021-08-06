import 'package:flutter/material.dart';

abstract class ProviderInterface<T> extends ChangeNotifier {
  List<T>? list;
  //List<dynamic>? _queue;

  void initialize(List<T> data) {
    list = data;
    notifyListeners();
  }
  // Might need to provide a sort
  void add(T t) {
    //TODO: Replace with a queue, actions can be queued before initializing.
    //Helpful for websocket or sse architecture where events might come out of order.
    if(list == null ) throw Exception('Cannot add before initializing');
    list!.add(t);
  }
  //???????????
  void delete() {}
}
