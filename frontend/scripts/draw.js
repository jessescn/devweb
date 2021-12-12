var canvas, context, tool

function init () {

	tool = new tool_pencil();

  canvas = document.getElementById('canvas')
  context = canvas.getContext('2d')

  canvas.width = canvas.clientWidth
  canvas.height = canvas.clientHeight

	canvas.addEventListener('mousedown', handleMousePositionChange, false);
	canvas.addEventListener('mousemove', handleMousePositionChange, false);
	canvas.addEventListener('mouseup',	 handleMousePositionChange, false);
}

function tool_pencil () {
	const tool = this;
	this.started = false;

	this.mousedown = function (ev) {
			context.beginPath();

      context.lineWidth = 4;
      context.lineCap = 'round';
      context.strokeStyle = '#000';

			context.moveTo(ev._x, ev._y);
			tool.started = true;
	};

	this.mousemove = function (ev) {
		if (tool.started) {
			context.lineTo(ev._x, ev._y);
			context.stroke();
		}
	};

	this.mouseup = function (ev) {
		if (tool.started) {
			tool.mousemove(ev);
			tool.started = false;
		}
	};
}

function handleMousePositionChange (ev) {

	if (ev.layerX || ev.layerX == 0) {
		ev._x = ev.layerX;
		ev._y = ev.layerY;

	} else if (ev.offsetX || ev.offsetX == 0) {
		ev._x = ev.offsetX;
		ev._y = ev.offsetY;
	}

	var func = tool[ev.type];
	if (func) {
		func(ev);
	}
}

init()