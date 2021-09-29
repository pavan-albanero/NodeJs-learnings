/**The task is to create a generator function pseudoRandom(seed) 
 * that takes seed and creates the generator with this formula.
 * next = previous * 16807 % 2147483647 */
function* pseudoRandom(seed) {
    let previous=seed;
    while(true) {
    let next =previous * 16807 % 2147483647;
     previous=next;
     yield next;
    }
}
let generator = pseudoRandom(1);

console.log(generator.next().value);
console.log(generator.next().value);
console.log(generator.next().value);