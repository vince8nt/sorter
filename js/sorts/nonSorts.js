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
		setIndex(arr, i, aux[i], mods);
	return mods;
}

function interlaceArray(arr) {
	var mods = [];
	var aux = []; // make aux array
	for (var i = 0; i < arr.length; i++)
		aux.push(0);
	var arrI = 0
	for (var i = 0; i < aux.length; i+= 2, arrI++)
		aux[i] = arr[arrI];
	for (var i = 1; i < aux.length; i+= 2, arrI++)
		aux[i] = arr[arrI];
	for (var i = 0; i < arr.length; i++)
		setIndex(arr, i, aux[i], mods);
	return mods;
}

function heapifyArray(arr) {
	var mods = [];
	buildMaxHeap(arr, 0, arr.length - 1, mods);
	return mods;
}

function shuffleArray(arr) {
	var mods = [];
	for (var i = arr.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		swap(arr, i, j, mods);
	}
	return mods;
}

function badShuffleArray(arr) {
	var mods = [];
	for (var i = arr.length - 1; i > 0; i--) {
		if (Math.random() < 0.2) {
			const j = Math.floor(Math.random() * arr.length);
			swap(arr, i, j, mods);
		}
	}
	return mods;
}













