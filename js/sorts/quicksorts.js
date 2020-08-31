function quicksort(arr) {
	var mods = [];
	splitQuick(arr, 0, arr.length - 1, mods);
	return mods;
}

function splitQuick(arr, begin, end, mods) {
	if (begin < end) {
		var p = partition(arr, begin, end, mods);
		splitQuick(arr, begin, p - 1, mods);
		splitQuick(arr, p + 1, end, mods);
	}
}

function partition(arr, begin, end, mods) {
	var pivot = getIndex(arr, end, mods);
	var i = begin - 1;
	
	for (var j = begin; j < end; j++) {
		if (lessThanVal(arr, j, pivot, mods)) {
			i++;
			swap(arr, i, j, mods);
		}
	}
	swap(arr, i + 1, end, mods);
	return i + 1;
}

function quicksortConv(arr) {
	var mods = [];
	splitQuickConv(arr, 0, arr.length - 1, mods);
	return mods;
}

function splitQuickConv(arr, begin, end, mods) {
	if (begin < end) {
		var p = partitionConv(arr, begin, end, mods);
		splitQuickConv(arr, begin, p - 1, mods);
		splitQuickConv(arr, p + 1, end, mods);
	}
}

function partitionConv(arr, begin, end, mods) {
	var pivot = getIndex(arr, end, mods);
	var i = begin;
	var j = end - 1;
	while (true) {
		while (i < j && !valLessThan(arr, pivot, i, mods))
			i++
		while (i < j && !lessThanVal(arr, j, pivot, mods))
			j--;
		if (i >= j) {
			if (i == j && lessThanVal(arr, i, pivot, mods))
				i++
			swap(arr, i, end, mods);
			return i;
		}
		swap(arr, i++, j--, mods);
	}
}













