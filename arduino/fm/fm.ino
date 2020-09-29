

/*         Arduino Digital FM Radio with build in speakers
  libraries & schematic: www.ardumotive.com
       dev: Michalis Vasilakis // Date 24/2/2015 // Version 1.0        
              Many thanks to nicuflorica.blogspot.ro                       */

//Libraries:
#include <TEA5767.h>
#include <Wire.h>

TEA5767 Radio; //Pinout SLC and SDA - Arduino pins A5 and A4


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
  frequency_start = 87.5;
  frequency = frequency_start;
  frequency_end = 108;  
  Radio.set_frequency(frequency_start); //On power on go to station ##

}

void loop () {

 String signal_level,current_freq;

  if (Radio.read_status(buf) == 1) {
    current_freq =  floor (Radio.frequency_available (buf) / 100000 ) / 10 - .4;
    stereo = Radio.stereo(buf);
    signal_level = Radio.signal_level(buf);

    Serial.println(current_freq + ";" + signal_level);

  }
   
   frequency += 0.1; 
   Radio.set_frequency(frequency);  


   if( current_freq.toInt() ==  frequency_end){

      frequency = frequency_start;
      Radio.set_frequency(frequency);

    }


}
