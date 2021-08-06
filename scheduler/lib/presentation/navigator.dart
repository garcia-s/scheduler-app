import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:scheduler/data/models/user.dart';
import 'package:scheduler/data/state/providers/auth.dart';

class AppNavigator extends StatelessWidget {
  const AppNavigator({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider<AuthProvider>(
      create: (_) => AuthProvider(),
      child: Consumer<AuthProvider>(
        builder: (ctx, auth, _) => auth.user is User
            ? const _MainNavigator()
            : const _AccessNavigator(),
      ),
    );
  }
}

class _MainNavigator extends StatelessWidget {
  const _MainNavigator({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container();
  }
}

class _AccessNavigator extends StatelessWidget {
  const _AccessNavigator({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container();
  }
}
