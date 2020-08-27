function bubbleSort(arr) {
	var mods = [];

	for (var max = arr.length - 1; max > -1; max--) {
		var noSwaps = true;
		for (var i = 0; i < max; i++) {
			if (lessThan(arr, i + 1, i, mods)) {
				swap(arr, i, i + 1, mods);
				noSwaps = false;
			}
		}
		if (noSwaps) break; // terminate sorting because it is already finished
	}
	
	return mods;
}

function cocktailShaker(arr) {
	var mods = [];

	var min = 0;
	var max = arr.length - 1;
	while (min < max) {
		for (var i = min; i < max; i++) {
			if (lessThan(arr, i + 1, i, mods)) {
				swap(arr, i + 1, i, mods);
			}
		}
		max--;
		for (var i = max; i > min; i--) {
			if (lessThan(arr, i, i - 1, mods)) {
				swap(arr, i, i - 1, mods);
			}
		}
		min++;
	}

	return mods;
}

function optimizedCocktailShaker() { // bidirectional bubble sort
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