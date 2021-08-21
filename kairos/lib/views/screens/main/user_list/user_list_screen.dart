import 'package:flutter/material.dart';
import 'package:vortex/models/user.dart';
import 'package:vortex/views/widgets/generic_list/list.dart';

class UserListScreen extends StatelessWidget {
  const UserListScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return GenericSearchableEditableList<User>(
      list: [],
      render: (user) => Container(),
      search: (u, _) => true,
    );
  }
}
