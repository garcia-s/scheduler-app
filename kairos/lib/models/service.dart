import 'package:vortex/models/interface.dart';

class Service extends ModelInterface {
  @override
  final String id;
  final num maxParallelPerUser;
  final List<String> designatedAreas;
  final bool hasTimeframe;
  final Duration? timeframe;
  final bool isMultitask;

  Service({
    required this.id,
    required this.maxParallelPerUser,
    required this.designatedAreas,
    required this.hasTimeframe,
    required this.isMultitask,
    this.timeframe,
  }) {
    if (hasTimeframe && timeframe == null) {
      throw Exception('Time specific services need an estimated duration');
    } else if (!hasTimeframe && timeframe != null) {
      throw Exception(
          'Undefined time services cannot have "hasTimeframe" set to true');
    }
  }

  // Service.fromJson();
}
