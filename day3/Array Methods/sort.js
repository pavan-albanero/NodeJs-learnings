/**
sort it in decreasing
let arr = [5, 2, 1, -10, 8];

// ... your code to sort it in decreasing order

alert( arr ); // 8, 5, 2, 1, -10 */

let arr = [5, 2, 1, -10, 8];

arr.sort(( a, b ) => b-a);

alert( arr ); // 8, 5, 2, 1, -10