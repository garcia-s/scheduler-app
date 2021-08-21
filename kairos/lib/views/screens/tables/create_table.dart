import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:vortex/views/widgets/full_screen_route.dart';
import 'package:vortex/views/widgets/loading.dart';

class CreateTableScreen extends StatefulWidget {
  const CreateTableScreen({Key? key}) : super(key: key);
  static const String route = '/table-create';

  @override
  State<CreateTableScreen> createState() => _CreateTableScreenState();
}

class _CreateTableScreenState extends State<CreateTableScreen> {
  
  bool _loading = false;
  bool _active = false;
  String? _name;
  int? _capacity;

  final GlobalKey<FormState> _key = GlobalKey<FormState>();
  @override
  Widget build(BuildContext context) {
    if (_loading) return const ModalLoadingScreen();
    return FullScreenRoute(
      child: Form(
        key: _key,
        child: Column(
          children: [
            TextFormField(
              maxLength: 50,
              validator: (str) {
                if (str == null || str.length < 4 || str.length > 50) {
                  return 'El nombre de la mesa de be tener entre 5 y 50 caracteres';
                }
                setState(() => _name = str);
              },
            ),
            TextFormField(
              maxLength: 2,
              keyboardType: TextInputType.number,
              inputFormatters: [
                FilteringTextInputFormatter.allow(RegExp(r'[1-9]'))
              ],
              validator: (str) {
                if (str == null || int.tryParse(str) == null) {
                  return 'Input invalido';
                }
                setState(() => _capacity = int.parse(str));
              },
            ),
            Checkbox(
              value: _active,
              onChanged: (e) => setState(() => _active = e!),
            ),
            RawMaterialButton(
              child: const Text('Crear'),
              onPressed: _submit,
            ),
          ],
        ),
      ),
    );
  }

  void _submit() async {
    // if (!_key.currentState!.validate()) return;
    // setState(() => _loading = true);

    // if (res) return Navigator.of(context).pop();
    // setState(() => _loading = false);
  }
}
