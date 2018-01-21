var stage = new Konva.Stage({
  container: 'ShapeContainer',
  width: 700,
  height: 650
});

var layer = new Konva.Layer();

function Shape() {
  this.fill = 'white';
}

function Triangle() {
  this.x1 = null;
  this.y1 = null;
  this.x2 = null;
  this.y2 = null;
  this.x3 = null;
  this.y3 = null;
}

Triangle.prototype = new Shape();

function Circle() {
  this.x = null;
  this.y = null;
}

Circle.prototype = new Shape();

function Rectangle() {
  this.x = null;
  this.y = null;
}

Rectangle.prototype = new Shape();

function Square() {
  this.x = null;
  this.y = null;
}

Square.prototype = new Shape();

var shapes = [];

Square.prototype.draw = function (clickX, clickY) {
  this.x = clickX;
  this.y = clickY;
  var RectWidth = 100;
  var RectHeight = 100;
  var square = new Konva.Rect({
    x: clickX - RectWidth / 2,
    y: clickY - RectHeight / 2,
    width: RectWidth,
    height: RectHeight,
    stroke: 'black',
    strokeWidth: 2,
    draggable: false
  });

  var that = this;
  square.on('click', function () {
    that.color(this);
  });

  shapes.push(square);
  layer.add(square);
  stage.add(layer);
}

Rectangle.prototype.draw = function (clickX, clickY) {
  this.x = clickX;
  this.y = clickY;
  var RectWidth = 100;
  var RectHeight = 50;
  var rectangle = new Konva.Rect({
    x: clickX - RectWidth / 2,
    y: clickY - RectHeight / 2,
    width: RectWidth,
    height: RectHeight,
    stroke: 'black',
    strokeWidth: 2,
    draggable: false

  });

  var that = this;
  rectangle.on('click', function () {
    that.color(this);
  });

  shapes.push(rectangle);
  layer.add(rectangle);
  stage.add(layer);
}

Circle.prototype.draw = function (clickX, clickY) {
  this.x = clickX;
  this.y = clickY;
  var circle = new Konva.Circle({
    x: clickX,
    y: clickY,
    radius: 70,
    stroke: 'black',
    strokeWidth: 2,
    draggable: false
  });
  var that = this;
  circle.on('click', function () {
    that.color(this);
  });

  shapes.push(circle);
  layer.add(circle);
  stage.add(layer);
}

var corners = 0;
Triangle.prototype.draw = function(clickX, clickY){ 
  if(corners == 0){
    this.x1 = clickX;
    this.y1 = clickY;
    corners++;
  }
  else if (corners == 1) {
    this.x2 = clickX;
    this.y2 = clickY;
    corners++;
  }
  else if(corners == 2)
  {
    this.x3 = clickX;
    this.y3 = clickY;
    var triangle = new Konva.Line({
      points: [this.x1, this.y1, this.x2, this.y2, this.x3, this.y3, this.x1, this.y1],
      stroke: 'black',
      strokewidth: 1,
      closed: true,
      draggable: false
    });
    var that = this;
    triangle.on('click', function () {
      that.color(this);
    });
    layer.add(triangle);
    stage.add(layer);
    shapes.push(triangle);
    corners = 0;
  }
}

Shape.prototype.color = function (shape) {
  if (buttonsNotSelected()) {
    shape.fill(getColorButton());
    layer.draw();
  }
}

function getColorButton() {
  if (document.getElementById("white").style.border === "2px solid black")
    return 'white';
  if (document.getElementById("red").style.border === "2px solid black")
    return 'red';
  if (document.getElementById("yellow").style.border === "2px solid black")
    return 'yellow';
  if (document.getElementById("green").style.border === "2px solid black")
    return 'green';
  if (document.getElementById("blue").style.border === "2px solid black")
    return 'blue';
  if (document.getElementById("black").style.border === "2px solid black")
    return 'black';

  return 'black';
}

function buttonsNotSelected() {
  if (document.getElementById("triangle").style.background === "grey")
    return false;
  if (document.getElementById("circle").style.background === "grey")
    return false;
  if (document.getElementById("rectangle").style.background === "grey")
    return false;
  if (document.getElementById("square").style.background === "grey")
    return false;
  if (document.getElementById("resizecircle").style.background === "grey")
    return false;
  return true;
}

document.getElementById("delete").onclick = function () {
  document.getElementById("triangle").style.background = "#fff";
  document.getElementById("circle").style.background = "#fff";
  document.getElementById("rectangle").style.background = "#fff";
  document.getElementById("square").style.background = "#fff";
  document.getElementById("pencil").style.background = "#fff";
  document.getElementById("resizecircle").style.background = "#fff";
  document.getElementById("move").style.background = "#fff";

  shapes = [];
  layer.destroy();
}

function turnMovableOn() {
  shapes.forEach(function (shape) {
    shape.setDraggable(true);
  });
}

function turnMovableOff() {
  shapes.forEach(function (shape) {
    shape.setDraggable(false);
  });
}

var oldPos = {};
var down = false;
var firstPos = {};

document.getElementById("ShapeContainer").addEventListener('mousedown', function (e) {
  down = true;
  oldPos.x = e.pageX - this.offsetLeft;
  oldPos.y = e.pageY - this.offsetTop;
  firstPos.x = oldPos.x;
  firstPos.y = oldPos.y;
});
document.getElementById("ShapeContainer").addEventListener('mousemove', toDraw);

document.getElementById("ShapeContainer").addEventListener('mouseup', function (e) {
  down = false;
  if (document.getElementById("resizecircle").style.background === "grey") {
    if (oldcircle) {
      shapes.push(oldcircle);
      oldcircle = undefined;
    }
  }
});

var oldcircle;

function toDraw(e) {
  var posX = e.pageX - this.offsetLeft;
  var posY = e.pageY - this.offsetTop;

  if (document.getElementById("pencil").style.background === "grey") {
    if (down == true) {
      var line = new Konva.Line({
        points: [oldPos.x, oldPos.y, posX, posY],
        stroke: getColorButton(),
        strokeWidth: 2
      });
      oldPos.x = posX;
      oldPos.y = posY;
      layer.add(line);
      stage.add(layer);
    }
  }
  else
    if (document.getElementById("resizecircle").style.background === "grey") {
      if (down == true) {
        var protocircle = new Circle();
        if(oldcircle)
          oldcircle.destroy();
        var circle = new Konva.Circle({
          x: firstPos.x,
          y: firstPos.y,
          radius: Math.sqrt((posX - firstPos.x) * (posX - firstPos.x) + (posY - firstPos.y) * (posY - firstPos.y)),
          stroke: 'black',
          strokeWidth: 2,
          draggable: false
        });
        circle.on('click', function () {
          protocircle.color(this);
        });
        oldPos.x = posX;
        oldPos.y = posY;
        layer.add(circle);
        stage.add(layer);
        oldcircle = circle;
      }
    }
}