import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:vortex/models/category.dart';
import 'package:vortex/state/providers/list_provider_interface.dart';
import 'package:vortex/views/widgets/buttons/circular_icon_button.dart';
import 'package:vortex/views/widgets/generic_list/list.dart';
import 'package:vortex/views/widgets/loading.dart';

class CategoriesScreen extends StatelessWidget {
  const CategoriesScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    List<Category>? _list =
        Provider.of<ListProviderInterface<Category>>(context).list;
    if (_list == null) return const ModalLoadingScreen();
    return GenericSearchableEditableList<Category>(
      search: (t, txt) => t.name.toLowerCase().contains(txt.toLowerCase()),
      onAdd: () {},
      list: _list,
      render: (t) => Row(
        children: [
          Expanded(child: Text(t.name), flex: 2),
          // Expanded(
          //   flex: 1,
          // child: Text('Tipos: ${t.types.length}'),
          // ),
          CircularIconButton(
            icon: Icons.edit_outlined,
            onPressed: () {},
            iconColor: Colors.white,
            color: Colors.blueAccent,
            size: 40,
          ),
          CircularIconButton(
            icon: Icons.delete_outline,
            onPressed: () {},
            iconColor: Colors.white,
            color: Colors.red,
            size: 40,
          )
        ],
      ),
    );
  }
}
