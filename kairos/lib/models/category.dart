import 'package:vortex/models/base_model.dart';

class Category extends BaseModel {
  
  @override
  late final String id;
  late String name;
  late int? position;

  Category({
    required this.id,
    required this.name,
    this.position,
  });

  Category.fromJson(Map<String, dynamic> map) {
    id = map['id'];
    name = map['name'];
    position = map['position'];
  }

  static bool isType(Map<String, dynamic> map) =>
      (map['name'] == null || map['name'] is String) &&
      (map['position'] == null || map['position'] is int) &&
      (map['id'] is String && map['id'] != '');
}

class CreationCategoryModel {
  String name;
  int? position;

  CreationCategoryModel({
    required this.name,
    this.position,
  });
}
