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

