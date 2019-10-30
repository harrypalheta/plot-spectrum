var myData;
var frequencies = [];
var powers = [];
var count = 0;
var inicio;
var Chart = require("chart.js");

var ctx = document.getElementById("myChart").getContext("2d");
config = {
  type: 'line',
  data: {

    labels: frequencies,
    datasets: [{

      label: '# Spectrum',
      data: powers,
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
var port;

SerialPort.list(function (err, results) {
  if (err) {
    throw err;
  }
  let ports = results.map(x => x.comName)
  setTimeout(() => {
    let selectBox = document.getElementById("port");
    for (var i = 0, l = ports.length; i < l; i++) {
      selectBox.options.add(new Option(ports[i], ports[i]));
    }
  }, 500)
  // console.log(ports);
});

function clean(){
  powers = [];
  frequencies = [];
}

function startPort() {
  
  let e = document.getElementById("port");
  let strPort = e.options[e.selectedIndex].value
  port = new SerialPort(strPort, {
    baudRate: 9600,
  });
  const parser = new Readline();
  port.pipe(parser);
  parser.on('open', onOpen);
  parser.on('data', onData);
}

function stopPort() {
  port.close();
}

function onOpen() {
  console.log("Open connection");
}

function onData(data) {
  // Separa a a powers e frequecia
  myData = data.trim().split(";");
  let currentFrequency = myData[0];
  let currentPower = myData[1];
  let finitialValue = finitial.value;
  let ffinalValue = ffinal.value;
  // Controla o inicio da estação
  // O valor 88.00, estático será setado pelo usuário
  
  if (+currentFrequency == +finitialValue) {
    inicio = true;
  }
  // verifica se está con os dois valores e foi iniciado pela frequencies de inicio
  if (currentFrequency && currentPower && inicio) {
    frequencies[count] = currentFrequency;
    powers[count] = currentPower;
    count++;
  }
  // Zera a contagem
  if (+currentFrequency == +ffinalValue) {
    count = 0;
    inicio = false;
  }

 updateChart();
}

function updateChart(){
 // Recebe a potência setada
 myChart.data.datasets[0].data = powers;

 // Recebe a frequência setada
 myChart.data.labels = frequencies;

 // Atualiza os dados recebidos
 myChart.update();

}

// Carrega após os templates
(function () {
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

    finitial.addEventListener("keypress", event => {
      if (event.keyCode === 13) {
        let bandwidthValue = new Number(bandwidth.value);
        let finitialValue = new Number(event.target.value);

        ffinal.value = finitialValue + bandwidthValue;
        fcentral.value = finitialValue + bandwidthValue / 2;
        clean()
      }
    }, true);

    ffinal.addEventListener("keypress", event => {
      if (event.keyCode === 13) {
        let bandwidthValue = new Number(bandwidth.value);
        let ffinalValue = new Number(event.target.value);

        finitial.value = ffinalValue - bandwidthValue;
        fcentral.value = ffinalValue - bandwidthValue / 2;
        clean()
      }
    }, true);

    fcentral.addEventListener("keypress", event => {
      if (event.keyCode === 13) {
        let bandwidthValue = new Number(bandwidth.value);
        let fcentralValue = new Number(event.target.value);
        let displayFCentral = document.getElementById("displayFCentral")
        displayFCentral.textContent = event.target.value + " MHz";
        finitial.value = fcentralValue - bandwidthValue / 2;
        ffinal.value = fcentralValue + bandwidthValue / 2;
        clean()
      }
    }, true);

    bandwidth.addEventListener("keypress", event => {
      if (event.keyCode === 13) {
        let bandwidthValue = new Number(event.target.value);
        let fcentralValue = new Number(fcentral.value);
        let displayBandwith = document.getElementById("displayBandwith")
        finitial.value = fcentralValue - bandwidthValue / 2;
        ffinal.value = fcentralValue + bandwidthValue / 2;
        displayBandwith.textContent = bandwidthValue + " MHz";
        clean()
      }
    }, true);

  }, 500);

})();
