function reverseArray(arr) {
	var mods = [];
	reverse(arr, 0, arr.length - 1, mods);
	return mods;
}

function halfReverseArray(arr) {
	var mods = [];
	reverse(arr, 0, Math.floor((arr.length - 1) / 2), mods);
	return mods;
}

function splitArray(arr) {
	var mods = [];
	var aux = []; // make aux array
	for (var i = 0; i < arr.length; i++)
		aux.push(0);
	var auxI = 0
	for (var i = 0; i < arr.length; i+= 2, auxI++)
		aux[auxI] = arr[i];
	for (var i = 1; i < arr.length; i+= 2, auxI++)
		aux[auxI] = arr[i];
	for (var i = 0; i < arr.length; i++)
		setIndex(arr, i, auxGetIndex(aux, i, mods), mods);
	return mods;
}

function bellCurveArray(arr) {
	var mods = [];
	for (var i = 0; i < arr.length; i++) {
		var x = (i + 0.5 - arr.length / 2) / arr.length * 4.5;
		var y = Math.pow(2.718, -1 * Math.pow(x, 2));
		y *= (arr.length - 1);
		setIndex(arr, i, Math.round(y), mods);
	}
	return mods;
}