import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';
import 'package:validators/validators.dart';
import 'package:vortex/state/mediators/config_mediator.dart';

class ServerSettingScreen extends StatelessWidget {
  const ServerSettingScreen({Key? key}) : super(key: key);
  static const String route = '/server-settings';
  @override
  Widget build(BuildContext context) => const Scaffold(body: ServerSettings());
}

class ServerSettings extends StatelessWidget {
  const ServerSettings({Key? key}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    final Size _size = MediaQuery.of(context).size;
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Container(
            height: _size.height * 0.20,
            width: _size.height * 0.20,
            margin: EdgeInsets.all(_size.height * 0.05),
            child: SvgPicture.asset(
              'assets/images/logo.svg',
              fit: BoxFit.contain,
            ),
          ),
          SizedBox(
            width: _size.width < 800 ? _size.width * 0.8 : _size.width * 0.3,
            child: const _ServerSettingsForm(),
          ),
        ],
      ),
    );
  }
}

class _ServerSettingsForm extends StatefulWidget {
  const _ServerSettingsForm({Key? key}) : super(key: key);

  @override
  __ServerSettingsFormState createState() => __ServerSettingsFormState();
}

class __ServerSettingsFormState extends State<_ServerSettingsForm> {
  final GlobalKey<FormState> _fkey = GlobalKey<FormState>();
  String _serv = '';

  void _submit() {
    if (!_fkey.currentState!.validate()) return;
    var _m = ConfigMediator(context);
    _m.updateServer(_serv);
  }

  @override
  Widget build(BuildContext context) {
    return Form(
      key: _fkey,
      child: Column(
        children: [
          Container(
            margin: const EdgeInsets.symmetric(vertical: 20),
            child: TextFormField(
              validator: (str) {
                setState(() => _serv = str!);
                return (!isURL(_serv) && !isIP(_serv))
                    ? 'El nombre del servidor es invalido'
                    : null;
              },
              onFieldSubmitted: (_) => _submit(),
              decoration: const InputDecoration(
                prefixIcon: Icon(Icons.security),
                hintText: 'http://<ip or address>:port',
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.all(
                    Radius.circular(10),
                  ),
                ),
              ),
            ),
          ),
          ElevatedButton(
            child: const Text('Conectar'),
            onPressed: () => _submit(),
          )
        ],
      ),
    );
  }
}
