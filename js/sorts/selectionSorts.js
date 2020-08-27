function selectionSort(arr) {
	var mods = [];

	for (var end = arr.length; end > 1; end--) {
		var maxIndex = 0;
		for (var i = 1; i < end; i++) {
			if (lessThan(arr, maxIndex, i, mods))
				maxIndex = i;
		}
		swap(arr, maxIndex, end - 1, mods);
	}

	return mods;
}

function minMaxSelectionSort(arr) {
	var mods = [];

	for (var front = 0, back = arr.length - 1; front < back; front++, back--) {
		var minIndex = front;
		var maxIndex = front;
		var min = getIndex(arr, minIndex, mods);
		var max = getIndex(arr, maxIndex, mods);
		for (var k = front; k <= back; k++) {
			if (valLessThan(arr, max, k, mods)) {
				maxIndex = k;
				max = getIndex(arr, maxIndex, mods);
			}
			else if (lessThanVal(arr, k, min, mods)) {
				minIndex = k;
				min = getIndex(arr, minIndex, mods);
			}
		}
		swap(arr, front, minIndex, mods);
		if (valEqualsIndex(arr, max, minIndex, mods))
			swap(arr, back, minIndex, mods);
		else
			swap(arr, back, maxIndex, mods);
	}

	return mods;
}

