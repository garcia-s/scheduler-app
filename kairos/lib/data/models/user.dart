enum UserAccess {
  su,
  admin,
  user,
}

class User {
  final String id;
  String username;
  String name;
  UserAccess access;

  User({
    required this.id,
    required this.username,
    required this.name,
    required this.access,
  });
}
