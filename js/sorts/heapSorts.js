


function maxHeapSort(arr) {
	var mods = [];

	buildMaxHeap(arr, 0, arr.length - 1, mods);
	for (var i = arr.length - 1; i > 0; i--) {
		swap(arr, 0, i, mods);
		maxHeapify(arr, 0, i, 0, mods);
	}
	
	return mods;
}


function minHeapSort(arr) {
	var mods = [];
	buildMinHeap(arr, 0, arr.length - 1, mods);
	for (var i = arr.length - 1; i > 0; i--) {
		swap(arr, 0, i, mods);
		minHeapify(arr, 0, i, 0, mods);
	}
	// reverse(arr, 0, arr.length - 1, mods);
	return mods;
}

function medianHeapSort(arr) {
	var mods = [];
	medianHeapSort2R(arr, 0, arr.length - 1, mods);
	return mods;
}

function medianHeapSortR(arr, begin, end, mods) {
	if (end > begin) {
		// split sub-array in half and make each side a heap
		var heapSize = Math.floor((end - begin + 1) / 2);
		// console.log(heapSize);
		var maxEnd = begin + heapSize - 1;
		var minBegin = end - heapSize + 1;

		for (var i = 0; i < heapSize; i++) {
			minHeapify(arr, minBegin, heapSize, end - i, mods);
			backMaxHeapify(arr, maxEnd, heapSize, begin + i, mods);
			while (lessThan(arr, end - i, begin + i, mods)) {
				swap(arr, end - i, begin + i, mods);
				minHeapify(arr, minBegin, heapSize, end - i, mods);
				backMaxHeapify(arr, maxEnd, heapSize, begin + i, mods);
			}
		}
		
		if (minBegin - maxEnd == 2) {
			if (lessThan(arr, maxEnd + 1, maxEnd, mods)) {
				swap(arr, maxEnd, maxEnd + 1, mods);
				backMaxHeapify(arr, maxEnd, heapSize, maxEnd, mods);
			}
			else if (lessThan(arr, minBegin, minBegin - 1, mods)) {
				swap(arr, minBegin, minBegin - 1, mods);
				minHeapify(arr, minBegin, heapSize, minBegin, mods);
			}
			medianHeapSortR(arr, begin, maxEnd, mods);
			medianHeapSortR(arr, minBegin, end, mods);
		}
		else {
			medianHeapSortR(arr, begin, maxEnd - 1, mods);
			medianHeapSortR(arr, minBegin + 1, end, mods);
		}
	}
}




// creates a min heap on the sub-array of arr
function buildMinHeap(arr, begin, end, mods) {
	var n = end - begin + 1;
	for (var i = Math.floor(n / 2) - 1 + begin; i >= begin; i--)
		minHeapify(arr, begin, n, i, mods);
}

// heapify the sub-tree at root of the sub-array
function minHeapify(arr, start, size, root, mods) {
	var smallest = root;
	var l = 2 * root - start + 1; // left child of root
	var r = 2 * root - start + 2; // right child of root

	// set smallest to the smallest of the root and its 2 children (l and r)
	if (l < start + size && lessThan(arr, l, smallest, mods))
		smallest = l;
	if (r < start + size && lessThan(arr, r, smallest, mods))
		smallest = r;

	if (smallest != root) {
		// swap arr[root] and arr[smallest]
		swap(arr, root, smallest, mods);
		// heapify the subtree
		minHeapify(arr, start, size, smallest, mods);
	}
}

// creates a backwards max heap on the sub-array of arr
function buildBackMaxHeap(arr, begin, end, mods) {
	var n = end - begin + 1;
	for (var i = Math.floor((n + 1) / 2) + begin; i <= end; i++)
		backMaxHeapify(arr, end, n, i, mods);
}

// heapify the sub-tree at root of the sub-array
function backMaxHeapify(arr, end, size, root, mods) {
	var largest = root;
	var l = 2 * root - end - 1; // left child of root
	var r = 2 * root - end - 2; // right child of root

	// set largest to the largest of the root and its 2 children (l and r)
	if (l > end - size && lessThan(arr, largest, l, mods))
		largest = l;
	if (r > end - size && lessThan(arr, largest, r, mods))
		largest = r;

	if (largest != root) {
		// swap arr[root] and arr[largest]
		swap(arr, root, largest, mods);
		// heapify the subtree
		backMaxHeapify(arr, end, size, largest, mods);
	}
}
