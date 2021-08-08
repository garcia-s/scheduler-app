import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:scheduler/data/models/user.dart';
import 'package:scheduler/data/state/providers/auth.dart';

class LoginRoute extends StatefulWidget {
  static const String address = '/login';
  const LoginRoute({Key? key}) : super(key: key);

  @override
  _LoginRouteState createState() => _LoginRouteState();
}

class _LoginRouteState extends State<LoginRoute> {
  @override
  final GlobalKey<FormState> _key = GlobalKey<FormState>();

  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: SizedBox(
          width: 400,
          child: Form(
            key: _key,
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                TextFormField(
                  validator: (str) => str == null || str.length < 6
                      ? 'Por favor proporcione un nombre de usuario valido'
                      : null,
                ),
                TextFormField(
                  obscureText: true,
                  validator: (str) => str == null || str.length < 6
                      ? 'Por favor proporcione una contraseña valida'
                      : null,
                ),
                ElevatedButton(
                  onPressed: () {
                    if (!_key.currentState!.validate()) return;
                    Provider.of<AuthProvider>(context, listen: false).setUser(User(
                      id: '1',
                      username: 'username',
                      access: UserAccess.su,
                      name: 'Juanito'
                    ));
                  },
                  child: const Text('Ingresar'),
                )
              ],
            ),
          ),
        ),
      ),
    );
  }
}
