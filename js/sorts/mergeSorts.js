function mergeSort(arr) {
	var mods = [];

	var aux = []; // make aux array
	for (var i = 0; i < arr.length; i++)
		aux.push(0);
	splitMerge(arr, 0, arr.length - 1, mods, aux);

	return mods;
}

function splitMerge(arr, begin, end, mods, aux) {
	if (begin < end) {
		var middle = Math.floor((begin + end) / 2);
		splitMerge(arr, begin, middle, mods, aux);
		splitMerge(arr, middle + 1, end, mods, aux);
		merge(arr, begin, middle, end, mods, aux);
	}
}

function merge(arr, begin, middle, end, mods, aux) {
	var c1 = begin;
	var c2 = middle + 1;
	var auxIndex = begin;
	while (c1 <= middle && c2 <= end) {
		if (lessThan(arr, c1, c2, mods))
			auxSetIndex(aux, auxIndex++, getIndex(arr, c1++, mods), mods);
		else
			auxSetIndex(aux, auxIndex++, getIndex(arr, c2++, mods), mods);
	}
	while (c1 <= middle)
		auxSetIndex(aux, auxIndex++, getIndex(arr, c1++, mods), mods);
	while (c2 <= end)
		auxSetIndex(aux, auxIndex++, getIndex(arr, c2++, mods), mods);
	for (var i = begin; i < auxIndex; i++)
		setIndex(arr, i, auxGetIndex(aux, i, mods), mods)
}