var c = document.getElementById("sorterContainer");
var ctx = c.getContext("2d");



// classes -----------------------------------------------------------------------

class Button {
	constructor(x, y, width, height, label, color, border) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.label = label;
		this.color = color;
		this.border = border;
		this.draw();
	}
	draw() {
		ctx.fillStyle = this.border;
		ctx.fillRect(this.x, this.y, this.width, this.height);
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x + 5, this.y + 5, this.width - 10, this.height - 10);
		ctx.fillStyle = "#000000";
		ctx.fillText(this.label, this.x + 10, this.y + this.height / 2 + 5);
	}
	setBorder(border) {
		this.border = border;
		this.draw();
	}
	setColor(color) {
		this.color = color;
		this.draw();
	}
	setLabel(label) {
		this.label = label;
		this.draw();
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
		if (this.buttons.length == 0) {
			this.buttons.push(new Button(x, y, width, height, text, this.color, this.sColor));
			this.bold = 0;
		}
		else {
			this.buttons.push(new Button(x, y, width, height, text, this.color, this.bColor));
		}
	}
	setBorder(border) {
		this.bColor = border;
		for (var i = 0; i < this.buttons.length; i++) {
			if (i != this.bold)
				this.buttons[i].setBorder(this.bColor);
		}
	}
	setColor(color) {
		this.color = color;
		for (var i = 0; i < this.buttons.length; i++) {
			this.buttons[i].setColor(this.color);
		}
	}
	getSelected () {
		if (this.bold == -1)
			return "";
		return this.buttons[this.bold].getLabel();
	}
	clicked (pointerX, pointerY) {
		for (var i = 0; i < this.buttons.length; i++) {
			if (this.buttons[i].clicked(pointerX, pointerY)) {
				this.buttons[this.bold].setBorder(this.bColor);
				this.bold = i;
				this.buttons[i].setBorder(this.sColor);
				return true;
			}
		}
		return false;
	}
}

class Graph {
	constructor(left, top, width, height) {
		this.left = left;
		this.top = top;
		this.width = width;
		this.height = height;
		this.color = "#FFFFFF";
		this.compColor = "#00FF00";
		this.writeColor = "#FF0000";
		this.setLength(32, "Uniform Array");
		this.lastHighlight = [];
	}
	draw() {
		for (var i = 0; i < this.items.length; i++) {
			this.drawIndex(i, this.color);
		}
	}
	replace(index, value) {
		this.drawUnHighlight();
		this.lastHighlight = [index];
		this.items[index] = value;
		this.drawIndex(index, this.writeColor);

	}
	highlight(highlight) {
		this.drawUnHighlight();
		this.lastHighlight = highlight;
		for (var i = 0; i < highlight.length; i++) {
			this.drawIndex(highlight[i], this.compColor);
		}
	}
	drawUnHighlight() {
		for (var i = 0; i < this.lastHighlight.length; i++) {
			this.drawIndex(this.lastHighlight[i], this.color);
		}
	}
	drawIndex(index, color) {
		var barWidth = this.width / this.items.length;
		var x = Math.round(this.left + index * barWidth);
		var x2 = this.left + (index + 1) * barWidth;
		barWidth = Math.round(x2 - x);
		var tall = Math.round((this.items[index] + 1) / this.items.length * this.height);
		ctx.clearRect(x, this.top, barWidth, this.height);
		ctx.fillStyle = color;
		ctx.fillRect(x, this.top + this.height - tall, barWidth, tall);
	}
	getLength() {
		return this.items.length;
	}
	setLength(newLength, arrType) {
		if (newLength > 1) {
			this.items = [];
			if (arrType === "Duplicates Array") {
				var aux = []; // make aux array
				for (var i = 0; i < newLength; i++)
					aux.push(0);
				for (var i = 0; i < newLength; i++)
					aux[Math.floor(Math.random() * newLength)]++;
				for (var i = 1; i < aux.length; i++)
					aux[i] += aux[i - 1];
				var index = 0;
				for (var i = 0; i < aux.length; i++) {
					while (index < aux[i])
						this.items[index++] = i;
				}
			}
			else if (arrType === "Parabola Array") {
				var max = Math.pow(0.5 - newLength / 2, 2);
				var div = max / (newLength - 1);
				for (var i = 0; i < newLength; i++) {
					var x = (i + 0.5 - newLength / 2);
					var y = newLength - 1 - Math.round(Math.pow(x, 2) / div);
					this.items.push(y);
				}
			}
			else if (arrType === "Bell Curve Array") {
				for (var i = 0; i < newLength; i++) {
					var x = (i + 0.5 - newLength / 2) / newLength * 4.5;
					var y = Math.pow(2.718, -1 * Math.pow(x, 2));
					y *= (newLength - 1);
					this.items.push(Math.round(y));
				}
			}
			else {
				for (var i = 0; i < newLength; i++) {
					this.items.push(i);
				}
			}
			this.draw();
		}
	}
	getItems() {
		return [...this.items];
	}
}

// make visuals -------------------------------------------------------------------

myGraph = new Graph(0, 0, 1024, 410);

ctx.fillStyle = "#FFFFFF"; // draw white box behind the buttons
ctx.fillRect(0, 420, 1024, 310);

sortType = new Selector("#9090FF", "#707070", "#FF0000");
sortType.addButton(10, 430, 100, 50, "Bubble Sort");
sortType.addButton(10, 490, 100, 50, "Bubble Sort");
sortType.addButton(10, 550, 100, 50, "Gnome Sort");
sortType.addButton(10, 610, 100, 50, "Cocktail Shaker");
sortType.addButton(10, 670, 100, 50, "Selection Sort");

sortType.addButton(120, 490, 100, 50, "Binary Gnome Sort");
sortType.addButton(120, 550, 100, 50, "Optimized Gnome");
sortType.addButton(120, 610, 100, 50, "Optimized Shaker");
sortType.addButton(120, 670, 100, 50, "Min Max Selection");

sortType.addButton(230, 490, 100, 50, "Insertion Sort");
sortType.addButton(230, 550, 100, 50, "Quicksort");
sortType.addButton(230, 610, 100, 50, "Max Heap Sort");
sortType.addButton(230, 670, 100, 50, "Reverse Min Heap");

sortType.addButton(340, 490, 100, 50, "Binary Insertion");
sortType.addButton(340, 550, 100, 50, "Quick Converge");
sortType.addButton(340, 610, 100, 50, "Min Heap Sort");
sortType.addButton(340, 670, 100, 50, "Median Heap Sort");

sortType.addButton(450, 490, 100, 50, "Merge Sort");
sortType.addButton(450, 550, 100, 50, "Counting Sort");
sortType.addButton(450, 610, 100, 50, "Binary Radix MSD");
sortType.addButton(450, 670, 100, 50, "Binary Radix LSD");

arrType = new Selector("#ADD8E6", "#707070", "#FF0000");
arrType.addButton(584, 430, 100, 50, "Uniform Array");
arrType.addButton(694, 430, 100, 50, "Duplicates Array");
arrType.addButton(804, 430, 100, 50, "Parabola Array");
arrType.addButton(914, 430, 100, 50, "Bell Curve Array");

delayLabel = new Button(584, 490, 150, 60, "Sort Delay (ms)", "#A0A0A0", "#A0A0A0");
subDelayButton = new Button(584, 550, 50, 50, "-", "#C01010", "#000000");
delayDisp = new Button(634, 550, 50, 50, "15", "#A0A0A0", "#A0A0A0");
addDelayButton = new Button(684, 550, 50, 50, "+", "#20C010", "#000000");

delayLabel = new Button(744, 490, 150, 60, "Array Size", "#A0A0A0", "#A0A0A0");
subButton = new Button(744, 550, 50, 50, "-", "#C01010", "#000000");
sizeDisp = new Button(794, 550, 50, 50, myGraph.getLength(), "#A0A0A0", "#A0A0A0");
addButton = new Button(844, 550, 50, 50, "+", "#20C010", "#000000");

goButton = new Button(904, 490, 110, 110, "Sort", "#20C010", "#000000");

nonSortType = new Selector("#20C010", "#000000", "#000000");
nonSortType.addButton(584, 610, 97, 50, "Reverse Array");
nonSortType.addButton(584, 670, 97, 50, "Split Array");
nonSortType.addButton(691, 610, 97, 50, "Bad Shuffle");
nonSortType.addButton(691, 670, 97, 50, "Half Reverse");
nonSortType.addButton(798, 610, 97, 50, "Interlace Array");
nonSortType.addButton(798, 670, 97, 50, "Heapify Array");
nonSortType.addButton(904, 610, 110, 110, "Shuffle");

var sorting = false;

// program starts here ------------------------------------------------------------

function doAdd() {
	var length = myGraph.getLength();
	if (length <= 512) {
		length *= 2;
		subButton.setBorder("#000000");     // visually enable sub button
		subButton.setColor("#C01010");
		myGraph.setLength(length, arrType.getSelected());        // set graph length
		sizeDisp.setLabel(length);          // set length label
		if (length > 512) {
			addButton.setBorder("#707070"); // visually disable add button
			addButton.setColor("#909090");
		}
	}
}

function doSub() {
	var length = myGraph.getLength();
	if (length >= 4) {
		length = Math.floor(length / 2);
		addButton.setBorder("#000000");     // visually enable add button
		addButton.setColor("#20C010");
		myGraph.setLength(length, arrType.getSelected());        // set graph length
		sizeDisp.setLabel(length);          // set length label
		if (length < 4) {
			subButton.setBorder("#707070"); // visually disable sub button
			subButton.setColor("#909090");
		}
	}
}

function disableButtons() {
	sorting = true;

	sortType.setBorder("#707070");
	sortType.setColor("#909090");
	addButton.setBorder("#707070");
	addButton.setColor("#909090");
	subButton.setBorder("#707070");
	subButton.setColor("#909090");
	goButton.setBorder("#707070");
	goButton.setColor("#909090");
}

function enableButtons() {
	sorting = false;

	sortType.setBorder("#707070");
	sortType.setColor("#9090FF");
	if (myGraph.getLength() < 1000) {
		addButton.setBorder("#000000");
		addButton.setColor("#20C010");
	}
	if (myGraph.getLength() > 2) {
		subButton.setBorder("#000000");
		subButton.setColor("#C01010");
	}
	goButton.setBorder("#000000");
	goButton.setColor("#20C010");
}

c.addEventListener('click', function(event) {
	if (sorting) return; // does not allow modifications during the sorting process

    var screenX = event.pageX - c.offsetLeft - c.clientLeft;
    var screenY = event.pageY - c.offsetTop - c.clientTop;
    
    if (sortType.clicked(screenX, screenY)) {           // selector buttons
    	console.log("selector button clicked");
    }
    else if (arrType.clicked(screenX, screenY)) {           // selector buttons
    	console.log("arr type button clicked");
    	myGraph.setLength(myGraph.getLength(), arrType.getSelected());
    }
    /*
    else if (shuffleButton.clicked(screenX, screenY)) { // shuffle button
    	console.log("shuffle button clicked");
    	myGraph.shuffle();
    }
    */
    else if (addButton.clicked(screenX, screenY)) {     // add button
    	console.log("add button clicked");
    	doAdd();
    }
    else if (subButton.clicked(screenX, screenY)) {     // subtract button
    	console.log("subtract button clicked");
    	doSub();
    }
    else if (nonSortType.clicked(screenX, screenY)) {           // selector buttons
    	console.log("non Sort type button clicked");
    	disableButtons();
    	if (nonSortType.getSelected() === "Reverse Array") {
    		doMods(reverseArray(myGraph.getItems()), false);
    	}
    	else if (nonSortType.getSelected() === "Split Array") {
    		doMods(splitArray(myGraph.getItems()), false);
    	}
    	else if (nonSortType.getSelected() === "Bad Shuffle") {
    		doMods(badShuffleArray(myGraph.getItems()), false);
    	}
    	else if (nonSortType.getSelected() === "Half Reverse") {
    		doMods(halfReverseArray(myGraph.getItems()), false);
    	}
    	else if (nonSortType.getSelected() === "Interlace Array") {
    		doMods(interlaceArray(myGraph.getItems()), false);
    	}
    	else if (nonSortType.getSelected() === "Heapify Array") {
    		doMods(heapifyArray(myGraph.getItems()), false);
    	}
    	else if (nonSortType.getSelected() === "Shuffle"){ // shuffle
    		doMods(shuffleArray(myGraph.getItems()), false);
    	}
    	else {
    		enableButtons();
    		console.log("Failed to find " + nonSortType.getSelected() + " non sort.");
    	}
    }
    else if (goButton.clicked(screenX, screenY)) {      // go button
    	console.log("Go button clicked. Using " + sortType.getSelected() + " sort.");
    	disableButtons();
		if (sortType.getSelected() === "Bubble Sort") {
    		doMods(bubbleSort(myGraph.getItems()), true);
		}
		else if (sortType.getSelected() === "Binary Gnome Sort") {
    		doMods(binaryOptimizedGnomeSort(myGraph.getItems()), true);
    	}
    	else if (sortType.getSelected() === "Gnome Sort") {
    		doMods(gnomeSort(myGraph.getItems()), true);
    	}
    	else if (sortType.getSelected() === "Optimized Gnome") {
    		doMods(optimizedGnomeSort(myGraph.getItems()), true);
    	}
    	else if (sortType.getSelected() === "Cocktail Shaker") {
    		doMods(cocktailShaker(myGraph.getItems()), true);
    	}
    	else if (sortType.getSelected() === "Optimized Shaker") {
    		doMods(optimizedCocktailShaker(myGraph.getItems()), true);
    	}
    	else if (sortType.getSelected() === "Selection Sort") {
    		doMods(selectionSort(myGraph.getItems()), true);
    	}
    	else if (sortType.getSelected() === "Min Max Selection") {
    		doMods(minMaxSelectionSort(myGraph.getItems()), true);
    	}
    	else if (sortType.getSelected() === "Insertion Sort") {
    		doMods(insertionSort(myGraph.getItems()), true);
    	}
    	else if (sortType.getSelected() === "Binary Insertion") {
    		doMods(binaryInsertionSort(myGraph.getItems()));
    	}
    	else if (sortType.getSelected() === "Quicksort") {
    		doMods(quicksort(myGraph.getItems()), true);
    	}
    	else if (sortType.getSelected() === "Quick Converge") {
    		doMods(quicksortConv(myGraph.getItems()), true);
    	}
    	else if (sortType.getSelected() === "Max Heap Sort") {
    		doMods(maxHeapSort(myGraph.getItems()), true);
    	}
    	else if (sortType.getSelected() === "Min Heap Sort") {
    		doMods(minHeapSort(myGraph.getItems()), true);
    	}
    	else if (sortType.getSelected() === "Reverse Min Heap") {
    		doMods(backMinHeapSort(myGraph.getItems()), true);
    	}
    	else if (sortType.getSelected() === "Median Heap Sort") {
    		doMods(medianHeapSort(myGraph.getItems()), true);
    	}
    	else if (sortType.getSelected() === "Merge Sort") {
    		doMods(mergeSort(myGraph.getItems()), true);
    	}
    	else if (sortType.getSelected() === "Counting Sort") {
    		doMods(countingSort(myGraph.getItems()), true);
    	}
    	else if (sortType.getSelected() === "Binary Radix MSD") {
    		doMods(binaryRadixMSD(myGraph.getItems()), true);
    	}
    	else if (sortType.getSelected() === "Binary Radix LSD") {
    		doMods(binaryRadixLSD(myGraph.getItems()), true);
    	}
    	else {
    		enableButtons();
    		console.log("Failed to find " + sortType.getSelected() + " sort.");
			alert("Invalid sorting algorithm.");
    	}
    }
}, false);

function doMods(mods, ending) {
	console.log("Sort is " + mods.length + " long.");
	var delay = 1000 / myGraph.getLength();
	if (myGraph.getLength() == 1024)
		delay = 0;
	setTimeout(modify, 100, mods, 0, delay, 0, 0, 0, ending);
}

function modify(mods, i, delay, reads, writes, comps, ending) {
	if (i < mods.length) {
		const modType = mods[i][0];
		if (modType === "read" || modType === "aux read") {
			modify(mods, i + 1, delay, reads + 1, writes, comps, ending); // fix this so it doesn't overdo the stack
		}
		else {
			if (modType === "compare") {
				comps++;
				myGraph.highlight([mods[i][1], mods[i][2]]);
			}
			else if (modType === "write") {
				writes++;
				myGraph.replace(mods[i][1], mods[i][2]);
			}
			else if (modType === "aux write") {
				writes++;
				myGraph.drawUnHighlight();
			}
			setTimeout(modify, delay, mods, i + 1, delay, reads, writes, comps, ending);
		}
	}
	else {
		setTimeout(endMods, 100, reads, writes, comps, ending);
	}
}

function endMods(reads, writes, comps, ending) {
	enableButtons();
	myGraph.draw();
	if (ending)
		alert("Array sorted\ncomparisons: " + comps + "\nreads: " + reads + "\nwrites: " + writes);
}






















