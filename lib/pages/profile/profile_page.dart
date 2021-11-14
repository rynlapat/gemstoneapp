import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class ProfilePage extends StatefulWidget {
  const ProfilePage({Key? key}) : super(key: key);

  @override
  _ProfilePageState createState() => _ProfilePageState();
}

class _ProfilePageState extends State<ProfilePage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        decoration: const BoxDecoration(
          image: DecorationImage(image: const AssetImage("assets/images/bg2.jpg"),
          fit: BoxFit.fill,
          ),
        ),
        child: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,

            children: [

              ClipRRect(
                  borderRadius: BorderRadius.circular(100.0),
                  child: Container(
                    width: 150.0,
                    height: 150.0,
                    child: Image.asset('assets/images/profile4.jpg'),
                  )
              ),
              SizedBox(
                height: 20.0,
              ),
              Text(
                'Rynlapat Khongsirikul',
                style: GoogleFonts.mali(fontSize: 30.0,color: Colors.white,fontWeight: FontWeight.bold),
              ),
              SizedBox(
                height: 10.0,
              ),
              Text(
                'rynlapat@gmail.com',
                style: GoogleFonts.abel(fontSize: 25.0,color: Colors.black,fontWeight: FontWeight.bold),
              ),
            ],


          ),
        ),
      ),
    );
  }
}