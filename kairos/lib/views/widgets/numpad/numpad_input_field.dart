import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:vortex/views/widgets/numpad/numpad.dart';
import 'package:vortex/views/widgets/numpad/numpad_error.dart';

class NumpadInputField extends StatefulWidget {
  const NumpadInputField({Key? key, required this.onEnter}) : super(key: key);
  final String? Function(String text) onEnter;

  @override
  _NumpadInputFieldState createState() => _NumpadInputFieldState();
}

class _NumpadInputFieldState extends State<NumpadInputField> {
  String _id = '';
  String? _err;
  void _onCancel(String _) => setState(() {
        _id = '';
        _err = null;
      });

  void _onChange(String string) =>
      _id.length < 6 ? setState(() => _id = _id + string) : null;

  void _onEnter(String text) {
    String? result = widget.onEnter(text);
    if (result != null) setState(() => _err = result);
  }

  bool _onKey(RawKeyEvent event) {
    if (event is RawKeyDownEvent) {
      if (int.tryParse(event.logicalKey.keyLabel) != null) {
        _onChange(event.logicalKey.keyLabel);
      }
      if (event.logicalKey.keyId == 4295426090) _onCancel('');
      if (event.logicalKey.keyId == 4295426088) _onEnter(_id);
    }
    return true;
  }

  @override
  Widget build(BuildContext context) {
    return RawKeyboardListener(
      autofocus: true,
      focusNode: FocusNode(),
      onKey: _onKey,
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          TextFormField(
            obscureText: true,
            enabled: false,
            style: TextStyle(
              fontSize: 25,
              color: _err != null ? Colors.red : Colors.blue,
            ),
            controller: TextEditingController(
              text: _id,
            ),
            validator: (text) {
              return 'Invalid value';
            },
            decoration: InputDecoration(
              prefixIcon: Icon(
                Icons.lock,
                color: _err != null ? Colors.red : Colors.blue,
              ),
              disabledBorder: OutlineInputBorder(
                borderSide: BorderSide(
                  width: 2,
                  color: _err != null ? Colors.red : Colors.blue,
                ),
              ),
            ),
          ),
          const NumpadErrorText(null),
          Numpad(
            onCancel: _onCancel,
            onChange: _onChange,
            onEnter: _onEnter,
            autofocus: true,
          )
        ],
      ),
    );
  }
}
