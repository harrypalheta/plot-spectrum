

/*         Arduino Digital FM Radio with build in speakers
  libraries & schematic: www.ardumotive.com
       dev: Michalis Vasilakis // Date 24/2/2015 // Version 1.0        
              Many thanks to nicuflorica.blogspot.ro                       */

//Libraries:
#include <SPI.h>
//#include <Adafruit_GFX.h>
//#include <Adafruit_PCD8544.h>
#include <TEA5767.h>
#include <Wire.h>

//#include <Button.h>
//#include <LiquidCrystal.h>

//#define ARDUINOJSON_USE_DOUBLE 1
//#include <ArduinoJson.h>


//Constants:
//Adafruit_PCD8544 display = Adafruit_PCD8544(7, 6, 5, 4, 3 ); //Pinout:(SCLK, DIN, DC, CS, RST)
//LiquidCrystal display (2,3,4,10,11,12,13);
TEA5767 Radio; //Pinout SLC and SDA - Arduino pins A5 and A4
//Button btn_forward(6, HIGH); //Search station up button
//Button btn_backward(7, HIGH);//Search station down button

//StaticJsonBuffer<512> jsonBuffer;



// Create Object
//JsonObject& root = jsonBuffer.createObject();

// Create array potencia in json
 // JsonArray& potencia = root.createNestedArray("potencia");
  // Create array frequencia in json
 // JsonArray& frequencia = root.createNestedArray("frequencia");

//Variables:
double old_frequency;
double frequency;
int search_mode = 0;
int search_direction;
unsigned long last_pressed;
unsigned char buf[5];
int stereo;
//int signal_level;
//double current_freq;
unsigned long current_millis = millis();
double frequency_start;
double frequency_end;

void setup () {
 //Init
  Serial.begin(9600);
  while (!Serial) {
    // wait serial port initialization
  }
  Wire.begin();
  Radio.init();
  frequency_start = 88;
  frequency = frequency_start;
  frequency_end = 108;  
  Radio.set_frequency(frequency_start); //On power on go to station ##

 // display.begin(16,2);
//  display.setContrast(100);
//  display.clearDisplay();
}


void clear();



void loop () {
 // display.clear();
 String signal_level,current_freq;


//const size_t bufferSize = JSON_ARRAY_SIZE(3) + JSON_OBJECT_SIZE(3) + 60;
//DynamicJsonBuffer jsonBuffer(bufferSize);
//StaticJsonBuffer<200> jsonBuffer;
 // JsonObject& root = jsonBuffer.createObject();

  //JsonArray& data = root.createNestedArray("data");
  //data.add(48.756080);

  if (Radio.read_status(buf) == 1) {
    current_freq =  floor (Radio.frequency_available (buf) / 100000 + .5) / 10;
    stereo = Radio.stereo(buf);
    signal_level = Radio.signal_level(buf);
    //data = current_freq + ";" + signal_level;
    //sprintf(data,"%d",current_freq);
//     root["status"] = "continue";
//  root["potencia"] = signal_level;
     Serial.println(current_freq + ";" + signal_level);
   //  Serial.println(signal_level);
    // ADD POTENCIA TO SERIAL IN FORMAT JSON
   // potencia.add(signal_level);
  //  Serial.println(current_freq);
    // ADD FREQUENCIA TO SERIAL IN FORMAT JSON
//    root["frequencia"] = current_freq;
    
    //frequencia.add(current_freq);
    // Linha de cima
//   display.setCursor(0,0);
//   display.print(current_freq);
//   display.print(" MHz");
//  // Linha de baixo 
//   display.setCursor(0,1);

   //Strereo or mono ?
//   if (stereo) display.print("STEREO "); 
//   else display.print("MONO ");
//   //display level of FM signal
//   display.print(signal_level);
//   display.print("/15 ");
   //display.display();
  delay (500);

  }
  //When button pressed, search for new station
//  if (search_mode == 1) {
//      if (Radio.process_search (buf, search_direction) == 1) {
//          search_mode = 0;
//      }
//  }
  //If forward button is pressed, go up to next station
//  if (btn_forward.isPressed()) {
//    last_pressed = current_millis;
//    search_mode = 1;
//    search_direction = TEA5767_SEARCH_DIR_UP;
//    Radio.search_up(buf);
//    delay(1000);
//  }
  //If backward button is pressed, go down to next station
//  if (btn_backward.isPressed()) {
//    last_pressed = current_millis;
//    search_mode = 1;
//    search_direction = TEA5767_SEARCH_DIR_DOWN;
//    Radio.search_down(buf);
//    delay(1000);
//  } 
   //delay(100);
    
   
   frequency += 1; 
   Radio.set_frequency(frequency);  


   if( current_freq.toInt() ==  frequency_end){
    //  root["status"] = "back";
   
      frequency = frequency_start;
      Radio.set_frequency(frequency);
       Serial.println("BACK");

    }

   
   //  root.printTo(Serial);
     //root.prettyPrintTo(Serial);  
    

}

