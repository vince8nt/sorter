function swap(arr, index1, index2, mods) { // 2 reads, 2 writes
	const temp = getIndex(arr, index1, mods);
	setIndex(arr, index1, getIndex(arr, index2, mods), mods);
	setIndex(arr, index2, temp, mods);
}

function lessThan(arr, index1, index2, mods) { // 1 comparison, 2 reads
	if (index1 < index2)
		mods.push(["compare", index1, index2]);
	else
		mods.push(["compare", index2, index1]);
	return getIndex(arr, index1, mods) < getIndex(arr, index2, mods);
}

function lessThanVal(arr, index, value, mods) { // 1 comparison, 1 read
	mods.push(["compare", index, index]);
	return getIndex(arr, index, mods) < value;
}

function valLessThan(arr, value, index, mods) { // 1 comparison, 1 read
	mods.push(["compare", index, index]);
	return value < getIndex(arr, index, mods);
}

function valLessThanVal(arr, value1, value2, mods) { // 1 comparison
	mods.push(["compare", index, index]);
	return value1 < value2;
}

function setIndex(arr, index, value, mods) { // 1 write
	mods.push(["write", index, value]);
	arr[index] = value;
}

function getIndex(arr, index, mods) { // 1 read
	mods.push(["read", index]);
	return arr[index];
}