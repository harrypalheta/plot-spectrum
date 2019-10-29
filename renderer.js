// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

addEventListener("click", function (e) {

  // permite ações somente se for botões
  if (e.target.localName === "button") {
    const oldElement = document.querySelectorAll('.configurations .active');
    const id = e.target.id;
    const panelOptions = ['freqspan', 'amplitude', 'bandwidth', 'markers']
    const onOffOption = ['btnOnOff']
    
    if (panelOptions.includes(id)) {
      let newElement = document.querySelectorAll('.configurations div#' + id);
      removeClass(oldElement[0], 'active');
      addClass(newElement[0], 'active');
    }

    if (onOffOption.includes(id)) {
      let btnOnOff = e.target;
      if (btnOnOff.innerText === "LIGAR") {
        removeClass(btnOnOff, 'btn-outline-success');
        addClass(btnOnOff, 'btn-outline-danger');
        btnOnOff.innerHTML = "DESLIGAR";
      } else {
        removeClass(btnOnOff, 'btn-outline-danger');
        addClass(btnOnOff, 'btn-outline-success');
        btnOnOff.innerHTML = "LIGAR";
      }
    }
  }

});

addEventListener("keypress", function (e) {
  let elementWithAttrNumber = e.target.attributes.number;

  // NUMBERS attributes
  if (typeof elementWithAttrNumber !== 'undefined') {
    var key = e.keyCode ? e.keyCode : e.charCode;
    var value = e.target.value;
    // Allow: . (46 in keypress, only one time)
    if (key === 46 && !value.match(/\./g)) {
      // let it happen, don't do anything
      return;
    }
    if ((e.keyCode < 48 || e.keyCode > 57)) {
      e.preventDefault();
    }
  }

});

