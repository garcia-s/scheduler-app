import 'package:flutter/material.dart';
import 'package:flutter_spinkit/flutter_spinkit.dart';
import 'package:flutter_svg/svg.dart';

class ModalLoadingScreen extends StatelessWidget {
  const ModalLoadingScreen({Key? key}) : super(key: key);
  @override
  build(BuildContext context) {
    final ColorScheme _scheme = Theme.of(context).colorScheme;

    return Scaffold(
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            SvgPicture.asset(
              'assets/images/logo.svg',
              color: _scheme.primary,
              height: 100,
              width: 100,
              fit: BoxFit.contain,
            ),
            const SizedBox(height: 20),
            SpinKitWave(
              color: _scheme.primary,
              size: 20,
            ),
          ],
        ),
      ),
    );
  }
}
