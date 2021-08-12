import 'package:flutter/material.dart';

class StyledAccessButton extends StatelessWidget {
  final void Function() onPressed;
  const StyledAccessButton({
    Key? key,
    required this.onPressed,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      onPressed: onPressed,
      child: const Text('Text'),
    );
  }
}
