/**Write the function sumInput() that:

Asks the user for values using prompt and stores the values in the array.
Finishes asking when the user enters a non-numeric value, an empty string, or presses “Cancel”.
Calculates and returns the sum of array items.
P.S. A zero 0 is a valid number, please don’t stop the input on zero. */
function sumInput() {
 let num;
 let sum = 0;
 let array = [];
 while (true){
  num = +prompt('read number?', );
  if (num === "" || num === null || !isFinite(num)) break;
  array.push(+num);
 }
 for(let i = 0; i < array.length; i++) {
    sum=sum+array[i];
 }
 return sum;
 }
 alert(sumInput());