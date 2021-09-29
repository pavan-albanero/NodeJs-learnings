/**
 * Let’s try 5 array operations.

Create an array styles with items “Jazz” and “Blues”.
Append “Rock-n-Roll” to the end.
Replace the value in the middle by “Classics”. Your code for finding the middle value should work for any arrays with odd length.
Strip off the first value of the array and show it.
Prepend Rap and Reggae to the array.
The array in the process:

Jazz, Blues
Jazz, Blues, Rock-n-Roll
Jazz, Classics, Rock-n-Roll
Classics, Rock-n-Roll
Rap, Reggae, Classics, Rock-n-Roll
 */
let styles=['Jazz','Blues'];
styles.push('Rock-n-Roll');
let middle=Math.round(styles.length/2);
styles[middle]="Classics";
styles.shift();
styles.unshift('Rap','Reggae');