import 'package:flutter/material.dart';

class Palette {
  late Color primary;
  late Color secondary;
  late Color details;
  Palette(bool darkMode) {
    //change to a real color palette after selecting it
    primary = darkMode ? Colors.white : Colors.black;
    secondary = darkMode ? Colors.white : Colors.black;
    details = darkMode ? Colors.white : Colors.black;
    //Colors outside the palette might be applied but should be neutral and work well with both primary colors
  }
}
