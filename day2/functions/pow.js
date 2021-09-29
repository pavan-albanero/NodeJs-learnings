/*Write a function pow(x,n) that returns x in power n. Or, in other words, multiplies x by itself n times and returns the result.

pow(3, 2) = 3 * 3 = 9
pow(3, 3) = 3 * 3 * 3 = 27
pow(1, 100) = 1 * 1 * ...* 1 = 1 */
function pow(x, n) {
    let result = x;
    for (let i = 0; i < n; i++)
    {
        result=result * x;
    }
    return result;
}