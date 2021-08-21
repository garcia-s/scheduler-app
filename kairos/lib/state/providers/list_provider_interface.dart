import 'package:flutter/material.dart';
import 'package:vortex/models/base_model.dart';


class ListProviderInterface<T extends BaseModel> extends ChangeNotifier {
  
  ListProviderInterface();
  List<T>? _list;

  List<T>? get list => _list;

  void init(List<T> items) {
    _list = items;
    notifyListeners();
  }

  add(T item) {
    if (_list != null) {
      _list!.add(item);
      notifyListeners();
    }
    //Check List is null
    // If null add to queue
    // If not null search for it's id in the list
    // If it's not in the list then add and notifylisteners
  }

  update(T item) {
    _list = _list!.where((e) => e.id != item.id).toList();
    _list!.add(item);
    notifyListeners();
  }

  void delete(String id) {
    _list = _list!.where((e) => e.id != id).toList();
    notifyListeners();
  }

  // _executeQedActions() {}
}
