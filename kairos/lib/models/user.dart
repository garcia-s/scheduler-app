import 'package:vortex/models/interface.dart';

class User extends ModelInterface {
  @override
  final String id;
  final String name;
  final String username;
  final bool root;
  final bool admin;
  final List<String> services;

  User({
    required this.id,
    required this.name,
    required this.username,
    required this.root,
    required this.admin,
    required this.services,
  });

  User.fromJson(Map<String, dynamic> map)
      : id = map['id'],
        name = map['name'],
        username = map['username'],
        root = map['root'],
        admin = map['admin'],
        services = (map['services'] as List).isEmpty ? [] : map['services'];
}
