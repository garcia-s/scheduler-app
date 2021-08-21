import 'package:flutter/material.dart';
import 'package:vortex/views/screens/main/models/custom_navigation_route.dart';

class CustomNavigation extends StatefulWidget {
  final List<CustomNavigationRoute> routes;

  const CustomNavigation({Key? key, required this.routes}) : super(key: key);

  @override
  _CustomNavigationState createState() => _CustomNavigationState();
}

class _CustomNavigationState extends State<CustomNavigation> {
  int _selectedIndex = 0;
  bool _extended = false;

  @override
  Widget build(BuildContext context) {
    if (widget.routes.length < 2) return Scaffold(body: widget.routes[0].route);

    Size size = MediaQuery.of(context).size;
    if (size.width < 700) {
      return _CustomMobileNavigator(
          routes: widget.routes,
          selectedIndex: _selectedIndex,
          onDestinationSelected: (int index) =>
              setState(() => _selectedIndex = index));
    }
    return _CustomDesktopNavigator(
        routes: widget.routes,
        extended: _extended,
        selectedIndex: _selectedIndex,
        onExtend: () => setState(() => _extended = !_extended),
        onDestinationSelected: (int index) =>
            setState(() => _selectedIndex = index));
  }
}

class _CustomMobileNavigator extends StatelessWidget {
  final List<CustomNavigationRoute> routes;
  final void Function(int) onDestinationSelected;
  final int selectedIndex;

  const _CustomMobileNavigator({
    required this.routes,
    required this.onDestinationSelected,
    required this.selectedIndex,
  });

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: routes[selectedIndex].route,
      bottomNavigationBar: BottomNavigationBar(
        items: routes
            .map((e) => BottomNavigationBarItem(
                  icon: e.activeIcon,
                  label: e.label,
                ))
            .toList(),
        currentIndex: selectedIndex,
        selectedItemColor: Colors.amber[800],
        onTap: onDestinationSelected,
      ),
    );
  }
}

class _CustomDesktopNavigator extends StatelessWidget {
  final bool extended;
  final int selectedIndex;
  final List<CustomNavigationRoute> routes;
  final void Function() onExtend;
  final void Function(int) onDestinationSelected;

  const _CustomDesktopNavigator({
    required this.selectedIndex,
    required this.extended,
    required this.routes,
    required this.onExtend,
    required this.onDestinationSelected,
  });

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Row(
        children: <Widget>[
          NavigationRail(
            selectedIndex: selectedIndex,
            minWidth: 60,
            minExtendedWidth: 200,
            extended: extended,
            leading: const Center(
              child: SizedBox(
                width: 60,
                child: Image(
                  image: AssetImage('assets/images/logo.png'),
                ),
              ),
            ),
            trailing: IconButton(
                icon: Icon(extended ? Icons.arrow_left : Icons.arrow_right),
                onPressed: onExtend),
            destinations: routes
                .map((e) => NavigationRailDestination(
                      icon: e.inactiveIcon,
                      selectedIcon: e.activeIcon,
                      label: Text(e.label),
                    ))
                .toList(),
            onDestinationSelected: onDestinationSelected,
          ),
          Expanded(child: routes[selectedIndex].route)
        ],
      ),
    );
  }
}
