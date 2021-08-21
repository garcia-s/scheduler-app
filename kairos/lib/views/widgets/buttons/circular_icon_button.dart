import 'package:flutter/material.dart';

class CircularIconButton extends StatelessWidget {
  final IconData icon;
  final void Function() onPressed;
  final Color iconColor;
  final Color color;
  final double size;

  const CircularIconButton(
      {Key? key,
      required this.icon,
      required this.onPressed,
      required this.iconColor,
      required this.color,
      required this.size})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: EdgeInsets.all(size * 0.1),
      height: size,
      width: size,
      child: RawMaterialButton(
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.all(
            Radius.circular(size / 2),
          ),
        ),
        fillColor: color,
        onPressed: onPressed,
        child: Icon(
          icon,
          size: size * 0.7,
          color: iconColor,
        ),
      ),
    );
  }
}
