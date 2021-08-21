import 'package:flutter/material.dart';
import 'package:vortex/views/screens/orders/orders_layouts.dart';

class OrderScreen extends StatelessWidget {
  static const String routeName = 'order-table-screen';
  const OrderScreen(this.selectedId, {Key? key}) : super(key: key);

  final String selectedId;

  @override
  Widget build(BuildContext context) {
    Size size = MediaQuery.of(context).size;
    return Scaffold(
      body: size.width < 1080
          ? const MobileOrdersLayout()
          : DeskOrdersLayout(selectedId),
      backgroundColor: Colors.grey[300],
    );
  }
}
