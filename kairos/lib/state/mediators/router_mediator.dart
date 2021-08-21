import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:vortex/state/providers/auth_provider.dart';
import 'package:vortex/state/providers/config_provider.dart';
import 'package:vortex/state/providers/connection_provider.dart';
import 'package:vortex/views/screens/login_screen.dart';
import 'package:vortex/views/screens/main/main_screen.dart';
import 'package:vortex/views/screens/server_setting.dart';
import 'package:vortex/views/widgets/loading.dart';

late ConfigProvider _cgprovider;
late ConnectionProvider _connprovider;
late AuthProvider _authprovider;

class RouterMediator {
  RouterMediator(BuildContext context) {
    _cgprovider = Provider.of<ConfigProvider>(context);
    _connprovider = Provider.of<ConnectionProvider>(context);
    _authprovider = Provider.of<AuthProvider>(context);
  }

  Route<dynamic> generateRoute(RouteSettings settings) {
    return MaterialPageRoute(builder: _mainBuilder);
  }

  Widget _mainBuilder(BuildContext _) {
    if (_cgprovider.config == null) {
      return const ModalLoadingScreen();
    } else if (_cgprovider.config!.server == null) {
      return const ServerSettingScreen();
    } else if (_connprovider.status == SocketStatus.connecting) {
      return const ModalLoadingScreen();
    } else if (_connprovider.status == SocketStatus.error) {
      //TODO: CHANGE TO A RECONNECT AND
      return Container(color: Colors.black);
    } else if (_authprovider.user != null) {
      return MainScreen(_authprovider.user!);
    }
    return const LoginScreen();
  }
}
