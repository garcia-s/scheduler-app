import 'package:vortex/models/user.dart';
import 'package:vortex/views/screens/main/custom_navigation.dart';
import 'package:flutter/material.dart';
import 'package:vortex/views/screens/main/models/custom_navigation_route.dart';

class MainScreen extends StatelessWidget {
  final User user;

  const MainScreen(this.user, {Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    List<CustomNavigationRoute> routes = [];

    return CustomNavigation(routes: routes);
  }
}
