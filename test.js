// function quickSort(arr, start, end) {
//     if(start < end) {
//         let pivot = partition(arr, start, end);

//         quickSort(arr, start, pivot-1);
//         quickSort(arr, pivot+1, end);
//     }
//     function partition(arr, start, end) {
//         let pivot = arr[end];
//         let i = (start-1);
//         for(let j = start; j <= end-1; j++) {
//             if(arr[j] < pivot) {
//                 i++;
//                 swap(arr, i, j);
//             }
//         }
//         swap(arr, i + 1, end);
//         return (i+1);
//     }
// }