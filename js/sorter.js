var c = document.getElementById("sorterContainer");
var ctx = c.getContext("2d");



// classes -----------------------------------------------------------------------

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
	draw(bold) {
		ctx.clearRect(this.left, this.top, this.width, this.height);
		var length = this.items.length;
		for (var i = 0; i < length; i++) {
			var x = this.left + i * this.width / length;
			var tall = this.items[i] / length * this.height;
			var y = this.top + this.height - tall;
			ctx.fillStyle = this.border;
			ctx.fillRect(x, y, this.width / length, tall);
			if (i === bold)
				ctx.fillStyle = "#FF0000";
			else
				ctx.fillStyle = this.color;
			ctx.fillRect(x + 2, y + 2, this.width / length - 4, tall - 4);
		}
	}
	canAdd() {
		if (this.items.length < 100)
			return true;
		return false;
	}
	canSubtract() {
		if (this.items.length > 2)
			return true;
		return false;
	}
	addCol() {
		if (! this.canAdd())
			return false;
		var newLength = this.items.length + 1;
		this.items = [];
		for (var i = 0; i < newLength; i++) {
			this.items.push(i + 1);
		}
		return true;
	}
	removeCol() {
		if (! this.canSubtract())
			return false;
		var newLength = this.items.length - 1;
		this.items = [];
		for (var i = 0; i < newLength; i++) {
			this.items.push(i + 1);
		}
		return true;
	}
	shuffle() {
		var tempItems = [];
		while (this.items.length > 0) {
			var index = Math.floor(Math.random() * this.items.length);
			tempItems.push(this.items.splice(index, 1));
		}
		this.items = tempItems;
	}
	getItems() {
		return this.items;
	}
}

// make visuals -------------------------------------------------------------------

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

addButton = new Button(570, 480, 50, 50, "+", "#20C010", "#000000");
subButton = new Button(570, 540, 50, 50, "-", "#C01010", "#000000");
addButton.draw();
subButton.draw();

myGraph = new Graph(10, 10, 980, 440);
myGraph.draw(-1);

// program starts here ------------------------------------------------------------

function doAdd() {
	if (! myGraph.canSubtract()) { // visually enable sub button
		subButton.setBorder("#000000");
		subButton.setColor("#C01010");
		subButton.draw();
	}
	if (myGraph.addCol()) {
		myGraph.draw(-1);
		if (! myGraph.canAdd()) { // visually disable add button
			addButton.setBorder("#707070");
			addButton.setColor("#909090");
			addButton.draw();
		}
	}
}

function doSub() {
	if (! myGraph.canAdd()) { // visually enable add button
		addButton.setBorder("#000000");
		addButton.setColor("#20C010");
		addButton.draw();
	}
	if (myGraph.removeCol()) {
		myGraph.draw(-1);
		if (! myGraph.canSubtract()) { // visually disable sub button
			subButton.setBorder("#707070");
			subButton.setColor("#909090");
			subButton.draw();
		}
	}
}

c.addEventListener('click', function(event) {
    var screenX = event.pageX - c.offsetLeft - c.clientLeft;
    var screenY = event.pageY - c.offsetTop - c.clientTop;
    
    if (sortType.clicked(screenX, screenY)) { // selector buttons
    	// nothing to be done
    }
    else if (goButton.clicked(screenX, screenY)) { // go button
    	var g = myGraph.getItems();
    	// alert("Go pressed. Using " + sortType.getSelected() + " sort.");
    	bubbleSort(g, 0, g.length);
    }
    else if (shuffleButton.clicked(screenX, screenY)) { // shuffle button
    	myGraph.shuffle();
    	myGraph.draw(-1);
    }
    else if (addButton.clicked(screenX, screenY)) { // add button
    	doAdd();
    }
    else if (subButton.clicked(screenX, screenY)) { // subtract button
    	doSub();
    }

}, false);

function bubbleSort(items, i, length) {
	// if done
	if (length < 2) {
		alert("Sorted");
		return;
	}

	// do the switch
	if (items[i] > items[i + 1]) {
		// alert("On index " + i + ", " + items[i] + " is greater than " + items[i + 1]);
		var temp = items[i];
		items[i] = items[i + 1];
		items[i + 1] = temp;
	}

	// visual update
	myGraph.draw(i);

	// use setTimeout before next operation
	if (i > length - 3) {
		setTimeout(bubbleSort, 100, items, 0, length - 1);
	}
	else {
		setTimeout(bubbleSort, 100, items, i + 1, length);
	}
}









