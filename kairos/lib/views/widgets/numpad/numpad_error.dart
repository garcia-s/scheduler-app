import 'package:flutter/material.dart';

class NumpadErrorText extends StatelessWidget {
  const NumpadErrorText(this.text,{Key? key}): super(key: key);
  final String? text;

  @override
  Widget build(BuildContext context) {
    return const SizedBox(
      height: 25.00,
      width: 200,
    );
    // return SizedBox(
    //   height: 25,
    //   child: Text(
    //     text!,
    //     style: TextStyle(
    //       color: Colors.red,
    //       fontSize: 12,
    //     ),
    //   ),
    // );
  }
}
