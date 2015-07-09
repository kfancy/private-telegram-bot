# easyWizard

easyWizard is a utility module wich provides easy way to build console wizards using a simple JSON property file, and collecting user answers to JSON object that you can use.

## How Install

Easy again: 

	npm install easywizard


## Quick Example

```javascript
{
	"steps": [	{
					"id": "1"
				,	"question": "Your name: "
				,	"defaultAnswer": "popo"	
				,	"firstStep": true
				,	"type": "string"
				,	"property": "name"
				,	"nextStep": "2"
				,	"clearScreen": true
				}
			 ,  	{
			 		"id": "2"
				,	"question" : "Your surname: "	
				,	"type": "string"
				,	"allowNulls": true
				,	"property": "surname"
				,	"nextStep": "3"
			 	}
			, 	{
			 		"id": "3"
				,	"question" : "Age: "	
				,	"type": "numeric"
				,	"limits": { "min": 5, "max": 100}
				,	"property": "age"
				,	"nextStep": "4"
				,	"pause": true
			 	}
			 ,	{
			 		"id": "4"
				,	"question" : "Repeat? [y,n]:"	
				,	"type": "options"
				,	"options": { "y": { "nextStep": "1" , "value": "YES" }
							, "n": { "nextStep": null, "value": "NO" }
							}
			 	}
			 ]
}
```

This is a simple (but complete) JSON file to build a wizard
Mainly, is a steps array. Each step must contais this fields:

  - id: A id field. Two differents step can not contains same id value
  - question: What do you want to ask to user?
  - type: What type of value are you expecting? ["string", "numeric", "option"]
  - nextStep: id of the next step. If type is option, each option can contain a own 'next step' value
  - options: if type is option you must add this field with options that user can choose

Then, you can add optional fields:

  - defaultAnswer: if user set blank value will be default value
  - property: name of property that resultant object will content with value that user will set
  - clearScreen: clear screen before ask question to user
  - firstStep: define what step will be the first. If this property never is defined, firtStep will be the first step in array
  - limits: max and min limits value for numeric type value
  - allowNulls: allow a null answer
  - value: in a optional question you can convert user answer in another one with a 'value' field into each option JSON object
  - pause: very interesting property! If you set this to true, you will pause wizard in this step for make what you want, and when you finish, you can continue emitting event 'continue'.

See, the next example:

``` javascript
// __ Modules _____________________________________________________________

var util = require("util")

// __ Main Object _________________________________________________________

var EasyWizard = require("../lib/easyWizard.js")
var ew = new EasyWizard()

// __ Test 01 _____________________________________________________________

var file1 = "../examples/basic.wizard"
ew.emitter.once('end', function() { console.log("\nResult:\n" +  util.inspect(ew.getObject())) })
ew.emitter.once('paused', function() {
	var o = ew.getObject()
	console.log("Adding 10 years to the age")
	o.age = parseInt(o.age) + 10
	ew.emitter.emit('continue')
})
ew.run(file1)
```

This example builds a wizard with the previous wizard JSON file and when 'age' step ends, wizard is paused (event 'paused'), test is going to add 10 years to age property, and then continue wizard. 
When wizard ends (event 'end'), resultant object is showed in console.

You can use this public methods also: 

  - getObject(): return a object with all info of the wizards (responses of user)
  - resetObject(): reset object clearing all of properties
  - getCurrentStep(): return current step id of wizard at this moment
  - getNextStep(): return current next step id (if exists) of wizard at this moment
  - setNextStep(stepId): force the next step


## Contributors

- [GuillermoPena](http://github.com/GuillermoPena) 
