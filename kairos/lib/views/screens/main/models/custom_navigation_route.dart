import 'package:flutter/material.dart';

class CustomNavigationRoute {
  CustomNavigationRoute({
    required this.label,
    required this.route,
    required this.inactiveIcon,
    required this.activeIcon,
  });

  final String label;
  final Widget route;
  final Icon inactiveIcon;
  final Icon activeIcon;
}
