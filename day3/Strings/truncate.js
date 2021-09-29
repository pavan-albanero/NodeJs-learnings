/**
 * Create a function truncate(str, maxlength) that checks the length of the str and, if it exceeds maxlength – replaces the end of str with the ellipsis character "…", to make its length equal to maxlength.

The result of the function should be the truncated (if needed) string.

For instance:
 */
function truncate(str, maxlength){
    str=str.slice(0, maxlength-1);
    alert(str+"...");
    return str+"...";
}
truncate("What I'd like to tell on this topic is:", 20) == "What I'd like to te…"

truncate("Hi everyone!", 20) = "Hi everyone!"