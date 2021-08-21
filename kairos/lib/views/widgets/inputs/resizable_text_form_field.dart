import 'package:flutter/material.dart';
import 'package:flutter/painting.dart';

class ResizableTextFormField extends StatelessWidget {
  final void Function(String)? onSubmit; 
  final String? Function(String?)? validator;
  final String? placeholder;
  final Widget? prefixIcon;
  final bool? obscureText;

  const ResizableTextFormField({
    Key? key,
    this.onSubmit,
    this.validator,
    this.placeholder,
    this.prefixIcon,
    this.obscureText,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return TextFormField(
      validator: validator,
      onFieldSubmitted:onSubmit,
      obscureText: obscureText == null ? false : obscureText!,
      decoration: InputDecoration(
        isDense: true,
        prefixIcon: prefixIcon,
        hintText: placeholder,
        contentPadding: const EdgeInsets.symmetric(vertical: 10, horizontal: 10),
        border: const OutlineInputBorder(
          borderRadius: BorderRadius.all(
            Radius.circular(10),
          ),
        ),
      ),
    );
  }
}
