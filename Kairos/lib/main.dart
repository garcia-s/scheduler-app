
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:scheduler/data/state/providers/connection.dart';
import 'package:scheduler/presentation/navigator.dart';
import 'package:scheduler/presentation/widgets/errors/disconnected_screen.dart';
import 'package:scheduler/presentation/widgets/errors/reconnecting_screen.dart';

void main() => runApp(const MyApp());

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) => _App();
}

class _App extends StatelessWidget {

  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider<ConnectionProvider>(
      create: (_) => ConnectionProvider(),
      child: Consumer<ConnectionProvider>(
          builder: (ctx, conn, _) => conn.status.index == 0
              ? const AppNavigator()
              : conn.status.index == 1
                  ? const ReconnectingScreen()
                  : const DisconnectedScreen()),
    );
  }
}
