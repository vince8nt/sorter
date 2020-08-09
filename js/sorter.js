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
	getItems() {
		return this.items;
	}
}

// make visuals -------------------------------------------------------------------

sortType = new Selector("#9090FF", "#707070", "#FF0000");
sortType.addButton(10, 480, 100, 50, "Bubble Sort");
sortType.addButton(10, 540, 100, 50, "Insertion Sort");
sortType.addButton(120, 480, 100, 50, "Merge Sort");
sortType.addButton(120, 540, 100, 50, "Cocktail Shaker");
sortType.addButton(230, 480, 100, 50, "Quicksort");
sortType.addButton(230, 540, 100, 50, "Counting Sort");
sortType.addButton(340, 480, 100, 50, "Custom Sort");
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
myGraph.draw([]);

var sorting = false;

// program starts here ------------------------------------------------------------

function doAdd() {
	if (! myGraph.canSubtract()) { // visually enable sub button
		subButton.setBorder("#000000");
		subButton.setColor("#C01010");
		subButton.draw();
	}
	if (myGraph.addCol()) {
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
		myGraph.draw([]);
		if (! myGraph.canSubtract()) { // visually disable sub button
			subButton.setBorder("#707070");
			subButton.setColor("#909090");
			subButton.draw();
		}
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
    		doMods(mergeSort());
    	else if (sortType.getSelected() === "Quicksort")
    		doSwaps(quicksort());
    	else if (sortType.getSelected() === "Counting Sort")
    		doMods(countingSort());
    	else if (sortType.getSelected() === "Custom Sort")
    		doMods(customSort());
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

}, false);

function doSwaps(swaps) {
	var swapsNum = 0;
	for (var i = 0; i < swaps.length; i++) {
		setTimeout(swap, 100 * (i), swaps[i][0], swaps[i][1][0], swaps[i][1][1]);
		if (swaps[i][1][0] !== -1) swapsNum++;
	}
	setTimeout(endSwaps, 100 * swaps.length, swaps.length, swapsNum);
}

function swap(bold, first, second) {
	if (first !== -1 && second !== -1) {
		var g = myGraph.getItems();
		var temp = g[first];
		g[first] = g[second];
		g[second] = temp;
	}
	myGraph.draw(bold);
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
	var modsNum = 0;
	for (var i = 0; i < mods.length; i++) {
		setTimeout(modify, 100 * (i), mods[i][0], mods[i][1], mods[i][2]);
		if (mods[i][1] !== -1) modsNum++;
	}
	setTimeout(endMods, 100 * mods.length, modsNum);
}

function modify(bold, index, value) {
	if (index !== -1) {
		myGraph.getItems()[index] = value;
	}
	myGraph.draw(bold);
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

	var min = 0;
	var max = graphCopy.length - 1;
	while (min < max) {
		var noSwaps = true;
		for (var i = min; i < max; i++) {
			if (parseInt(graphCopy[i]) > parseInt(graphCopy[i + 1])) {
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
		if (noSwaps) return swaps;
		noSwaps = true;
		max--;
		for (var i = max; i > min; i--) {
			if (parseInt(graphCopy[i - 1]) > parseInt(graphCopy[i])) {
				swaps.push([[i - 1, i], [i - 1, i]]);
				var temp = graphCopy[i - 1];
				graphCopy[i - 1] = graphCopy[i];
				graphCopy[i] = temp;
				noSwaps = false;
			}
			else {
				swaps.push([[i - 1, i], [-1, -1]]);
			}
		}
		if (noSwaps) return swaps;
		min++;
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

function mergeSort() {
	var mods = []; // [[[highlights], index, value], etc]
	var graphCopy = [...myGraph.getItems()];
	splitMerge(graphCopy, 0, graphCopy.length - 1, mods);
	return mods;
}

function splitMerge(list, begin, end, mods) {
	if (begin < end) {
		var middle = Math.floor((begin + end) / 2);
		splitMerge(list, begin, middle, mods);
		splitMerge(list, middle + 1, end, mods);
		merge(list, begin, middle, end, mods);
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
		splitQuick(list, begin, p - 1, swaps);
		splitQuick(list, p + 1, end, swaps);
	}
}

function partition(list, begin, end, swaps) {
	var pivotIndex = Math.floor((begin + end) / 2);
	var pivot = parseInt(list[pivotIndex]);
	var i = begin;
	var j = end;
	while (true) {
		while (true) {
			if (pivotIndex < i) swaps.push([[pivotIndex, i], [-1, -1]]);
			else swaps.push([[i, pivotIndex], [-1, -1]]);
			if (parseInt(list[i]) < pivot)
				i++;
			else
				break;
		}
		while (true) {
			if (pivotIndex < j) swaps.push([[pivotIndex, j], [-1, -1]]);
			else swaps.push([[j, pivotIndex], [-1, -1]]);
			if (parseInt(list[j]) > pivot)
				j--;
			else
				break;
		}
		if (i >= j) {
			swaps.push([[j, i], [-1, -1]]);
			return j;
		}
		swaps.push([[i, j], [i, j]]);
		var temp = list[i];
		list[i] = list[j];
		list[j] = temp;
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

function customSort() {
	var mods = []; // [[[highlights], index, value], etc]
	var graphCopy = [...myGraph.getItems()];

	var depth = Math.ceil(Math.log(graphCopy.length) / Math.log(2));
	customSortR(graphCopy, depth, 0, graphCopy.length - 1, mods);
	return mods;
}

function customSortR(list, depth, start, end, mods) {
	if (depth >= 0) {
		var middle = -1;
		if (true) { // to save memory
			var bit = Math.round(Math.pow(2, depth));
			bit0 = [];
			bit1 = [];
			for (var i = start; i <= end; i++) {
				if(parseInt(list[i]) & bit == 0) {
					bit0.push(parseInt(list[i]));
				}
				else {
					bit1.push(parseInt(list[i]));
				}
			}
			var index = start;
			for (var i = 0; i < bit0.length; i++) {
				mods.push([[index], index, bit0[i]]);
				list[index++] = bit0[i];
			}
			middle = index;
			for (var i = 0; i < bit1.length; i++) {
				mods.push([[index], index, bit1[i]]);
				list[index++] = bit1[i];
			}
		}
		customSortR(list, depth - 1, start, middle, mods);
		customSortR(list, depth - 1, middle + 1, end, mods);
	}
}














