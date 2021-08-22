import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:vortex/conf/events.dart';
import 'package:vortex/conf/themes.dart';
import 'package:vortex/models/user.dart';
import 'package:vortex/state/mediators/config_mediator.dart';
import 'package:vortex/state/mediators/list_mediator_interface.dart';
import 'package:vortex/state/mediators/router_mediator.dart';
import 'package:vortex/state/providers/connection_provider.dart';
import 'package:vortex/state/providers/config_provider.dart';
import 'package:vortex/state/providers/auth_provider.dart';
import 'package:vortex/state/providers/list_provider_interface.dart';

void main() => runApp(const MyApp());

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) => MultiProvider(
        providers: [
          ChangeNotifierProvider(
            create: (_) {
              ConfigProvider instance = ConfigProvider();
              ConfigMediator.init(instance);
              return instance;
            },
          ),
          ChangeNotifierProxyProvider<ConfigProvider, ConnectionProvider>(
            update: (ctx, conf, conn) {
              if (conf.config != null && conf.config!.server != null) {
                conn!.connect(conf.config!.server!);
              }
              return conn!;
            },
            create: (_) => ConnectionProvider(),
          ),
          ChangeNotifierProvider<AuthProvider>(create: (_) => AuthProvider()),
          ChangeNotifierProxyProvider<AuthProvider,
                  ListProviderInterface<User>>(
              create: (ctx) => ListProviderInterface<User>(),
              update: (ctx, auth, prov) {
                if (auth.user != null && auth.user!.admin) {
                  return ListMediatorInterface<User>(
                      context: ctx,
                      eventSet: usersEvents,
                      factory: (map) => User.fromJson(map)).initialize();
                }
                return prov!;
              }),
        ],
        child: Consumer<ConfigProvider>(
          builder: (ctx, provider, _) => Directionality(
            textDirection: TextDirection.ltr,
            child: Stack(
              children: [
                _App(
                  themeMode: provider.config == null
                      ? ThemeMode.system
                      : provider.config!.darkMode
                          ? ThemeMode.dark
                          : ThemeMode.light,
                ),
                Positioned(
                  top: 20,
                  right: 20,
                  child: ElevatedButton(
                    child: const Text('mode'),
                    onPressed: () {
                      provider.updateMode(!provider.config!.darkMode);
                    },
                  ),
                )
              ],
            ),
          ),
        ),
      );
}

class _App extends StatelessWidget {
  final ThemeMode themeMode;
  const _App({Key? key, required this.themeMode}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      theme: CustomTheme().lightMode,
      darkTheme: CustomTheme().darkMode,
      //Defaults to system on bootup and then gets the configuration
      themeMode: themeMode,

      onGenerateRoute: RouterMediator(context).generateRoute,
    );
  }
}
