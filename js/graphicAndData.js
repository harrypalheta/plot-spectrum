var myData;
var frequencia = [];
var potencia = [];
var count = 0;
var inicio;
var Chart = require("chart.js");

var ctx = document.getElementById("myChart").getContext("2d");
config = {
  type: 'line',
  data: {

    labels: frequencia,
    datasets: [{

      label: '# Spectrum',
      data: potencia,
      backgroundColor: [
        'rgba(100, 221, 23, 0.2)'
      ],
      borderColor: [
        'rgba(0, 200, 83,1.0)'

      ],
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      yAxes: [{
        gridLines: {
          display: true,
          color: "#FFFFFF"
        },
        ticks: {
          fontColor: "white",
          beginAtZero: true
        }
      }],
      xAxes: [{
        gridLines: {
          display: true,
          color: '#FFFFFF'
        },
        ticks: {
          fontColor: "white"
        }
      }]
    },
    legend: {
      labels: {
        fontColor: "white"
      }
    }
  }
};
var myChart = new Chart(ctx, config);
var SerialPort = require("serialport");
const Readline = require('@serialport/parser-readline');
var port = new SerialPort("/dev/ttyACM0", {
  baudRate: 9600,
  // parser: SerialPort.parsers.readline()
});

const parser = new Readline();
port.pipe(parser);
parser.on('open', onOpen);
parser.on('data', onData);

function onOpen() {
  console.log("Open connection");
}

function onData(data) {
  // Separa a a potencia e frequecia
  myData = data.trim().split(";");
  // Controla o inicio da estação
  // O valor 88.00, estático será setado pelo usuário
  if (myData[0] == "88.00") {
    inicio = true;
  }
  // verifica se está con os dois valores e foi iniciado pela frequencia de inicio
  if (data.replace("\n", "").split(";").length == 2 && inicio) {
    frequencia[count] = myData[0];
    potencia[count] = myData[1];
    count++;
  }
  // Zera a contagem
  if (myData[0].trim() == "BACK") {
    count = 0;
    inicio = false;
  }

  // Recebe a potência setada
  myChart.data.datasets[0].data = potencia;

  // Recebe a frequência setada
  myChart.data.labels = frequencia;

  // Atualiza os dados recebidos
  myChart.update();
}

// Carrega após os templates
(function(){
setTimeout(function () {
    var FCENTRAL = 98;
    var fcentral = document.getElementById("fcentral");
    fcentral.value = FCENTRAL;
   
    var BANDWIDTH = 20;
    var bandwidth = document.getElementById("bandwidth");
    bandwidth.value = BANDWIDTH;
   
    var FINITIAL = 88;
    var finitial = document.getElementById("finitial");
    finitial.value = FINITIAL;
  
    var FFINAL = 108;
    var ffinal = document.getElementById("ffinal");
    ffinal.value = FFINAL;

    fcentral.addEventListener("keypress", event =>  {
      if (event.keyCode === 13){
        console.log(event.target.value)
      event.target.style.background = "red"
      }
    }, true);
}, 500);

})();
