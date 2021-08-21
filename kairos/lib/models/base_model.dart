abstract class BaseModel {
  abstract final String id;
  
  BaseModel();

  BaseModel.fromJson(Map<String, dynamic> map);

  static String get bash => 'hello';
}
