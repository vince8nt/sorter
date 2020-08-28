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

// change this
function optimizedCocktailShaker(arr) {
	var mods = [];

	const end = arr.length - 1;
	var min = 0;
	var max = end;
	var lastSwap;
	while (min < max) {
		lastSwap = -1;
		for (var i = min; i < end; i++) {
			if (lessThan(arr, i + 1, i, mods)) {
				swap(arr, i + 1, i, mods);
				lastSwap = i;
			}
			else if (i > max - 2)
				break;
		}
		max = lastSwap;

		lastSwap = end + 1;
		for (var i = max; i > 0; i--) {
			if (lessThan(arr, i, i - 1, mods)) {
				swap(arr, i, i - 1, mods);
				lastSwap = i;
			}
			else if (i < min + 2)
				break;
		}
		min = lastSwap;
	}
	return mods;
}

function gnomeSort(arr) {
	var mods = [];

	for (var i = 0; i < arr.length;) {
		if (i > 0 && lessThan(arr, i, i - 1, mods))
			swap(arr, i, --i, mods);
		else
			i++;
	}

	return mods;
}

function optimizedGnomeSort(arr) {
	var mods = [];

	for (var i = 1; i < arr.length; i++) {
		for (var j = i; j > 0 && lessThan(arr, j, j - 1, mods); j--)
			swap(arr, j, j - 1, mods);
	}

	return mods;
}

function binaryOptimizedGnomeSort(arr) {
	var mods = [];

	for (var i = 1; i < arr.length; i++) {
		var min = 0;
		var max = i;
		var insertIndex = Math.floor((min + max) / 2);
		const insertValue = getIndex(arr, i, mods);
		while(min < max) { // find insertIndex in O(log n)
			if (lessThan(arr, i, insertIndex, mods)) {
				max = insertIndex;
			}
			else if (lessThan(arr, insertIndex, i, mods)) {
				min = insertIndex + 1;
			}
			else
				break;
			insertIndex = Math.floor((min + max) / 2);
		}
		for (var j = i; j > insertIndex; j--)
			swap(arr, j, j - 1, mods);
	}

	return mods;
}







