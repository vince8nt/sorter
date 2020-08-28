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
		this.duplicates = false;
		this.setLength(30);
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
		var tall = Math.round(this.items[index] / this.items.length * this.height);
		ctx.clearRect(x, this.top, barWidth, this.height);
		ctx.fillStyle = color;
		ctx.fillRect(x, this.top + this.height - tall, barWidth, tall);
	}
	getLength() {
		return this.items.length;
	}
	setLength(newLength) {
		if (newLength > 1) {
			this.items = [];
			for (var i = 0; i < newLength; i++) {
				if (this.duplicates && Math.random() < 0.5 && i > 0)
					this.items.push(i);
				else
					this.items.push(i + 1);
			}
			this.draw();
		}
	}
	shuffle() {
		for (var i = this.items.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * i);
			const temp = this.items[i];
			this.items[i] = this.items[j];
  			this.items[j] = temp;
		}
		this.draw();
	}
	setDuplicates(hasDups) {
		this.duplicates = hasDups;
		this.setLength(this.items.length);
	}
	getDuplicates() {
		return this.duplicates;
	}
	getItems() {
		return [...this.items];
	}
}

// make visuals -------------------------------------------------------------------

myGraph = new Graph(0, 0, 1024, 410);

ctx.fillStyle = "#FFFFFF"; // draw white box behind the buttons
ctx.fillRect(0, 470, 1024, 250);

sortType = new Selector("#9090FF", "#707070", "#FF0000");
sortType.addButton(10, 480, 100, 50, "Bubble Sort");
sortType.addButton(10, 540, 100, 50, "Gnome Sort");
sortType.addButton(10, 600, 100, 50, "Cocktail Shaker");
sortType.addButton(10, 660, 100, 50, "Selection Sort");

sortType.addButton(120, 480, 100, 50, "-Optimized Bubble");
sortType.addButton(120, 540, 100, 50, "Optimized Gnome");
sortType.addButton(120, 600, 100, 50, "-Optimized Shaker");
sortType.addButton(120, 660, 100, 50, "Min Max Selection");

sortType.addButton(230, 480, 100, 50, "Insertion Sort");
sortType.addButton(230, 540, 100, 50, "Quicksort");
sortType.addButton(230, 600, 100, 50, "Max Heap Sort");
sortType.addButton(230, 660, 100, 50, "Reverse Min Heap");

sortType.addButton(340, 480, 100, 50, "Binary Insertion");
sortType.addButton(340, 540, 100, 50, "Quick Converge");
sortType.addButton(340, 600, 100, 50, "Min Heap Sort");
sortType.addButton(340, 660, 100, 50, "Median Heap Sort");

// sortType.addButton(450, 480, 100, 50, "Max Heap Sort");
// sortType.addButton(450, 540, 100, 50, "Median Heap Sort");

shuffleButton = new Button(560, 480, 110, 110, "Shuffle", "#20C010", "#000000");
dupButton = new Button(705, 480, 100, 50, "duplicates: off", "#C01010", "#000000");
addButton = new Button(780, 540, 50, 50, "+", "#20C010", "#000000");
sizeDisp = new Button(730, 540, 50, 50, myGraph.getLength(), "#A0A0A0", "#A0A0A0");
subButton = new Button(680, 540, 50, 50, "-", "#C01010", "#000000");
goButton = new Button(840, 480, 150, 110, "Go", "#20C010", "#000000");

var sorting = false;

// program starts here ------------------------------------------------------------

function doAdd() {
	var length = myGraph.getLength();
	if (length < 1000) {
		subButton.setBorder("#000000");     // visually enable sub button
		subButton.setColor("#C01010");
		myGraph.setLength(++length);        // set graph length
		sizeDisp.setLabel(length);          // set length label
		if (length == 1000) {
			addButton.setBorder("#707070"); // visually disable add button
			addButton.setColor("#909090");
		}
	}
}

function doSub() {
	var length = myGraph.getLength();
	if (length > 2) {
		addButton.setBorder("#000000");     // visually enable add button
		addButton.setColor("#20C010");
		myGraph.setLength(--length);        // set graph length
		sizeDisp.setLabel(length);          // set length label
		if (length == 2) {
			subButton.setBorder("#707070"); // visually disable sub button
			subButton.setColor("#909090");
		}
	}
}

function clickDuplicates() {
	myGraph.setDuplicates(!myGraph.getDuplicates());
	if (myGraph.getDuplicates()) {
		dupButton.setColor("#20C010");
		dupButton.setLabel("duplicates: on");
    }
    else {
		dupButton.setColor("#C01010");
		dupButton.setLabel("duplicates: off");
    }
}

function disableButtons() {
	sorting = true;

	sortType.setBorder("#707070");
	sortType.setColor("#909090");
	shuffleButton.setBorder("#707070");
	shuffleButton.setColor("#909090");
	dupButton.setBorder("#707070");
	dupButton.setColor("#909090");
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
	shuffleButton.setBorder("#000000");
	shuffleButton.setColor("#20C010");
	dupButton.setBorder("#000000");
	if (myGraph.getDuplicates())
		dupButton.setColor("#20C010");
	else
		dupButton.setColor("#C01010");
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
    else if (shuffleButton.clicked(screenX, screenY)) { // shuffle button
    	console.log("shuffle button clicked");
    	myGraph.shuffle();
    }
    else if (addButton.clicked(screenX, screenY)) {     // add button
    	console.log("add button clicked");
    	doAdd();
    }
    else if (subButton.clicked(screenX, screenY)) {     // subtract button
    	console.log("subtract button clicked");
    	doSub();
    }
    else if (dupButton.clicked(screenX, screenY)) {     // duplicates button
    	console.log("duplicates button clicked");
    	clickDuplicates();
    }
    else if (goButton.clicked(screenX, screenY)) {      // go button
    	console.log("Go button clicked. Using " + sortType.getSelected() + " sort.");
    	disableButtons();
		if (sortType.getSelected() === "Bubble Sort") {
    		doMods(bubbleSort(myGraph.getItems()));
		}
		else if (sortType.getSelected() === "Optimized Bubble") {
    		
    	}
    	else if (sortType.getSelected() === "Gnome Sort") {
    		doMods(gnomeSort(myGraph.getItems()));
    	}
    	else if (sortType.getSelected() === "Optimized Gnome") {
    		doMods(optimizedGnomeSort(myGraph.getItems()));
    	}
    	else if (sortType.getSelected() === "Cocktail Shaker") {
    		doMods(cocktailShaker(myGraph.getItems()));
    	}
    	else if (sortType.getSelected() === "Optimized Shaker") {
    		// doMods(optimizedCocktailShaker(myGraph.getItems()));
    	}
    	else if (sortType.getSelected() === "Selection Sort") {
    		doMods(selectionSort(myGraph.getItems()));
    	}
    	else if (sortType.getSelected() === "Min Max Selection") {
    		doMods(minMaxSelectionSort(myGraph.getItems()));
    	}
    	else if (sortType.getSelected() === "Insertion Sort") {
    		doMods(insertionSort(myGraph.getItems()));
    	}
    	else if (sortType.getSelected() === "Binary Insertion") {
    		doMods(binaryInsertionSort(myGraph.getItems()));
    	}
    	else if (sortType.getSelected() === "Quicksort") {
    		doMods(quicksort(myGraph.getItems()));
    	}
    	else if (sortType.getSelected() === "Quick Converge") {
    		doMods(quicksortConv(myGraph.getItems()));
    	}
    	
    	else if (sortType.getSelected() === "Reverse Min Heap") {
    		doMods(backMinHeapSort(myGraph.getItems()));
    	}
    	else if (sortType.getSelected() === "Median Heap Sort") {
    		doMods(medianHeapSort(myGraph.getItems()));
    	}
    	
    	
    	else if (sortType.getSelected() === "Min Heap Sort") {
    		doMods(minHeapSort(myGraph.getItems()));
    	}
    	
    	else if (sortType.getSelected() === "Max Heap Sort") {
    		doMods(maxHeapSort(myGraph.getItems()));
    	}
    	else {
    		enableButtons();
    		console.log("Failed to find " + sortType.getSelected() + " sort.");
			alert("Invalid sorting algorithm.");
    	}
    }
}, false);

function doMods(mods) {
	console.log("Sort is " + mods.length + " long.");
	var delay = 1500 / myGraph.getLength();
	setTimeout(modify, 100, mods, 0, delay, 0, 0, 0);
}

function modify(mods, i, delay, reads, writes, comps) {
	if (i < mods.length) {
		if (mods[i][0] === "read") {
			modify(mods, i + 1, delay, reads + 1, writes, comps);
		}
		else {
			if (mods[i][0] === "compare") {
				comps++;
				myGraph.highlight([mods[i][1], mods[i][2]]);
			}
			else if (mods[i][0] === "write") {
				writes++;
				myGraph.replace(mods[i][1], mods[i][2]);
			}
			setTimeout(modify, delay, mods, i + 1, delay, reads, writes, comps);
		}
	}
	else {
		setTimeout(endMods, 100, reads, writes, comps);
	}
}

function endMods(reads, writes, comps) {
	enableButtons();
	myGraph.draw();
	alert("Array sorted\ncomparisons: " + comps + "\nreads: " + reads + "\nwrites: " + writes);
}



function mergeSort(inPlace) {
	var mods = []; // [[[highlights], index, value], etc]
	var graphCopy = [...myGraph.getItems()];
	splitMerge(graphCopy, 0, graphCopy.length - 1, mods, inPlace);
	return mods;
}

function splitMerge(list, begin, end, mods, inPlace) {
	if (begin < end) {
		var middle = Math.floor((begin + end) / 2);
		splitMerge(list, begin, middle, mods, inPlace);
		splitMerge(list, middle + 1, end, mods, inPlace);
		if (inPlace)
			inPlaceMerge(list, begin, middle, end, mods);
		else
			merge(list, begin, middle, end, mods);
	}
}

function inPlaceMerge(list, begin, middle, end, mods) {
	for (middle++; begin < middle; begin++) {
		if (parseInt(list[begin]) > parseInt(list[middle])) {
			mods.push([[begin, middle], [begin, middle]]);
			var temp = list[begin];
			list[begin] = list[middle];
			list[middle] = temp;
			for (var i = middle; i < end; i++) {
				if (parseInt(list[i]) > parseInt(list[i + 1])) {
					mods.push([[i, i + 1], [i, i + 1]]);
					var temp = list[i];
					list[i] = list[i + 1];
					list[i + 1] = temp;
				}
				else {
					mods.push([[i, i + 1], [-1, -1]]);
					break;
				}
			}
		}
		else
			mods.push([[begin, middle], [-1, -1]]);
	}
}

function merge(list, begin, middle, end, mods) {
	var bold = [];
	for (var i = begin; i <= end; i++) {
		bold.push(i);
	}
	mods.push([bold, -1, -1]); // highlight the two parts that will be merged

	var c1 = begin;
	var c2 = middle + 1;
	var tempList = [];
	while (c1 <= middle && c2 <= end) {
		if (parseInt(list[c1]) < parseInt(list[c2])) {
			tempList.push(parseInt(list[c1]));
			c1++;
		}
		else {
			tempList.push(parseInt(list[c2]));
			c2++;
		}
	}
	while (c1 <= middle) {
		tempList.push(parseInt(list[c1]));
		 c1++;
	}
	while (c2 <= end) {
		tempList.push(parseInt(list[c2]));
		c2++;
	}
	for (var i = 0; i < tempList.length; i++) {
		list[begin + i] = tempList[i];
		mods.push([[begin + i], begin + i, tempList[i]]);
	}
}



function countingSort() {
	var mods = []; // [[[highlights], index, value], etc]
	var graphCopy = [...myGraph.getItems()];
	var count = [];
	for (var i = 0; i < graphCopy.length; i++) {
		count.push(0);
	}
	for (var i = 0; i < graphCopy.length; i++) {
		count[graphCopy[i] - 1]++;
		mods.push([[i], -1, -1]);
	}
	for (var i = 1; i < count.length; i++) {
		count[i] = count[i] + count[i - 1];
		mods.push([[i - 1, i], -1, -1]);
	}
	var index = 0;
	for (var i = 0; i < count.length; i++) {
		while (index < count[i]) {
			graphCopy[index] = i + 1;
			mods.push([[index], index, i + 1]);
			index++;
		}
	}
	return mods;
}

function binaryRadixMSB() {
	var swaps = []; // [[[highlights], [swaps]], etc]
	var graphCopy = [...myGraph.getItems()];

	// graphCopy.length == graphCopy.maxValue
	var sigBit = Math.floor(Math.log(graphCopy.length) / Math.log(2));
	var bitNum = Math.round(Math.pow(2, sigBit));
	binaryRadixMSBR(graphCopy, bitNum, 0, graphCopy.length - 1, swaps);
	return swaps;
}

function binaryRadixMSBR(list, bitNum, start, end, swaps) {
	if (bitNum >= 1 && end - start > 0) {
		var endIndex = end;
		while (endIndex > start) {
			swaps.push([[endIndex], [-1, -1]]);
			if ((list[endIndex] % 256) & (bitNum % 256))
				endIndex--;
			else
				break;
		}
		for (var i = start; i < endIndex; i++) {
			if ((list[i] % 256) & (bitNum % 256)) {
				swaps.push([[i, endIndex], [i, endIndex]]);
				var temp = list[i];
				list[i] = list[endIndex];
				list[endIndex] = temp;
				endIndex--;
				while (endIndex > i) {
					swaps.push([[endIndex], [-1, -1]]);
					if ((list[endIndex] % 256) & (bitNum % 256))
						endIndex--;
					else
						break;
				}
			}
			else
				swaps.push([[i, endIndex], [-1, -1]]);
		}
		binaryRadixMSBR(list, bitNum / 2, start, endIndex, swaps);
		binaryRadixMSBR(list, bitNum / 2, endIndex + 1, end, swaps);
	}
}












