import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:vortex/conf/themes.dart';
import 'package:vortex/state/providers/config_provider.dart';

class ThemedMaterialApp extends StatelessWidget {
  final Widget? home;
  final String? initialRoute;
  final Map<String, Widget Function(BuildContext)>? routes;

  const ThemedMaterialApp({
    Key? key,
    this.home,
    this.routes,
    this.initialRoute,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Selector<ConfigProvider, bool>(
      selector: (ctx, p) => p.config == null ? false : p.config!.darkMode,
      builder: (ctx, isDark, _) {
        return MaterialApp(
          initialRoute: initialRoute,
          //themeMode: isDark ? ThemeMode.dark : ThemeMode.light,
          themeMode: ThemeMode.light,
          theme: CustomTheme().lightMode,
          darkTheme: CustomTheme().darkMode,
          routes: routes ?? {},
          home: home,
        );
      },
    );
  }
}
