import 'package:vortex/models/user.dart';
import 'package:vortex/views/screens/main/custom_navigation.dart';
import 'package:flutter/material.dart';
import 'package:vortex/views/screens/main/models/custom_navigation_route.dart';
import 'package:vortex/views/screens/main/service_list/services_list_screen.dart';
import 'package:vortex/views/screens/main/user_list/user_list_screen.dart';

class MainScreen extends StatelessWidget {
  final User user;

  const MainScreen(this.user, {Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    List<CustomNavigationRoute> routes;
    if (user.admin) {
      routes = [
        CustomNavigationRoute(
          label: 'Servicios',
          route: const ServiceListScreen(),
          inactiveIcon: const Icon(Icons.nat),
          activeIcon: const Icon(Icons.nat),
        ),
        CustomNavigationRoute(
          label: 'Usuarios',
          route: const UserListScreen(),
          inactiveIcon: const Icon(Icons.nat),
          activeIcon: const Icon(Icons.nat),
        )
      ];
    } else {
      routes = [
        CustomNavigationRoute(
          label: 'Servicios',
          route: const ServiceListScreen(),
          inactiveIcon: const Icon(Icons.nat),
          activeIcon: const Icon(Icons.nat),
        )
      ];
    }

    return CustomNavigation(routes: routes);
  }
}
