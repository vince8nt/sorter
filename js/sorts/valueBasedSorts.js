function countingSort(arr) {
	var mods = [];
	var aux = []; // make aux array
	for (var i = 0; i < arr.length; i++)
		aux.push(0);
	
	for (var i = 0; i < arr.length; i++) {
		var value = getIndex(arr, i, mods);
		auxSetIndex(aux, value - 1, auxGetIndex(aux, value - 1, mods) + 1, mods);
	}
	for (var i = 1; i < aux.length; i++) {
		var sum = auxGetIndex(aux, i, mods) + auxGetIndex(aux, i - 1, mods);
		auxSetIndex(aux, i, sum, mods);
	}
	var index = 0;
	for (var i = 0; i < aux.length; i++) {
		while (index < auxGetIndex(aux, i, mods)) {
			setIndex(arr, index, i + 1, mods);
			index++;
		}
	}

	return mods;
}

function binaryRadixMSD(arr) {
	var mods = [];

	var maxValue = 0; // find the largest value in arr
	for (var i = 0; i < arr.length; i++) {
		if (valLessThan(arr, maxValue, i, mods))
			maxValue = getIndex(arr, i, mods);
	}
	// find the number represented by the most significant bit of the largest value
	var sigBit = Math.floor(Math.log(maxValue) / Math.log(2));
	var bitNum = Math.round(Math.pow(2, sigBit));

	binaryRadixMSDR(arr, bitNum, 0, arr.length - 1, mods);

	return mods;
}

function binaryRadixMSDR(arr, bitNum, start, end, mods) {
	if (bitNum >= 1 && start < end) {
		var j = end;
		while (j > start && (getIndex(arr, j, mods) ) & (bitNum )) {
			j--;
		}
		for (var i = start; i < j; i++) {
			if ((getIndex(arr, i, mods) ) & (bitNum )) {
				swap(arr, i, j, mods);
				j--;
				while (j > i && (getIndex(arr, j, mods) ) & (bitNum )) {
					j--;
				}
			}
		}
		binaryRadixMSDR(arr, bitNum / 2, start, j, mods);
		binaryRadixMSDR(arr, bitNum / 2, j + 1, end, mods);
	}
}






