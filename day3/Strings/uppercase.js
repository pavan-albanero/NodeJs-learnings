/**
 * Write a function ucFirst(str) that returns
 *  the string str with the uppercased first character, for instance:
 */
function ucFirst(str) {
    
    return str[0].toUpperCase()+str.slice(1);
}
ucFirst("john") == "John";