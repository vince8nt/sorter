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