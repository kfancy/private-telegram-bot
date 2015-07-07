
# Contains

Search item in container (arrays, arrays of objects, strings, numbers...).
Return index, existence, object, repetitions... anything you want!

## How Install

	npm install multiple-contains

## How it works

Search different info in container in order to mode value

Type of containers:

  - Number
  - String
  - Array
  - TODO: Object


Type of 'items':

  - Object: with 'key' and 'value' to find in array of objects or in object
  - String: contained in array, key of object, substring of string...
  - Number: contained in array, substring of string, digit of number...


Mode values (default: 'index'):

  - 'exists': return true or false if item exists in container
  - 'index' : return first index of item in container (default: -1)
  - 'object': return full item
  - 'filter': return subarray with matched items in array or regular expresions
results in string or number
  - 'repetitions': return how many times is item or regular expresion in
container


## Quick Examples

Test 1a: Searching item ('pepe') in array --> Found.

Test 1b: Searching item ('pep') in array  --> Not Found.

```
var contains = require('../multiple-contains.js')
var util     = require('util')

var array1 = [ 'papa', 'pepe', 'pipi' ]
var array2 = [ { "sex":"M", "name":"paco" }
             , { "sex":"F", "name":"pepa" }
             , { "sex":"M", "name":"pepe" }
             ]


// --- Test 1 ------------------------------------------------------------------

console.log("\nTest 1a: Searching item ('pepe') in array")
console.dir(array1)

var toFind = 'pepe'
console.log("Exists? " + contains(array1, toFind, 'exists'))
console.log("Index: "  + contains(array1, toFind))
console.log("Filter: " + util.inspect(contains(array1, toFind, 'filter')))
console.log("Repetitions: " + contains(array1, toFind, 'repetitions'))

console.log("\nTest 1b: Searching item ('pep') in array")
toFind = 'pep'
console.log("Exists? " + contains(array1, toFind, 'exists'))
console.log("Index: "  + contains(array1, toFind))
console.log("Filter: " + util.inspect(contains(array1, toFind, 'filter')))
console.log("Repetitions: " + contains(array1, toFind, 'repetitions'))

```

Test 2a: Searching object ({'sex':'F','name':'pepa'}) in array of objects --> Found.

Test 2b: Searching object ({'sex':'F','name':'pep'}) in array of objects  --> Not Found.

```
// --- Test 2 ------------------------------------------------------------------

console.log("\n\nTest 2: Searching object ({'sex':'F','name':'pepa'}) in array of objects")
console.dir(array2)
toFind = { "sex":"F", "name":"pepa" }
console.log("Exists? " + contains(array2, toFind, 'exists'))
console.log("Index: "  + contains(array2, toFind))
console.log("Filter: " + util.inspect(contains(array2, toFind, 'filter')))
console.log("Repetitions: " + contains(array2, toFind, 'repetitions'))

console.log("\nTest 2b: Searching object ({'sex':'F','name':'pep'}) in array of objects")
toFind = { "sex":"F", "name":"pep" }
console.log("Exists? " + contains(array2, toFind, 'exists'))
console.log("Index: "  + contains(array2, toFind))
console.log("Filter: " + util.inspect(contains(array2, toFind, 'filter')))
console.log("Repetitions: " + contains(array2, toFind, 'repetitions'))

```

Test 3a: Searching object by simple pattern --> Found.

Test 3b: Searching object by double pattern --> Found.

Test 3c: Searching object by double pattern --> Not Found.

```
// --- Test 3 ------------------------------------------------------------------

console.log("\n\nTest 3: Searching {key, value} ({'key':'sex','name':'M'}) matches in array of objects")
console.dir(array2)
var pattern = { "key":"sex", "value":"M" }
console.log("Exists? " + contains(array2, pattern, 'exists'))
console.log("Index: "  + contains(array2, pattern))
console.log("Filter: " + util.inspect(contains(array2, pattern, 'filter')))
console.log("Repetitions: " + contains(array2, pattern, 'repetitions'))

console.log("\nTest 3b: Searching {key, value} array ([{'key':'sex','name':'M'},{'key':'name','name':'pepe'}]) matches in array of objects")
console.dir(array2)
pattern = [{'key':'sex','value':'M'},{'key':'name','value':'pepe'}]
console.log("Exists? " + contains(array2, pattern, 'exists'))
console.log("Index: "  + contains(array2, pattern))
console.log("Filter: " + util.inspect(contains(array2, pattern, 'filter')))
console.log("Repetitions: " + contains(array2, pattern, 'repetitions'))

console.log("\nTest 3c: Searching {key, value} array ([{'key':'sex','name':'M'},{'key':'name','name':'pep'}]) matches in array of objects")
console.dir(array2)
pattern = [{'key':'sex','value':'M'},{'key':'name','value':'pep'}]
console.log("Exists? " + contains(array2, pattern, 'exists'))
console.log("Index: "  + contains(array2, pattern))
console.log("Filter: " + util.inspect(contains(array2, pattern, 'filter')))
console.log("Repetitions: " + contains(array2, pattern, 'repetitions'))

```

Test 4a: Searching substring by regular expresion (/el./g)  --> Found.

Test 4b: Searching substring by regular expresion (/xxx/g)  --> Not Found.

```
// --- Test 4 ------------------------------------------------------------------

var word = "elefant elam "
var substring = 'el.'

console.log("\n\nTest 4: Searching substring")
console.log("Word: " + word + " - Substring to find: " +  substring)
console.log("Exists? " + contains(word, substring, 'exists'))
console.log("Index: "  + contains(word, substring))
console.log("Filter: " + util.inspect(contains(word, substring, 'filter')))
console.log("Repetitions: " + contains(word, substring, 'repetitions'))

substring = 'xxx'
console.log("\nTest 4b: Searching substring")
console.log("Word: " + word + " - Substring to find: " +  substring)
console.log("Exists? " + contains(word, substring, 'exists'))
console.log("Index: "  + contains(word, substring))
console.log("Filter: " + util.inspect(contains(word, substring, 'filter')))
console.log("Repetitions: " + contains(word, substring, 'repetitions'))

```

Test 5a: Searching numbers by regular expresion (/23./g) --> Found.

Test 5b: Searching numbers by regular expresion (/00/g)  --> Not Found.

```
// --- Test 5 ------------------------------------------------------------------

var number = 123423
var subnumber = "23."

console.log("\n\nTest 5: Searching digit or subnumber")
console.log("Number: " + number + " - Digit or subnumber to find: " +  subnumber)
console.log("Exists? " + contains(number, subnumber, 'exists'))
console.log("Index: "  + contains(number, subnumber))
console.log("Filter: " + util.inspect(contains(number, subnumber, 'filter')))
console.log("Repetitions: " + contains(number, subnumber, 'repetitions'))

console.log("\nTest 5b: Searching digit or subnumber")
subnumber = 00
console.log("Number: " + number + " - Digit or subnumber to find: " +  subnumber)
console.log("Exists? " + contains(number, subnumber, 'exists'))
console.log("Index: "  + contains(number, subnumber))
console.log("Filter: " + util.inspect(contains(number, subnumber, 'filter')))
console.log("Repetitions: " + contains(number, subnumber, 'repetitions'))
```
