import 'package:cell_calendar/cell_calendar.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:scheduler/data/state/providers/connection.dart';

void main() => runApp(const MyApp());

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider<ConnectionProvider>(
      create: (_) => ConnectionProvider(),
      child: Consumer<ConnectionProvider>(
        builder: (ctx, provider, _) => MaterialApp(
          home: Container(
            color: Colors.red,
          ),
        ),
      ),
    );
  }
}
