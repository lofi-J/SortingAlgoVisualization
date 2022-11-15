// 'use strict';

// let array = [4,2,1,3,5,3,7,9,1];
// /**
//  *  init binary tree
//  *          1
//  *        /   \
//  *       2     3
//  *      / \   / \
//  *     4   5 3   7
//  *    /\ 
//  *   9 1 
//  */

// function heapSort(array) {
//     const len = array.length;
//     let lastIndex = len-1;
//     //build heap
//     for(let i=Math.floor(len/2)-1; i>=0; i--) {
//         heapify(array, len, i);
//     }
//     //sort
//     while(lastIndex > 0) {
//         swap(array, 0, lastIndex);
//         heapify(array, lastIndex, 0);
//         lastIndex--;
//     }
// }
// function heapify(array, range, index) {
//     let largest = index;
//     // l: leftChild, r: rightChild
//     const l = (index * 2) + 1;
//     const r = (index * 2) + 2;

//     if(l < range && array[largest] < array[l]) { largest = l; }
//     if(r < range && array[largest] < array[r]) { largest = r; }

//     if(largest != index) {
//         swap(array, index, largest);
//         //again heapify
//         heapify(array, range, largest);
//     }
// }
// function swap(arr, a, b) {
//     const temp = arr[a];
//     arr[a] = arr[b];
//     arr[b] = temp;
// }
// let te = [5,3,2,1,4];
// heapSort(te);
// console.log(te);