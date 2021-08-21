class FakeProducts {
  static List<Map<String, dynamic>> list = [
    {
      'id': 'p0',
      'name': 'Fake Product 1',
      'printer': 'first',
      'state': true,
      'types': [
        {
          'id': 'pt0',
          'product': 'p0',
          'name': 'Grande',
          'cost': 3.2,
          'price': 8.5,
          'stock': 20,
          'validates': true,
          'taxpercentage': 10,
        },
        {
          'id': 'pt1',
          'product': 'p0',
          'name': 'Mediano',
          'cost': 5.2,
          'price': 7.5,
          'stock': 20,
          'validates': true,
          'taxpercentage': 10,
        },
        {
          'id': 'pt2',
          'product': 'p0',
          'name': 'Pequeño',
          'cost': 2.2,
          'price': 3.5,
          'stock': 20,
          'validates': true,
          'taxpercentage': 10,
        },
      ]
    },
    {
      'id': 'p1',
      'name': 'Fake Product 2',
      'printer': 'first',
      'state': true,
      'types': [
        {
          'id': 'pt3',
          'product': 'p0',
          'name': 'Grande',
          'cost': 3.2,
          'price': 8.5,
          'stock': 20,
          'validates': true,
          'taxpercentage': 10,
        },
        {
          'id': 'pt4',
          'product': 'p0',
          'name': 'Mediano',
          'cost': 5.2,
          'price': 7.5,
          'stock': 20,
          'validates': true,
          'taxpercentage': 10,
        },
        {
          'id': 'pt5',
          'product': 'p0',
          'name': 'Pequeño',
          'cost': 2.2,
          'price': 3.5,
          'stock': 20,
          'validates': true,
          'taxpercentage': 10,
        },
      ]
    }
  ];
}
