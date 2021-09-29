/**Create a function readNumber which prompts for
 *  a number until the visitor enters a valid numeric value.

The resulting value must be returned as a number.

The visitor can also stop the process by entering an empty line or pressing “CANCEL”. 
In that case, the function should return null. */

function readNumber() {
    let num;
do{
 num = +prompt('read number?', );
}while(!isFinite(num));
if(num ==NaN || num== '') return null;
return num;
}
alert(`Read: ${readNumber()}`);