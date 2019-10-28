// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

addEventListener("click", function(e) {

  // permite ações somente se for botões
  if (e.target.localName === "button") {
    // console.log(e);
    const oldElement = document.querySelectorAll('.configurations .active');
    const id = e.target.id;
    let newElement = document.querySelectorAll('.configurations div#' + id);
    removeClass(oldElement[0], 'active');
    addClass(newElement[0], 'active');
  }

});

addEventListener("keypress", function(e) {
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
