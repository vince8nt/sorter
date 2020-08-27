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
	swap(arr, Math.floor((end + begin) / 2), end, mods);
	var p = end;
	while (begin < end) {
		if (lessThan(arr, p, begin, mods)) {
			if (lessThan(arr, end, p, mods)) {
				swap(arr, begin, end, mods);
			}
			else
				end--;
		}
		else
			begin++;
	}
	if (lessThan(arr, end, p, mods)) {
		swap(arr, p, end + 1, mods);
		return end + 1;
	}
	else {
		swap(arr, p, end, mods);
		return end;
	}
}













