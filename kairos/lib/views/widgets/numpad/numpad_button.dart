import 'package:flutter/material.dart';

class NumpadButton extends StatelessWidget {
  const NumpadButton(this.text, {Key? key, required this.onPressed})
      : super(key: key);

  final String text;
  final dynamic Function(String txt) onPressed;

  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      style: ButtonStyle(
        // fixedSize: MaterialStateProperty.all<Size>(Size(52, 52)),
        backgroundColor: MaterialStateProperty.all<Color>(
          const Color.fromRGBO(50, 50, 85, 1),
        ),
        shape: MaterialStateProperty.all<OutlinedBorder>(
          const RoundedRectangleBorder(
            side: BorderSide(color: Colors.blue, width: 2),
            borderRadius: BorderRadius.all(Radius.circular(10)),
          ),
        ),
      ),
      onPressed: () => onPressed(text),
      child: FractionallySizedBox(
        heightFactor: .5,
        widthFactor: .5,
        child: FittedBox(
          fit: BoxFit.contain,
          child: Text(text, style: const TextStyle(color: Colors.blue)),
        ),
      ),
    );
  }
}
