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
	constructor () {
		this.buttons = [];
		this.bold = -1;
	}
	addButton (x, y, width, height, text, color) {
		if (this.buttons.length === 0) {
			this.buttons.push(new Button(x, y, width, height, text, color, "#000000"));
			this.bold = 0;
		}
		else {
			this.buttons.push(new Button(x, y, width, height, text, color, "#808080"));
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
				this.buttons[this.bold].setBorder("#808080");
				this.buttons[this.bold].draw();
				this.bold = i;
				this.buttons[i].setBorder("#000000");
				this.buttons[i].draw();
				return true;
			}
		}
		return false;
	}
}


sortType = new Selector();
sortType.addButton(10, 480, 100, 50, "type 1", "#9090FF");
sortType.addButton(10, 540, 100, 50, "type 2", "#9090FF");
sortType.addButton(120, 480, 100, 50, "type 3", "#9090FF");
sortType.addButton(120, 540, 100, 50, "type 4", "#9090FF");
sortType.addButton(230, 480, 100, 50, "type 5", "#9090FF");
sortType.addButton(230, 540, 100, 50, "type 6", "#9090FF");
sortType.addButton(340, 480, 100, 50, "type 7", "#9090FF");
sortType.addButton(340, 540, 100, 50, "type 8", "#9090FF");

shuffleButton = new Button(450, 480, 110, 110, "Shuffle", "#20C010", "#000000");
shuffleButton.draw();

goButton = new Button(700, 200, 100, 100, "Go", "#20C010", "#000000");
goButton.draw();


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

}, false);






