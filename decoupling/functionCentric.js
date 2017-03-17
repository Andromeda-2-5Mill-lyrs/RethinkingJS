"use strict"
const map = f => x => Array.prototype.map.call(x, f)

// document.querySelectorAll (and similar methods) do not return an Array,
// they return a NodeList and a NodeList does not contain a map method.

// [insert] - Also applies to the arguments object?

// items.map(doSomethingOrNothing)
// => Uncaught TypeError: items.map is not a function

const paintTheTownRed = () => {

  let items = document.querySelectorAll('div')

  const makeItRed = div => {
    div.className="red big-bold",
    div.innerHTML="Town painted red. I feel so much better!"
  }
  // Oh no it can't be ... yes! we need a side effect!
  // ... But don't worry it's only the DOM and it needs to be mutated.
  map(makeItRed)(items)
}
// Now paint the town red! But, not for a few seconds...
const interval = setTimeout(paintTheTownRed, 8000)

// -------------------------------------------------------

const value = 'kitty cat'

// value.map(doSomething)
// => Uncaught TypeError: value.map is not a function

console.log(map(v => v.toUpperCase())(value))
// => ['K', 'I', 'T', 'T', 'Y', ' ', 'C', 'A', 'T']

// -------------------------------------------------------

const getFullName = ({ first, last }) => `${first} ${last}`

console.log(getFullName({ first: 'Max', last: 'Power' }))
// => 'Max Power'

const fullnames = map(getFullName)([
  { first: 'Max', last: 'Power' },
  { first: 'Disco', last: 'Stu' },
  { first: 'Joe', last: 'Kickass' }
])
console.log(fullnames)
// => ['Max Power', 'Disco Stu', 'Joe Kickass']

// -------------------------------------------------------
// We can even map over objects.

const obj = {
  0: 4,
  1: 5,
  2: 6,
  length: 3
}

console.log(map(x => x + 1)(obj))
// => [5, 6, 7]
console.log(obj)
// => [4, 5, 6]
console.log(map(x => x * 5)(obj))
// => [20, 25, 30]
console.log(obj)
// => [4, 5, 6]
console.log(map(t => (9.81 * (t * t)) / 2)(obj))
// => [78.48, 122.625, 176.58]
console.log(obj)
// => [4, 5, 6]

// -------------------------------------------------------
// Decoupling allows us to compose functions:

const compose = (f, g) => x => f(g(x))

const squareAndMultiplyByConstant = t => (9.81 * (t * t))
const half = x => x / 2
const mapSquareAndMultiplyByConstant = map(squareAndMultiplyByConstant)
const mapHalf = map(half)

// composing 2 mappings - just make sure you apply it to compose in the correct order!!!!
// => Yes, compose the MAPPINGS.
const mapSquareAndMultiplyByConstantThenMapHalf =
  compose(mapHalf, mapSquareAndMultiplyByConstant)

// use object from previous example.
console.log(mapSquareAndMultiplyByConstantThenMapHalf(obj))

// => MY OPINION => I like this way of programming.
// => If you compare each approach (I know I really shouldn't use terms that I
// => really don't know about, but...), for argument sake I'll call Array.map(fn)
// => "Object focused or centric" and the decoupled map function - "function focused
// => or centric", then I really don't mind which I use. Let's say the jury is still out!
// => But, I will never go back to the imperative style. So, no switch, no for or while loops.
// => No breaks or gotos. I won't miss them.
// => I intend to use ternary expressions instead of the if construct and try to compose
// => functions/mappings together.

// => Incidentally, I would be interested in seeing your reduce() and filter()
// => decoupled functions to complete the set.

// => So, ...
// => small, terse es2015+ arrow functions in a library or in program code
// => equals little "bricks" to build a very BIG WALL.
// => Sorry couldn't resist my next thought ... https://youtu.be/FEgSOt8QrQM
// => ... it's a bit ancient, but a classic.
// -------------------------------------------------------
