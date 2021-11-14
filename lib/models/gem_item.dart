class GemItem {
  final int id;
  final String name;
  final String nameeng;
  final String image;
  final String description;

  GemItem({
    required this.id,
    required this.name,
    required this.nameeng,
    required this.image,
    required this.description,
  });



  @override
  String toString() {
    return '$id : $name ($nameeng)';
  }
}
