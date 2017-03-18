"use strict"
const map = f => x => Array.prototype.map.call(x, f)
const filter = f => x => Array.prototype.filter.call(x, f)
const reduce = f => x => Array.prototype.reduce.call(x, f)
const compose = (f, g) => x => f(g(x))

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

const tData = [100,99,98]

console.log(reduce((acc, c) => acc+c)([3].concat(tData)))
// => 300

const arrData = ['A','n','y',' ','o','l','d',' ','i','r','o','n']


console.log(reduce((acc,c) => acc+c)(arrData))
// => give me every other character concated data
console.log(reduce((acc,c,i) => i%2 ? acc : acc+c)(arrData))

// map will map over an Object, so can I reduce an Object?
const sumVals = reduce((acc,c) => acc+c)
console.log(sumVals(obj))
// => 15
// Oh my hat, YES WE CAN! => That means I don't need Object.value(obj) anymore
// it can be done with this new, decoupled, reduce function on steroids!! Brillent!
// How awersome is that! How awersome is that! Everybody, how awersome is that!

console.log(sumVals([100,99,98]))
// => 297
// => Oh my, I think I'll do something stupid and eat my hat. I feel like a kid
// => with a new toy! A magic utility belt of a few functions that does it all!

console.log(sumVals([3].concat([100,99,98])))
// => 300

// An alias to suit my context.
const giveMeAstringIcommandYou = sumVals

console.log(giveMeAstringIcommandYou(['A','n','y',' ','o','l','d',' ','i','r','o','n']))
// => Any old iron

// FORGET WHAT I SAID AT APPROX. LINE 100 re: The jury is still out. The verdict
// is a BIG YES TO THESE DECOUPLED CURRIED FUNCTIONS - THE JACK OF ALL TRADES!
// These new functions are magic. What a happenstance. Thanks Joel Thoms.
// Remember this day, Sat, 18 Mar 2017 at 17:30 hrs GMT.
// The day the penny dropped and a JavaScript treasure chest was opened.

const happy = {
  1: 'Awersome',
  2: 'Is',
  0: 'How',    // => *
  3: 'That!',
  length: 4  // => required + order determined by, required, numerical keys!!!
  // Very interesting my dear Watson!
}

const giveMeAnArray = map(x => x)
const giveMeAStringInjectSpaces = reduce((acc,c) => /[A-Z]/.test(c[0]) ? acc+' '+c : acc+c)

const giveMeMyPhrase = compose(giveMeAStringInjectSpaces, giveMeAnArray)
console.log(giveMeMyPhrase(happy))
// How Awersome Is That!
