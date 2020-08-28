function binaryInsertionSort(arr) {
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
		for (var j = i; j > insertIndex; j--) {
			setIndex(arr, j, getIndex(arr, j - 1, mods), mods);
		}
		setIndex(arr, insertIndex, insertValue, mods);
	}
	return mods;
}

function insertionSort(arr) {
	var mods = [];

	for (var i = 1; i < arr.length; i++) {
		const insertValue = getIndex(arr, i, mods);
		var insertIndex = i;
		while (insertIndex > 0) {
			var temp = getIndex(arr, insertIndex - 1, mods);
			if (valLessThan(arr, insertValue, insertIndex - 1, mods)) {
				setIndex(arr, insertIndex, getIndex(arr, insertIndex - 1, mods), mods);
				insertIndex--;
			}
			else
				break;
		}
		setIndex(arr, insertIndex, insertValue, mods);
	}
	return mods;
}







