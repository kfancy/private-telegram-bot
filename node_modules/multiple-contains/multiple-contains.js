/* ___________________________________________________________________________

  File: contains.js   Version: v0.0.3
  Repository: http://github.com/GuillermoPena/contains
  Author: Guillermo Peña (guillermo.pena.cardano@gmail.com)
  Last update: 31/03/2015

  Search item in container (arrays, arrays of objects, strings, numbers...).
  Return index, existence, object, repetitions... anything you want!

  Type of containers:
    Number
    String
    Array
    TODO: Object

  Type of 'items':
    Object: with 'key' and 'value' to find in array of objects or in object
    String: contained in array, key of object, substring of string...
    Number: contained in array, substring of string, digit of number...

  Mode values (default: 'index'):
    'exists': return true or false if item exists in container
    'index' : return first index of item in container (default: -1)
    'filter': return subarray with matched items in array or regular expresions
    results in string or number
    'repetitions': return how many times is item or regular expresion in
    container

__________________________________________________________________________*/


// Compare item with filter or another item
var checkItem = function(item, itemOrFilter) {

  // Defining array of filters
  var filters = []
  if (!Array.isArray(itemOrFilter)) {
    if (itemOrFilter.key != undefined)
      filters.push(itemOrFilter)
  } else {
    filters = itemOrFilter
  }

  // Filtering
  if (filters.length > 0) {
    var i = 0
    var match = true
    while (match && i < filters.length) {
      match = (item[filters[i].key] === filters[i].value)
      i++
    }
    return match
  }

  // Matching
  else {
    return (JSON.stringify(item) === JSON.stringify(itemOrFilter))
  }
}

// Search item in array.
var searchInArray = function(array, itemOrFilter, mode) {
  var found = { "index": -1, "filtered": []}
  var i = 0
  var end = false
  while ( i < array.length && !end) {
    end = (mode != 'filter' && mode != 'repetitions' && found.index != -1)
    if (checkItem(array[i], itemOrFilter)) {
      found.index = i
      found.filtered.push(array[i])
    }
    i++
  }
  return found
}

// Search substring or char in string.
var searchInString = function(string, item, mode) {
  var filtered = string.match(new RegExp(item, 'g'))
  var index    = (filtered) ? string.indexOf(filtered[0]) : -1
  var found    = { "index": index
                 , "filtered": filtered || []
                 }
  return found
}

// Search digit or subnumber in number.
var searchInNumber = function(number, item, mode) {
  var strnumber = number.toString()
  return searchInString(strnumber, item)
}


// Main function
module.exports = function contains (container, item, mode) {

  mode = (mode || 'index')
  var found = { "index": -1, "filtered": []}

  // Searching in number
  if (typeof container == "number")
    found = searchInNumber(container, item, mode)

  // Searching in string
  else if (typeof container == "string" || container instanceof String)
    found = searchInString(container, item, mode)

  // Searching in array
  else if (Array.isArray(container))
    found = searchInArray(container, item, mode)
  else console.log("Container type not allowed")

  // TODO: Search into object's properties
  //else if (container instanceof Object)  found = searchInObject(container, item)

  if (mode == 'exists') return found.filtered.length > 0
  if (mode == 'index')  return found.index
  if (mode == 'filter') return found.filtered
  if (mode == 'repetitions') return found.filtered.length
  console.log("Mode not allowed")
  return null
}
