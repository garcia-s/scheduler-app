import 'package:flutter/material.dart';

final ThemeData light = ThemeData(
  primaryColorDark: Colors.black,
  scaffoldBackgroundColor: Colors.white,
  errorColor: Colors.blue,
  colorScheme: const ColorScheme(
      primary: Color.fromRGBO(50, 50, 80, 1),
      primaryVariant: Colors.purple,
      secondary: Colors.blue,
      secondaryVariant: Colors.blueAccent,
      surface: Colors.lightGreen,
      background: Colors.black,
      error: Colors.redAccent,
      onPrimary: Colors.pink,
      onSecondary: Colors.teal,
      onSurface: Colors.cyan,
      onBackground: Colors.indigo,
      onError: Colors.orange,
      brightness: Brightness.light),
);


final ThemeData dark = ThemeData(
  primaryColorDark: Colors.black,
  scaffoldBackgroundColor: Colors.green,
  errorColor: Colors.blue,
  colorScheme: const ColorScheme(
      primary: Colors.red,
      primaryVariant: Colors.purple,
      secondary: Colors.blue,
      secondaryVariant: Colors.blueAccent,
      surface: Colors.grey,
      background: Colors.black,
      error: Colors.redAccent,
      onPrimary: Colors.pink,
      onSecondary: Colors.teal,
      onSurface: Colors.cyan,
      onBackground: Colors.indigo,
      onError: Colors.orange,
      brightness: Brightness.light),
);

