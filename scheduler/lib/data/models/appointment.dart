import 'package:scheduler/data/models/client.dart';
import 'package:scheduler/data/models/service.dart';
import 'package:scheduler/data/models/user.dart';

enum AppointmentStatus {
  scheduled,
  confirmed,
  rescheduled,
  completed,
  canceled,
}

class Appointment {
  DateTime scheduledTime;
  //might change to enum
  AppointmentStatus status;
  Service service;
  Client client;
  //appointments are designated to a user, so for admin/su appointment overlapping is possible
  //This overlapping should be considered when designing the admin/su appointment viewer

  User user;

  Appointment({
    required this.scheduledTime,
    required this.status,
    required this.service,
    required this.client,
    required this.user
  });
}
