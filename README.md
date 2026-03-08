## 1️⃣ What is the difference between var, let, and const?
*Answer*:
IN CASE OF SCOPE: var is function scoped where let & const are block scoped.
IN CASE OF HOISTING: var is hoisted and initialized as undefined. On the other  
                     hand, let & const are also hoisted but not initialized and they are be on the TDZ (Temporal Dead Zone).
IN CASE OF REASSIGN: var & let can be reassign but const can't. 
IN CASE OF REDECLARATION: var can be redeclared but let & const can't be 
                          redeclared.


## 2️⃣ What is the spread operator (...)?
*Answer*: 
The spread operator is used spread or unpack or unzip data to the array, object and function call etc.
Array Example:
              const greenFruits = ['green apple', 'green banana'];
              const fruits = ['litchi', 'jack-fruit', 'guava', ...greenFruits];
              console.log(fruits);
              OUTPUT: ['litchi', 'jack-fruit', 'guava', 'green apple', 'green banana']
Object Example:
              const user = {name: 'Ferdows', age:33};
              const updateUser = {...user, age:34};
              console.log(updateUser);
              OUTPUT: {name: 'Ferdows', age:34} 

Function Call:
              const numbers = [10, 33, 45, 55, 54, 20]
              console.log(Math.max(...numbers));
              OUTPUT: 55


## 3️⃣ What is the difference between map(), filter(), and forEach()?
*Answer*: 
All three methods are the ES-6 Feature. Example and Key Features are given below:
map():
  Example: const prices = [10, 20, 30];
           const taxedPrice = prices.map(price => price * 1.1);
           console.log(taxedPrice);
           OUTPUT: [11, 22, 33]
  Key Feature:
          (i)  Return a new array.
          (ii) Not change the original array.
          (ii) Use when need to transform every item in a list.

filter():
  Example: const scores = [40, 12, 80, 90];
           const passingScores = scores.filter(score => score >= 50);
           console.log(passingScores);
           OUTPUT: [80, 90]
  Key Feature:
          (i)  Return a new array.
          (ii) Not change the original array.
          (ii) Use when need to some filtered data basis on condition.

forEach():
  Example: const users = ['Ayash', 'Ferdows', 'Salma'];
           users.forEach(user => console.log(`Sending email to ${user}.`));
           OUTPUT: Sending email to Ayash.
                   Sending email to Ferdows.
                   Sending email to Salma.
Key Feature:
          (i)  Return undefined.
          (ii) Not change the original array.
          (ii) Use when just need to execute logic for each item.


## 4️⃣ What is an arrow function?
*Answer*: 
It is an ES-6 Feature. For declare a arrow function need a arrow(=>) symbol. Some benefits of this arrow functions are given below:
SYNTAX:
    Regular Function: const add = function(a,b){
                      return a+b;
                    }
    Arrow Function: const add = (a,b) => a+b; (No need return for single line.)

IMPLICIT RETURN:
        const square = n => n*n; (No need parenthesis or return for single parameter or single line accordingly.)


## 5️⃣ What are template literals?
*Answer*: 
Template literals means backtick (``) and it is a ES-6 feature. It has many benefits like:
String Interpolation: 
      OLD WAY: "Hello" + name + "." + "How are you?";
      TEMPLATE LITERALS WAY: `Hello ${name}. How are you?`;

Multi Line String: It show the output like pre-formatted.
      const poem = `
      Twinkle Twinkle
        Little Star.
      `;
