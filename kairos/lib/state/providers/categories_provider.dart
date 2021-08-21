import 'package:flutter/material.dart';
import 'package:vortex/models/category.dart';

class CategoriesProvider with ChangeNotifier {
  CategoriesProvider();
  List<Category>? _products;

  List<Category>? get products => _products;

  void init(List<Category> productlist) {
    _products = productlist;
    notifyListeners();
  }

  add(Category product) {
    if (_products != null) {
      _products!.add(product);
      notifyListeners();
    }
    //Check List is null
    // If null add to queue
    // If not null search for it's id in the list
    // If it's not in the list then add and notifylisteners
  }

  update(Category product) {
    _products = _products!.where((e) => e.id != product.id).toList();
    _products!.add(product);
    notifyListeners();
  }

  void delete(String id) {
    _products = _products!.where((e) => e.id != id).toList();
    notifyListeners();
  }

  _executeQedActions() {}
}
