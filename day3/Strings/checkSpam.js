/**
 * Write a function checkSpam(str) 
 * that returns true if str contains ‘viagra’ or ‘XXX’, otherwise false.

The function must be case-insensitive:
 */
function checkSpam(str) {
    str = str.toLowerCase();
    if(str.includes("viagra") || str.includes("XXX")){
        return true;
    }
    return false;
}
checkSpam('buy ViAgRA now') == true
checkSpam('free xxxxx') == true
checkSpam("innocent rabbit") == false