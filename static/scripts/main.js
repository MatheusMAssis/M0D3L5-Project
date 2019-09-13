var canvasDiv = document.getElementById("canvas");
var canvas = document.createElement("canvas");
canvas.setAttribute('width', '100');
canvas.setAttribute('height', '100');
canvas.style.background = "#ddd";
canvasDiv.appendChild(canvas);

var canvasData = document.createElement("div");
canvasData.setAttribute('name', 'canvasData');
canvasData.setAttribute('display', 'false');
canvasDiv.appendChild(canvasData);


if (typeof G_vmlCanvasManager != 'undefined') {
    canvas = G_vmlCanvasManager.initElement(canvas);
}

var context = canvas.getContext("2d");

$("#canvas").mousedown(function(e) {
    var mouseX = e.pageX-this.offsetLeft;
    var mouseY = e.pageY-this.offsetTop;

    paint = true;
    addClick(mouseX, mouseY);
    redraw();
});

$("#canvas").mousemove(function(e){
    var mouseX = e.pageX-this.offsetLeft;
    var mouseY = e.pageY-this.offsetTop;

    if (paint) {
        addClick(mouseX, mouseY, true);
        redraw();
    }
});

$("#canvas").mouseup(function(e) {
    paint = false;
});

$("canvas").mouseleave(function(e) {
    paint = false;
})

var clickX = new Array();
var clickY = new Array();
var clickDrag = new Array();
var paint;

function addClick(x, y, dragging) {
    clickX.push(x);
    clickY.push(y);
    clickDrag.push(dragging);
}

function redraw() {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    context.strokesStyle = "#df4b26";
    context.lineJoin = "round";
    context.lineWidth = 20;

    for (var i=0; i < clickX.length; i++) {
        context.beginPath();
        if (clickDrag[i] && i) {
            context.moveTo(clickX[i-1], clickY[i-1]);
        }
        else {
            context.moveTo(clickX[i]-1, clickY[i]-1);
        }
        context.lineTo(clickX[i], clickY[i]);
        context.closePath();
        context.stroke();
    }
}

function sendData() {
    let imgData = context.getImageData(0, 0, canvas.width, canvas.height);
    canvasData.innerHTML = imgData.data;
    console.log(imgData.data);
}

function clearCanvas() {
    console.log('here');
    clickX = new Array();
    clickY = new Array();
    clickDrag = new Array();
    context.clearRect(0, 0, canvas.width, canvas.height)
}

setInterval(sendData, 5000);