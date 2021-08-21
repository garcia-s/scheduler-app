import 'package:flutter/material.dart';
import 'package:vortex/views/widgets/numpad/numpad_button.dart';

class Numpad extends StatelessWidget {
  const Numpad({
    Key? key,
    required this.onCancel,
    required this.onChange,
    required this.onEnter,
    required this.autofocus,
  }) : super(key: key);

  final dynamic Function(String txt) onChange;
  final dynamic Function(String txt) onCancel;
  final dynamic Function(String txt) onEnter;
  final bool autofocus;

  @override
  Widget build(BuildContext context) {
    // Size size = MediaQuery.of(context).size;
    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        GridView.count(
          shrinkWrap: true,
          mainAxisSpacing: 3,
          crossAxisSpacing: 3,
          crossAxisCount: 3,
          children: _generateNumpad(),
        )
      ],
    );
  }

  List<Widget> _generateNumpad() {
    String values = '7-8-9-4-5-6-1-2-3-C-0-E';
    List<Widget> buttons = values
        .split('-')
        .map((element) => NumpadButton(
              element,
              onPressed: element == 'C'
                  ? onCancel
                  : element == 'E'
                      ? onEnter
                      : onChange,
            ))
        .toList();
    return buttons;
  }
}
