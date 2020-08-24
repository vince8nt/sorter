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
	draw(bold) { // bold is an array of each bolded index (in order from least to greatest)
		ctx.clearRect(this.left, this.top, this.width, this.height);
		var length = this.items.length;
		var boldIndex = 0;
		for (var i = 0; i < length; i++) {
			var x = this.left + i * this.width / length;
			var tall = this.items[i] / length * this.height;
			var y = this.top + this.height - tall;
			ctx.fillStyle = this.border;
			ctx.fillRect(x, y, this.width / length, tall);
			if (i === bold[boldIndex]) {
				ctx.fillStyle = "#FF0000";
				if (boldIndex < bold.length - 1)
					boldIndex++;
			}
			else {
				ctx.fillStyle = this.color;
			}
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
	sort() {
		var length = this.items.length;
		this.items = [];
		for (var i = 0; i < length; i++) {
			this.items.push(i + 1);
		}
	}
	makeDups() {
		for (var i = 1; i < this.items.length; i++) {
			if (Math.random() < 0.5) {
				this.items[i]--;
			}
		}
	}
	getItems() {
		return this.items;
	}
}

// make visuals -------------------------------------------------------------------

myGraph = new Graph(10, 10, 980, 440);
myGraph.draw([]);

sortType = new Selector("#9090FF", "#707070", "#FF0000");
sortType.addButton(10, 480, 100, 50, "Bubble Sort");
sortType.addButton(10, 540, 100, 50, "Insertion Sort");
sortType.addButton(120, 480, 100, 50, "Selection Sort");
sortType.addButton(120, 540, 100, 50, "Cocktail Shaker");
sortType.addButton(230, 480, 100, 50, "Quicksort");
sortType.addButton(230, 540, 100, 50, "Counting Sort");
sortType.addButton(340, 480, 100, 50, "Binary Radix MSB");
sortType.addButton(340, 540, 100, 50, "Merge Sort");
sortType.addButton(450, 480, 100, 50, "Heap Sort");
sortType.addButton(450, 540, 100, 50, "In-Place Merge");

shuffleButton = new Button(560, 480, 110, 110, "Shuffle", "#20C010", "#000000");
shuffleButton.draw();

dupButton = new Button(705, 480, 100, 50, "duplicates: off", "#C01010", "#000000");
dupButton.draw();

addButton = new Button(780, 540, 50, 50, "+", "#20C010", "#000000");
sizeDisp = new Button(730, 540, 50, 50, 8, "#A0A0A0", "#A0A0A0");
subButton = new Button(680, 540, 50, 50, "-", "#C01010", "#000000");
addButton.draw();
sizeDisp.draw();
subButton.draw();

goButton = new Button(840, 480, 150, 110, "Go", "#20C010", "#000000");
goButton.draw();

var sorting = false;
var duplicates = false;

// program starts here ------------------------------------------------------------

function doAdd() {
	if (! myGraph.canSubtract()) { // visually enable sub button
		subButton.setBorder("#000000");
		subButton.setColor("#C01010");
		subButton.draw();
	}
	if (myGraph.addCol()) {
		sizeDisp.setLabel(sizeDisp.getLabel() + 1);
		sizeDisp.draw();
		if (duplicates)
			myGraph.makeDups();
		myGraph.draw([]);
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
		sizeDisp.setLabel(sizeDisp.getLabel() - 1);
		sizeDisp.draw();
		if (duplicates)
			myGraph.makeDups();
		myGraph.draw([]);
		if (! myGraph.canSubtract()) { // visually disable sub button
			subButton.setBorder("#707070");
			subButton.setColor("#909090");
			subButton.draw();
		}
	}
}

function clickDups() {
	if (duplicates) {
		duplicates = false;
		dupButton.setColor("#C01010");
		dupButton.setLabel("duplicates: off");
		myGraph.sort();
		dupButton.draw();
		myGraph.draw([]);
    }
    else {
    	duplicates = true;
    	dupButton.setColor("#20C010");
		dupButton.setLabel("duplicates: on");
		myGraph.sort();
		myGraph.makeDups();
		dupButton.draw();
		myGraph.draw([]);
    }
}

c.addEventListener('click', function(event) {
	if (sorting) return; // does not allow modifications during the sorting process

    var screenX = event.pageX - c.offsetLeft - c.clientLeft;
    var screenY = event.pageY - c.offsetTop - c.clientTop;
    
    if (sortType.clicked(screenX, screenY)) { // selector buttons
    	// nothing to be done
    }
    else if (goButton.clicked(screenX, screenY)) { // go button
    	
    	// alert("Go pressed. Using " + sortType.getSelected() + " sort.");
    	sorting = true;
    	goButton.setBorder("#707070");
		goButton.setColor("#909090");
		goButton.draw();
		if (sortType.getSelected() === "Bubble Sort")
    		doSwaps(bubbleSort());
    	else if (sortType.getSelected() === "Cocktail Shaker")
    		doSwaps(cocktailShaker());
    	else if (sortType.getSelected() === "Insertion Sort")
    		doSwaps(insertionSort());
    	else if (sortType.getSelected() === "Merge Sort")
    		doMods(mergeSort(false));
    	else if (sortType.getSelected() === "In-Place Merge")
    		doSwaps(mergeSort(true));
    	else if (sortType.getSelected() === "Quicksort")
    		doSwaps(quicksort());
    	else if (sortType.getSelected() === "Counting Sort")
    		doMods(countingSort());
    	else if (sortType.getSelected() === "Binary Radix MSB")
    		doSwaps(binaryRadixMSB());
    	else if (sortType.getSelected() === "Selection Sort")
    		doSwaps(selectionSort());
    	else if (sortType.getSelected() === "Heap Sort")
    		doSwaps(heapSort());
    	else {
    		goButton.setBorder("#000000");
			goButton.setColor("#20C010");
			goButton.draw();
			alert("Invalid sorting algorithm.");
			sorting = false;
    	}
    }
    else if (shuffleButton.clicked(screenX, screenY)) { // shuffle button
    	myGraph.shuffle();
    	myGraph.draw([]);
    }
    else if (addButton.clicked(screenX, screenY)) { // add button
    	doAdd();
    }
    else if (subButton.clicked(screenX, screenY)) { // subtract button
    	doSub();
    }
    else if (dupButton.clicked(screenX, screenY)) { // duplicates button
    	clickDups();
    }

}, false);

function doSwaps(swaps) {
	var g = myGraph.getItems();
	var delay = 1500 / g.length;
	setTimeout(swap, 100, swaps, 0, delay, 0);
}

function swap(swaps, i, delay, swapsNum) {
	if (i < swaps.length) {
		var bold = swaps[i][0],
			first = swaps[i][1][0],
			second = swaps[i][1][1];
		if (first !== -1 && second !== -1) {
			var g = myGraph.getItems();
			var temp = g[first];
			g[first] = g[second];
			g[second] = temp;
			swapsNum++;
		}
		myGraph.draw(bold);
		setTimeout(swap, delay, swaps, i + 1, delay, swapsNum);
	}
	else {
		setTimeout(endSwaps, delay, swaps.length, swapsNum);
	}
}

function endSwaps(c, s) {
	goButton.setBorder("#000000");
	goButton.setColor("#20C010");
	goButton.draw();
	myGraph.draw([]);
	alert("Array sorted: " + c + " comparisons, " + s + " swaps.");
	sorting = false;
}

function doMods(mods) {
	var g = myGraph.getItems();
	var delay = 1500 / g.length;
	setTimeout(modify, 100, mods, 0, delay, 0);
}

function modify(mods, i, delay, modsNum) {
	if (i < mods.length) {
		var bold = mods[i][0],
			index = mods[i][1],
			value = mods[i][2];
		if (index !== -1) {
			myGraph.getItems()[index] = value;
			modsNum++;
		}
		myGraph.draw(bold);
		setTimeout(modify, delay, mods, i + 1, delay, modsNum);
	}
	else {
		setTimeout(endMods, delay, modsNum);
	}
}

function endMods(modsNum) {
	goButton.setBorder("#000000");
	goButton.setColor("#20C010");
	goButton.draw();
	myGraph.draw([]);
	alert("Array sorted: " + modsNum + " modifications.");
	sorting = false;
}


function bubbleSort() {
	var swaps = []; // [[[highlights], [swaps]], etc]
	var graphCopy = [...myGraph.getItems()];

	for (var max = graphCopy.length - 1; max > -1; max--) {
		var noSwaps = true;
		for (var i = 0; i < max; i++) {
			if (parseInt(graphCopy[i]) > parseInt(graphCopy[i + 1])) { // idk why parseInt is required
				swaps.push([[i, i + 1], [i, i + 1]]);
				var temp = graphCopy[i];
				graphCopy[i] = graphCopy[i + 1];
				graphCopy[i + 1] = temp;
				noSwaps = false;
			}
			else {
				swaps.push([[i, i + 1], [-1, -1]]);
			}
		}
		if (noSwaps) return swaps; // terminate sorting because it is already finished
	}
	return swaps;
}

function cocktailShaker() { // bidirectional bubble sort
	var swaps = []; // [[[highlights], [swaps]], etc]
	var graphCopy = [...myGraph.getItems()];

	const end = graphCopy.length - 1;
	var min = 0;
	var max = end;
	var lastSwap;
	while (min < max) {
		lastSwap = -1;
		for (var i = min; i < end; i++) {
			if (parseInt(graphCopy[i]) > parseInt(graphCopy[i + 1])) {
				swaps.push([[i, i + 1], [i, i + 1]]);
				var temp = graphCopy[i];
				graphCopy[i] = graphCopy[i + 1];
				graphCopy[i + 1] = temp;
				lastSwap = i;
			}
			else {
				swaps.push([[i, i + 1], [-1, -1]]);
				if (i > max - 2)
					break;
			}
			
		}
		// console.log("end bubble right: max = " + lastSwap);
		max = lastSwap;


		lastSwap = end + 1;
		for (var i = max; i > 0; i--) {
			if (parseInt(graphCopy[i - 1]) > parseInt(graphCopy[i])) {
				swaps.push([[i - 1, i], [i - 1, i]]);
				var temp = graphCopy[i - 1];
				graphCopy[i - 1] = graphCopy[i];
				graphCopy[i] = temp;
				lastSwap = i;
			}
			else {
				swaps.push([[i - 1, i], [-1, -1]]);
				if (i < min + 2)
					break;
			}
		}
		// console.log("end bubble left: min = " + lastSwap);
		min = lastSwap;
	}
	return swaps;
}

function insertionSort() {
	var swaps = []; // [[[highlights], [swaps]], etc]
	var graphCopy = [...myGraph.getItems()];

	for (var start = 1; start < graphCopy.length; start++) { // array length is >= 2
		for (var i = start; i > 0; i--) {
			if (parseInt(graphCopy[i]) >= parseInt(graphCopy[i - 1])) {
				swaps.push([[i - 1, i], [-1, -1]]);
				break;
			}
			swaps.push([[i - 1, i], [i - 1, i]]);
			var temp = graphCopy[i];
			graphCopy[i] = graphCopy[i - 1];
			graphCopy[i - 1] = temp;
		}
	}
	return swaps;
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

function quicksort() {
	var swaps = []; // [[[highlights], [swaps]], etc]
	var graphCopy = [...myGraph.getItems()];
	splitQuick(graphCopy, 0, graphCopy.length - 1, swaps);
	return swaps;
}

function splitQuick(list, begin, end, swaps) {
	if (begin < end) {
		var p = partition(list, begin, end, swaps);
		// console.log("Quicksort: partition is " + p);
		splitQuick(list, begin, p - 1, swaps);
		splitQuick(list, p + 1, end, swaps);
	}
}

function partition(list, begin, end, swaps) {
	var pivot = parseInt(list[end]);
	var i = begin - 1;
	
	for (var j = begin; j < end; j++) {
		if (parseInt(list[j]) < pivot) {
			i++;
			swaps.push([[i, j], [i, j]]);
			var temp = list[i];
			list[i] = list[j];
			list[j] = temp;
		}
		else swaps.push([[j], [-1, -1]]);
	}
	swaps.push([[i + 1, end], [i + 1, end]]);
	var temp = list[i + 1];
	list[i + 1] = list[end];
	list[end] = temp;
	return i + 1;
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

function selectionSort() {
	var swaps = []; // [[[highlights], [swaps]], etc]
	var graphCopy = [...myGraph.getItems()];

	for (var end = graphCopy.length - 1; end > 0; end--) {
		var maxVal = -1,
			maxInd = -1;
		for (var i = 0; i <= end; i++) {
			swaps.push([[i], [-1, -1]]);
			if (parseInt(graphCopy[i]) > maxVal) {
				maxVal = parseInt(graphCopy[i]);
				maxInd = i;
			}
		}
		swaps.push([[maxInd, end], [maxInd, end]]);
		var temp = graphCopy[maxInd];
		graphCopy[maxInd] = graphCopy[end];
		graphCopy[end] = temp;
	}
	return swaps;
}

var heapLength;

function heapSort() {
	var swaps = []; // [[[highlights], [swaps]], etc]
	var graphCopy = [...myGraph.getItems()];

	heapLength = graphCopy.length;

	for (var i = Math.floor(heapLength / 2); i >= 0; i--) {
		heapRoot(graphCopy, i, swaps);
	}
	for (var i = graphCopy.length - 1; i > 0; i--) {
		swaps.push([[0, i], [0, i]]);
		var temp = graphCopy[0];
		graphCopy[0] = graphCopy[i];
		graphCopy[i] = temp;
		heapLength--;
		heapRoot(graphCopy, 0, swaps);
	}
	return swaps;
}

function heapRoot(list, index, swaps) {
	var left = 2 * index + 1;
	var right = 2 * index + 2;
	var max = index;

	if (left < heapLength) {
		swaps.push([[max, left], [-1, -1]]);
		if (parseInt(list[left]) > parseInt(list[max]))
			max = left;
	}
	if (right < heapLength) {
		swaps.push([[max, right], [-1, -1]]);
		if (parseInt(list[right]) > parseInt(list[max]))
			max = right;
	}
	if (max != index) {
		swaps.push([[max, index], [max, index]]);
		var temp = list[max];
		list[max] = list[index];
		list[index] = temp;
		heapRoot(list, max, swaps);
	}
}








