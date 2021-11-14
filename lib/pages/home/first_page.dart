
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:gemstoneapp/pages/home/home_page.dart';
import 'package:google_fonts/google_fonts.dart';

class FirstPage extends StatefulWidget {
  const FirstPage({Key? key}) : super(key: key);

  @override
  _FirstPageState createState() => _FirstPageState();
}

class _FirstPageState extends State<FirstPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
    body: Container(
      decoration: const BoxDecoration(
        image: const DecorationImage(
          image: const AssetImage("assets/images/bg10.jpg"),
          fit: BoxFit.fill,
        ),
      ),
      child: SafeArea(
        child: Center(
          child: Column(

            children: [
              SizedBox(height: 250.0,),
              Text('GEM FOR LEARN BY ROSEMARY',style: GoogleFonts.itim(fontSize: 40.0,fontWeight: FontWeight.bold,color: Colors.grey.shade100),),
              SizedBox(height: 30.0,),
              ElevatedButton(onPressed: (){
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => HomePage()),
                );
              },child: Text('GET START',style: GoogleFonts.itim(fontSize: 50.0),),)

            ],
          ),
        ),
      ),
    ),
    );
  }
}
