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