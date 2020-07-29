var c = document.getElementById("sorterContainer");
var ctx = c.getContext("2d");





class Button {
	constructor(x2, y2, w, h, text, col, border) {
		this.x = x2;
		this.y = y2;
		this.width = w;
		this.height = h;
		this.label = text;
		this.color = col;
		this.highlight = border;
	}
	draw() {
		ctx.fillStyle = this.highlight;
		ctx.fillRect(this.x, this.y, this.width, this.height);
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x + 5, this.y + 5, this.width - 10, this.height - 10);
		ctx.fillStyle = "#000000";
		ctx.fillText(this.label, this.x + 10, this.y + this.height / 2 + 5);
	}
	setBorder(border) {
		this.highlight = border;
	}
	setColor(c) {
		this.color = c;
	}
	setLabel(text) {
		this.label = text;
	}
	getLabel() {
		return this.label;
	}
	clicked(pointerX, pointerY) {
		if (pointerX < this.x || this.x + this.width < pointerX) {
			return false;
		}
		if (pointerY < this.y || this.y + this.height < pointerY) {
			return false;
		}
		return true;
	}	
}

class Selector {
	constructor (color, bColor, sColor) {
		this.color = color;
		this.bColor = bColor;
		this.sColor = sColor;
		this.buttons = [];
		this.bold = -1;
	}
	addButton (x, y, width, height, text) {
		if (this.buttons.length === 0) {
			this.buttons.push(new Button(x, y, width, height, text, this.color, this.sColor));
			this.bold = 0;
		}
		else {
			this.buttons.push(new Button(x, y, width, height, text, this.color, this.bColor));
		}
		this.buttons[this.buttons.length - 1].draw();
	}
	
	getSelected () {
		if (this.bold === -1)
			return "";
		return this.buttons[this.bold].getLabel();
	}
	clicked (pointerX, pointerY) {
		for (var i = 0; i < this.buttons.length; i++) {
			if (this.buttons[i].clicked(pointerX, pointerY)) {
				this.buttons[this.bold].setBorder(this.bColor);
				this.buttons[this.bold].draw();
				this.bold = i;
				this.buttons[i].setBorder(this.sColor);
				this.buttons[i].draw();
				return true;
			}
		}
		return false;
	}
}

class Graph {
	constructor(left, top, width, height) {
		this.items = [1, 2, 3, 4, 5, 6, 7, 8];
		this.left = left;
		this.top = top;
		this.width = width;
		this.height = height;
		this.color = "#10FF10";
		this.border = "#000000";
	}
	draw() {
		ctx.clearRect(this.left, this.top, this.width, this.height);
		var length = this.items.length;
		for (var i = 0; i < length; i++) {
			var x = this.left + i * this.width / length;
			var tall = this.items[i] / length * this.height;
			var y = this.top + this.height - tall;
			ctx.fillStyle = this.border;
			ctx.fillRect(x, y, this.width / length, tall);
			ctx.fillStyle = this.color;
			ctx.fillRect(x + 2, y + 2, this.width / length - 4, tall - 4);
		}
	}
	addCol() {
		var newLength = this.items.length + 1;
		if (newLength > 100)
			return;
		this.items = [];
		for (var i = 0; i < newLength; i++) {
			this.items.push(i + 1);
		}
	}
	removeCol() {
		var newLength = this.items.length - 1;
		if (newLength < 2)
			return;
		this.items = [];
		for (var i = 0; i < newLength; i++) {
			this.items.push(i + 1);
		}
	}
	shuffle() {
		var tempItems = [];
		while (this.items.length > 0) {
			var index = Math.floor(Math.random() * this.items.length);
			tempItems.push(this.items.splice(index, 1));
		}
		this.items = tempItems;
	}
}


sortType = new Selector("#9090FF", "#707070", "#FF0000");
sortType.addButton(10, 480, 100, 50, "type 1");
sortType.addButton(10, 540, 100, 50, "type 2");
sortType.addButton(120, 480, 100, 50, "type 3");
sortType.addButton(120, 540, 100, 50, "type 4");
sortType.addButton(230, 480, 100, 50, "type 5");
sortType.addButton(230, 540, 100, 50, "type 6");
sortType.addButton(340, 480, 100, 50, "type 7");
sortType.addButton(340, 540, 100, 50, "type 8");

shuffleButton = new Button(450, 480, 110, 110, "Shuffle", "#20C010", "#000000");
shuffleButton.draw();

goButton = new Button(800, 480, 190, 110, "Go", "#20C010", "#000000");
goButton.draw();

myGraph = new Graph(10, 10, 980, 440);
myGraph.draw();


c.addEventListener('click', function(event) {
    var screenX = event.pageX - c.offsetLeft - c.clientLeft;
    var screenY = event.pageY - c.offsetTop - c.clientTop;
    // selector buttons
    if (sortType.clicked(screenX, screenY))
    	return;
    // go button
    if (goButton.clicked(screenX, screenY)) {
    	alert("Go pressed. Using " + sortType.getSelected() + " sort.");
    }
    // shuffle button
    if(shuffleButton.clicked(screenX, screenY)) {
    	myGraph.shuffle();
    	myGraph.draw();
    }

}, false);






