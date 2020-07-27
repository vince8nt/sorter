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
	getBold() {
		return this.highlight;
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
			this.buttons.push(new Button(x, y, width, height, text, color, true));
			this.bold = 0;
		}
		else {
			this.buttons.push(new Button(x, y, width, height, text, color, false));
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


myButtonList = [];
myButtonList.push(new Button(100, 400, 100, 150, "test", "#9090FF", false));
myButtonList.push(new Button(250, 400, 100, 150, "test", "#9090FF", true));
myButtonList.push(new Button(400, 400, 100, 150, "test", "#9090FF", false));
for (var i = 0; i < myButtonList.length; i++) {
	myButtonList[i].draw();
}

goButton = new Button(700, 200, 100, 100, "go", "#20C010", true);
goButton.draw();


sortType = new Selector();
sortType.addButton(10, 10, 100, 50, "bubble", "#9090FF");
sortType.addButton(150, 10, 100, 100, "heap", "#9090FF");
sortType.addButton(300, 100, 200, 50, "merge", "#9090FF");




c.addEventListener('click', function(event) {
    var screenX = event.pageX - c.offsetLeft - c.clientLeft;
    var screenY = event.pageY - c.offsetTop - c.clientTop;

    // test buttons
    for (var i = 0; i < myButtonList.length; i++) {
    	if (myButtonList[i].clicked(screenX, screenY)) {
    		myButtonList[i].setBold(!myButtonList[i].getBold());
    		myButtonList[i].draw();
    	}
    }

    // selector buttons
    if (sortType.clicked(screenX, screenY))
    	return;

    // go button
    if (goButton.clicked(screenX, screenY)) {
    	alert("Go pressed. Using " + sortType.getSelected() + " sort.");
    }

}, false);






