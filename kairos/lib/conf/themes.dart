import 'package:flutter/material.dart';

class CustomTheme {
  final lightMode = ThemeData(
    scaffoldBackgroundColor: Colors.white,
    colorScheme: const ColorScheme(
      brightness: Brightness.light,
      background: Color(0xFFE3E3E3),
      onBackground: Color(0XFF323232),
      surface: Colors.white70,
      error: Colors.redAccent,
      primary: Color(0xFF323250),
      onPrimary: Colors.white,
      //DUNNO
      secondary: Colors.blue,
      onError: Colors.red,
      onSecondary: Colors.red,
      onSurface: Colors.red,
      primaryVariant: Colors.white,
      secondaryVariant: Colors.red,
    ),
  );

  final darkMode = ThemeData(
      scaffoldBackgroundColor: const Color(0xFF232323),
      colorScheme: const ColorScheme(
        brightness: Brightness.dark,
        background: Color(0XFF303030),
        onBackground: Color(0xFFE3E3E3),
        surface: Color(0xFF404040),
        error: Colors.redAccent,
        primary: Colors.cyan,
        onPrimary: Colors.white,
        //DUNNO
        secondary: Colors.blue,
        onError: Colors.red,
        onSecondary: Colors.red,
        onSurface: Colors.red,
        primaryVariant: Colors.white,
        secondaryVariant: Colors.red,
      ));
}
