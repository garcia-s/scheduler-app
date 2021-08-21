class OrderTableInfo {
  OrderTableInfo({
    required this.tableId,
    required this.tableName,
    required this.openTabs,
    required this.total,
    required this.state,
  });

  final String tableId;
  String tableName;
  int openTabs;
  double total;
  TableState state;
}

enum TableState {
  waiting,
  delivered,
}
