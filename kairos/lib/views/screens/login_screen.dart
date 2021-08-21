import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';
import 'package:vortex/state/mediators/auth_mediator.dart';
import 'package:vortex/views/widgets/buttons/styled_elevated_button.dart';
import 'package:vortex/views/widgets/errors/form_error.dart';
import 'package:vortex/views/widgets/inputs/resizable_text_form_field.dart';
import 'package:vortex/views/widgets/loading.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({Key? key}) : super(key: key);
  static const String route = '/login';

  @override
  _LoginScreenState createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final GlobalKey<FormState> _key = GlobalKey<FormState>();
  String _password = '';
  String _user = '';
  String? _error;
  bool _loading = false;

  void _login() async {
    if (!_key.currentState!.validate()) return;
    setState(() => _loading = true);
    if (!(await AuthMediator(context).loginWithUserAndPass(_user, _password))) {
      setState(() {
        _loading = false;
        _error =
            'Ha ocurrido un error al iniciar sesion, puede deberse a credenciales incorrectas';
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    if (_loading) return const ModalLoadingScreen();
    Size _size = MediaQuery.of(context).size;
    return Scaffold(
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Container(
              margin: EdgeInsets.symmetric(vertical: _size.height * 0.05),
              height: _size.height * 0.15,
              width: _size.height * 0.15,
              child: SvgPicture.asset(
                'assets/images/logo.svg',
                color: Theme.of(context).colorScheme.primary,
              ),
            ),
            Form(
              key: _key,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  FractionallySizedBox(
                    widthFactor: _size.width > 1024 ? 0.3 : 0.7,
                    child: Column(
                      children: [
                        Padding(
                          padding: const EdgeInsets.symmetric(vertical: 5.0),
                          child: ResizableTextFormField(
                              placeholder: 'Usuario',
                              prefixIcon: const Icon(Icons.person),
                              validator: (str) {
                                if (str == null || str.length < 8) {
                                  return 'El nombre de usuario es demasiado corto';
                                }
                                setState(() => _user = str);
                              }),
                        ),
                        Padding(
                          padding: const EdgeInsets.symmetric(vertical: 5.0),
                          child: ResizableTextFormField(
                              obscureText: true,
                              placeholder: 'Contraseña',
                              prefixIcon: const Icon(Icons.lock),
                              onSubmit: (_) => _login(),
                              validator: (str) {
                                if (str == null || str.length < 8) {
                                  return 'La contraseña es demasiado corta';
                                }
                                setState(() => _password = str);
                              }),
                        ),
                        //this is for design
                        StyledElevatedButton(
                          text:'INGRESAR',
                          onPressed: () => _login(),
                        ),
                        FormError(error: _error),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
