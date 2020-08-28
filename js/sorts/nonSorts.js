function reverseArray(arr) {
	var mods = [];
	reverse(arr, 0, arr.length - 1, mods);
	return mods;
}