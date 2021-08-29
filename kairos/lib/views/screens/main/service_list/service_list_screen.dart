import 'package:flutter/material.dart';
import 'package:vortex/models/service.dart';
import 'package:vortex/views/widgets/generic_list/list.dart';

class ServiceListScreen extends StatelessWidget {
  const ServiceListScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return GenericSearchableEditableList<Service>(
      list: const [],
      render: (user) => Container(),
      search: (u, _) => true,
    );
  }
}
