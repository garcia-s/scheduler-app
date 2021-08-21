import 'package:flutter/material.dart';

class FullScreenRoute extends StatelessWidget {
  final Widget child;
  const FullScreenRoute({Key? key, required this.child}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Container(
            height: 50,
            color: const Color.fromRGBO(80, 50, 50, 1),
          ),
          Expanded(
            child: child,
          )
        ],
      ),
    );
  }
}
