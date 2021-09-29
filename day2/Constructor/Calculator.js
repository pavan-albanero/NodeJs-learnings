/**Create a constructor function Calculator that creates objects with 3 methods:

read() asks for two values using prompt and remembers them in object properties.
sum() returns the sum of these properties.
mul() returns the multiplication product of these properties.
For instance:

let calculator = new Calculator();
calculator.read();

alert( "Sum=" + calculator.sum() );
alert( "Mul=" + calculator.mul() ); */
function Calculator() {
    this.sum= function() {
      return this.a + this.b;
    };

    this.mul= function() {
      return this.a * this.b;
    };
  
   this.read= function() {
      this.a = +prompt('a?', 0);
      this.b = +prompt('b?', 0);
    }
  };
 
  let calculator = new Calculator();
calculator.read();

alert( "Sum=" + calculator.sum() );
alert( "Mul=" + calculator.mul() ); 