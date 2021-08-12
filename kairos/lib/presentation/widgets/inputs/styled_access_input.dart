import 'package:flutter/material.dart';

class StyledAccessInput extends StatelessWidget {
  final String? Function(String?)? validator;
  final bool? obscureText;

  const StyledAccessInput({
    Key? key,
    this.validator,
    this.obscureText,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return TextFormField(
      decoration: const InputDecoration(
        prefixIcon: Icon(Icons.person_outline)
      ),
      obscureText: obscureText ?? false,
      validator: validator,
    );
  }
}
