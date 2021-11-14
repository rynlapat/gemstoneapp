
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:gemstoneapp/pages/gem/gem_detail_page.dart';
import 'package:gemstoneapp/models/gem_item.dart';
import 'package:google_fonts/google_fonts.dart';

class GemListPage extends StatefulWidget {
  const GemListPage({Key? key}) : super(key: key);

  @override
  _GemListPageState createState() => _GemListPageState();
}

class _GemListPageState extends State<GemListPage> {
  var items = [
    GemItem(
      id: 1,
      name: 'ไพลิน',
      nameeng: 'blue sapphire',
      image: 'blue-sapphire.png',
      description: 'ไพลิน เป็นอัญมณีที่มีสีน้ำเงินเข้ม',
    ),
    GemItem(
      id: 2,
      name: 'เพชร',
      nameeng: 'diamond',
      image: 'diamond.png',
      description: 'เพชร เป็นอัญมณีที่มีสีใส เงาวาว และมีความแข็งมากที่สุด',
    ),
    GemItem(
      id: 3,
      name: 'มรกต',
      nameeng: 'emerald',
      image: 'emerald.png',
      description: 'มรกต เป็นอัญมณีที่มีสีเขียว',
    ),
    GemItem(
      id: 4,
      name: 'ไข่มุก',
      nameeng: 'pearl',
      image: 'pearl.png',
      description: 'ไข่มุก เป็นอัญมณีสีขาวขุ่น ลักษณะทรงกลม ค้นพบได้ในสัตว์จำพวกหอย',
    ),
    GemItem(
      id: 5,
      name: 'ทับทิม',
      nameeng: 'ruby',
      image: 'ruby.png',
      description: 'ทับทิม เป็นอัญมณีสีแดงสด',
    ),
    GemItem(
      id: 6,
      name: 'บุษราคัม',
      nameeng: 'yellow sapphire',
      image: 'yellow-sapphire.png',
      description: 'บุษราคัม เป็นอัญมณีสีเหลืองสดใส',
    ),
  ];
  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: const BoxDecoration(
        image: DecorationImage(image: const AssetImage("assets/images/bg3.jpg"),
          fit: BoxFit.fill,
        ),
      ),
      child: ListView.builder(
        itemCount: items.length,
        itemBuilder: (context, index) {
          var item = items[index];
          return Card(
            color: Colors.yellow.shade100,
              margin: const EdgeInsets.all(8.0),
              child: InkWell(
                onTap: (){

                  Navigator.pushNamed(
                    context,
                    GemDetailPage.routeName,
                    arguments: GemItem(id: item.id, name: item.name,nameeng: item.nameeng, image: item.image, description: item.description),
                  );



                },
                child: Padding(

                  padding: const EdgeInsets.all(16.0),
                  child: Row(

                    children: [
                      Image.asset(
                        'assets/images/${item.image}',
                        width: 60.0,
                        height: 60.0,
                        fit: BoxFit.cover,
                      ),
                      SizedBox(
                        width: 8.0,
                      ),
                      Text(
                        item.name,
                        style: GoogleFonts.mali(fontSize: 20.0,fontWeight: FontWeight.bold),
                      ),


                    ],
                  ),
                ),
              ));
        },
      ),
    );
  }
}
