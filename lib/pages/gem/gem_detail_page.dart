
import 'package:flutter/material.dart';
import 'package:gemstoneapp/models/gem_item.dart';
import 'package:google_fonts/google_fonts.dart';

class GemDetailPage extends StatefulWidget {
  static const routeName = '/gemdetail';
  const GemDetailPage({Key? key}) : super(key: key);

  @override
  _GemDetailPageState createState() => _GemDetailPageState();
}

class _GemDetailPageState extends State<GemDetailPage> {
  @override
  Widget build(BuildContext context) {
    var data = ModalRoute.of(context)!
        .settings.arguments as GemItem;
    return Scaffold(
      appBar: AppBar(
        title: Text(data.name,style: GoogleFonts.itim(fontSize: 30.0,fontWeight: FontWeight.bold,color: Colors.white),),
      ),
      body: Container(
        decoration: const BoxDecoration(
          image: DecorationImage(image: const AssetImage("assets/images/bg6.jpg"),
            fit: BoxFit.fill,
          ),
        ),
        child: Center(
          child: Column(


            children: [

              Image.asset('assets/images/${data.image}',width: 280.0,height: 280.0,),

              Text('   ชื่ออัญมณี : ${data.name}',style: GoogleFonts.itim(fontSize: 30.0,fontWeight: FontWeight.bold,color: Colors.blue.shade100,),),
              SizedBox(height: 5.0,),
              Text('   ชื่ออัญมณีภาษาอังกฤษ : ${data.nameeng}',style: GoogleFonts.itim(fontSize: 30.0,fontWeight: FontWeight.bold,color: Colors.pink.shade100),),
              SizedBox(height: 5.0,),
              Text('   คำอธิบาย : ${data.description}',style: GoogleFonts.itim(fontSize: 30.0,fontWeight: FontWeight.bold,color: Colors.purple.shade100),),
            ],
          ),
        ),
      ),

    );
  }
}
