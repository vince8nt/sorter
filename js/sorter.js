var c = document.getElementById("sorterContainer");
var ctx = c.getContext("2d");












class Button {
	constructor(x2, y2, w, h, text, col, bold) {
		this.x = x2;
		this.y = y2;
		this.width = w;
		this.height = h;
		this.label = text;
		this.color = col;
		this.highlight = bold;
	}
	draw() {
		if (this.highlight)
			ctx.fillStyle = "#000000";
		else
			ctx.fillStyle = "#808080";
		ctx.fillRect(this.x, this.y, this.width, this.height);
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x + 5, this.y + 5, this.width - 10, this.height - 10);
		ctx.fillStyle = "#000000";
		ctx.fillText(this.label, this.x + 10, this.y + this.height / 2 + 5);
	}
	
	setBold(bold) {
		this.highlight = bold;
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
		if (pointerX < this.x || this.x < pointerX + this.width)
			return false;
		if (pointerY < this.y || this.y < pointerY + this.height)
			return false;
		return true;
	}
	
}

myButton = new Button(100, 100, 200, 200, "test", "#9090FF", true);
myButton.setBold(false);
myButton.draw();


/*
class Selector {
	constructor () {
		this.buttons = [];
		this.bold = -1;
	}
	addButton (x, y, width, height, text, color) {
		temp = new Button(x, y, width, height, text, color, false);
		if (this.buttons.length === 0) {
			temp.setBold(true);
			this.bold = 0;
		}
		temp.draw();
		this.buttons.push(temp);
	}
	
	getSelected () {
		if (this.bold === -1)
			return "";
		return this.buttons[this.bold].getLabel;
	}
	clicked (pointerX, pointerY) {
		for (var i = 0; i < this.buttons.length; i++) {
			if (this.buttons[i].clicked(pointerX, pointerY)) {
				this.buttons[this.bold].setBold(false);
				this.buttons[this.bold].draw();
				this.bold = i;
				this.buttons[i].setBold(true);
				this.buttons[i].draw();
				return true;
			}
		}
		return false;
	}
	
}
*/


/*
sortType = new Selector();
sortType.addButton(10, 10, 100, 50, "bubble", "#9090FF");
sortType.addButton(150, 10, 100, 100, "heap", "#9090FF");
sortType.addButton(300, 100, 200, 50, "merge", "#9090FF");
*/








