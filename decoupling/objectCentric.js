"use strict"
// document.querySelectorAll (and similar methods) do not return an Array,
// they return a NodeList and a NodeList does not contain a map method.

// [insert] - Nor does the arguments object!

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
  [...items].map(makeItRed)
}
// Now paint the town red! But, not for a few seconds...
const interval = setTimeout(paintTheTownRed, 8000)

// -------------------------------------------------------

const value = 'kitty cat'

// value.map(doSomething)
// => Uncaught TypeError: value.map is not a function

console.log([...value].map(v => v.toUpperCase()))
// => ['K', 'I', 'T', 'T', 'Y', ' ', 'C', 'A', 'T']

// -------------------------------------------------------

const getFullName = ({ first, last }) => `${first} ${last}`

console.log(getFullName({ first: 'Max', last: 'Power' }))
// => 'Max Power'

const data = [
  { first: 'Max', last: 'Power' },
  { first: 'Disco', last: 'Stu' },
  { first: 'Joe', last: 'Kickass' }
]

const fullnames = data.map(getFullName)
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

console.log(Object.values(obj).map(x => x + 1))
// console.log(map(x => x + 1)(obj))
// => [5, 6, 7, 4]   *** first signs of departure a from functionCentric.js ***

console.log(obj)
// => [4, 5, 6]

console.log(Object.values(obj).map(x => x * 5))
// => [20, 25, 30]
console.log(obj)
// => [4, 5, 6]

console.log(Object.values(obj).map(t => (9.81 * (t * t)) / 2))
// => [78.48, 122.625, 176.58, 44.145] <= *** picking up length prop ??? ***
console.log(obj)
// => [4, 5, 6]

// -------------------------------------------------------
// Decoupling allows us to compose functions:
// Note: Here I've composed the two function not the mappings.

const compose = (f, g) => x => f(g(x))

const squareAndMultiplyByConstant = t => (9.81 * (t * t))
const half = x => x / 2
const squareAndMultiplyByConstantThenTakeHalf = compose(half, squareAndMultiplyByConstant)

// take obj from above ...
console.log(Object.values(obj).map(squareAndMultiplyByConstantThenTakeHalf))
// => [78.48, 122.625, 176.58, 44.145] <= *** picking up length prop ??? ***

// -------------------------------------------------------
