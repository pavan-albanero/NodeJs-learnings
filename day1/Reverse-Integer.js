/* 
Reverse Integer

Given a signed 32-bit integer x, return x with its digits reversed.
 If reversing x causes the value to go outside the signed 32-bit integer range [-231, 231 - 1],
 then return 0.

Example 1:

Input: x = 123
Output: 321
*/

var reverse = function(x) {
    let revNum=0,
        lastDigit=0;
    while(x!==0){
        lastDigit=x % 10;
        x = parseInt(x/10);
        revNum=revNum * 10 + lastDigit;
        if(revNum <  Math.pow(-2,31) || revNum >  Math.pow(2,31) - 1)
            {
                return 0;
            }
    }
    return revNum;
    
};

