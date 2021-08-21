abstract class ModelInterface {
  abstract final String id;
  ModelInterface();
  ModelInterface.fromJson(Map<String, dynamic> map);
}
