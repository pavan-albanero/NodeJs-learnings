/**The task has two parts.

Given the following objects:

let head = {
  glasses: 1
};

let table = {
  pen: 3
};

let bed = {
  sheet: 1,
  pillow: 2
};

let pockets = {
  money: 2000
};
Use __proto__ to assign prototypes in a way that any property lookup will follow the path: pockets → bed → table → head. For instance, pockets.pen should be 3 (found in table), and bed.glasses should be 1 (found in head).
Answer the question: is it faster to get glasses as pockets.glasses or head.glasses? Benchmark if needed. */
let head = {
    glasses: 1
  };
  
  let table = {
    pen: 3,
    __proto__:head
  };
  
  let bed = {
    sheet: 1,
    pillow: 2,
    __proto__:table
  };
  
  let pockets = {
    money: 2000,
    __proto__:bed
  };

  console.log(pockets.pen);
  console.log(bed.glasses);
  console.log(table.money);