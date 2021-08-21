import 'package:localstorage/localstorage.dart';
import 'package:validators/validators.dart';
import 'package:vortex/models/config.dart';

class ConfigRepository {
//hiden file in linux
//TODO: LOOK how to hide in windows/mac/ios/android
  final LocalStorage _file = LocalStorage('.config.json');

  Future<bool> get ready => _file.ready;

  // RETURNS TRUE IF THE SERVER NAME IS CORRECTLY SET IN THE CONFIG FILE
  Future<bool> setServer(String server) async {
    if (!isURL(server) && !isIP(server)) return false;
    await _file.setItem('server', server);
    return true;
  }

  // RETURNS TRUE IF THE DARKMODE IS CORRECTLY SET IN THE CONFIG FILE
  Future<bool> setMode(bool mode) async {
    try {
      await _file.setItem('darkMode', mode);
      return true;
    } catch (e) {
      return false;
    }
  }

  Future<Config> getConfigData() async {
    try {
      await _file.ready;
      String? server = await _file.getItem('server');
      bool darkMode = await _file.getItem('darkMode');

      return Config(
        server: server,
        darkMode: darkMode,
      );
    } catch (e) {
      //Restore corrupted configuration file to default values
      //LOG TO FILE
      await _file.setItem('darkMode', false);
      await _file.setItem('server', null);
      return Config(server: null, darkMode: false);
    }
  }
}
