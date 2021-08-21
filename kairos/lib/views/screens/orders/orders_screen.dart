import 'package:flutter/material.dart';
class OrderScreen extends StatelessWidget {
  static const String routeName = 'order-table-screen';
  const OrderScreen(this.selectedId, {Key? key}) : super(key: key);

  final String selectedId;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(),
      backgroundColor: Colors.grey[300],
    );
  }
}
