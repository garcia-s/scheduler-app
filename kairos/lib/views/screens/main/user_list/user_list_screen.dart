import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:vortex/models/user.dart';
import 'package:vortex/state/providers/list_provider_interface.dart';
import 'package:vortex/views/widgets/generic_list/list.dart';
import 'package:vortex/views/widgets/loading.dart';

class UserListScreen extends StatelessWidget {
  const UserListScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final _list = Provider.of<ListProviderInterface<User>>(context).list;
    if (_list == null) return const ModalLoadingScreen();
    return GenericSearchableEditableList<User>(
      list: _list,
      render: (user) => Text(user.name),
      search: (u, _) => true,
    );
  }
}
