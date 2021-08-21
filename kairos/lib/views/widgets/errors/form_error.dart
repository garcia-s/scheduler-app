import 'package:flutter/material.dart';

class FormError extends StatelessWidget {
  final String? error;
  const FormError({this.error, Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    if (error == null) return const Offstage();
    return Container(
      padding: const EdgeInsets.symmetric(vertical: 10, horizontal: 5),
      child: Text(
        error!,
        textAlign: TextAlign.center,
        style: TextStyle(
          color: Theme.of(context).colorScheme.error,
        ),
      ),
    );
  }
}
