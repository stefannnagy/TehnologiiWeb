(function () {
  document.getElementById("triangle").addEventListener("click", SelectButton);
  document.getElementById("circle").addEventListener("click", SelectButton);
  document.getElementById("rectangle").addEventListener("click", SelectButton);
  document.getElementById("square").addEventListener("click", SelectButton);
  document.getElementById("pencil").addEventListener("click", SelectButton);
  document.getElementById("resizecircle").addEventListener("click", SelectButton);

  document.getElementById("white").addEventListener("click", ColorButton);
  document.getElementById("red").addEventListener("click", ColorButton);
  document.getElementById("yellow").addEventListener("click", ColorButton);
  document.getElementById("green").addEventListener("click", ColorButton);
  document.getElementById("blue").addEventListener("click", ColorButton);
  document.getElementById("black").addEventListener("click", ColorButton);

  function ColorButton() {
    if (this.style.border === "2px solid black")
      this.style.border = "1px solid #ccc";

    else
    {
      document.getElementById("white").style.border = "1px solid #ccc";
      document.getElementById("red").style.border = "1px solid #ccc";
      document.getElementById("yellow").style.border = "1px solid #ccc";
      document.getElementById("green").style.border = "1px solid #ccc";
      document.getElementById("blue").style.border = "1px solid #ccc";
      document.getElementById("black").style.border = "1px solid #ccc";
      this.style.border = "2px solid black";
    }
  }

  function SelectButton () {
    if (this.style.background === "grey")
      this.style.background = "#fff";
    else {
      buttonsOff();
      turnMovableOff();
      this.style.background = "grey";
    }
  };

  document.getElementById("move").onclick = function () {
    if (this.style.background === 'grey') {
      this.style.background = '#fff';
      turnMovableOff();
    }
    else {
      buttonsOff();
      this.style.background = 'grey';
      turnMovableOn();
    }
  }

  var triangle = new Triangle();
  var circle = new Circle();
  var rectangle = new Rectangle();
  var square = new Square();

  document.getElementById("ShapeContainer").onclick = function (e) {
    var clickX = e.pageX - this.offsetLeft;
    var clickY = e.pageY - this.offsetTop;

    if (document.getElementById("triangle").style.background == "grey") {
      triangle.draw(clickX, clickY);
    }
    else
      if (document.getElementById("circle").style.background == "grey") {
        circle.draw(clickX, clickY);
      }
      else
        if (document.getElementById("rectangle").style.background == "grey") {
          rectangle.draw(clickX, clickY);
        }
        else
          if (document.getElementById("square").style.background == "grey") {
            square.draw(clickX, clickY);
          }
          else
            if (document.getElementById("square").style.background == "grey") {
              circle.drawResize(clickX, clickY);
            }
  };

  function buttonsOff() {
    document.getElementById("triangle").style.background = "#fff";
    document.getElementById("circle").style.background = "#fff";
    document.getElementById("rectangle").style.background = "#fff";
    document.getElementById("square").style.background = "#fff";
    document.getElementById("pencil").style.background = "#fff";
    document.getElementById("resizecircle").style.background = "#fff";
    document.getElementById("move").style.background = "#fff";
  };
})();