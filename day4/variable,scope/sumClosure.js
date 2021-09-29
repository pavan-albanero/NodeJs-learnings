/**Write function sum that works like this: sum(a)(b) = a+b.

Yes, exactly this way, using double parentheses (not a mistype).

For instance:

sum(1)(2) = 3
sum(5)(-1) = 4 */

function sum(a) {
    return function(b) { 
        return a+b;
    }
}
console.log(sum(1)(2));
console.log(sum(1345333)(-5865));
console.log(sum(-1664455)(-27544));
