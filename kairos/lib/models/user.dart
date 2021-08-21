class User {
  String id;
  String name;
  String username;
  int tableModuleAccess; // MIGHT CHANGE IT TO ENUM
  int productModuleAccess;

  User({
    required this.id,
    required this.name,
    required this.username,
    required this.tableModuleAccess,
    required this.productModuleAccess,
  });

  // User.fromJson(Map<String, dynamic> json) {
  //   this.name = json['name'];
  //   this.id = json['id'];

  // }
}
