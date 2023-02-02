import 'package:flutter/material.dart';
import 'package:marketmonitor/screens/home.dart';
import 'package:tailwind_colors/tailwind_colors.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Market Monitor',
      theme: ThemeData(
          fontFamily: "Sofia Sans",
          primarySwatch: TW3Colors.emerald.asMaterialColor,
          appBarTheme: const AppBarTheme(color: Colors.white)),
      home: const HomeScreen(),
    );
  }
}
