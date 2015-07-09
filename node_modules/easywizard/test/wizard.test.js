/* ___________________________________________________________________________

    Module: wizard.test.js   Version: v0.1
    Author: Guillermo Peña (guillermo.pena.cardano@gmail.com)
    Last update: 17/04/2013
    
        Wizard test file

   ___________________________________________________________________________*/



// __ Modules _____________________________________________________________

var util = require("util")

// __ Main Object _________________________________________________________

var EasyWizard = require("../lib/easyWizard.js")
var ew = new EasyWizard()

// __ Test 01 _____________________________________________________________o

var file1 = "../examples/basic.wizard"
ew.emitter.once('end', function() { console.log("\nResult:\n" +  util.inspect(ew.getObject())) })
ew.emitter.once('paused', function() {
	var o = ew.getObject()
	console.log("Adding 10 years to the age")
	o.age = parseInt(o.age) + 10
	ew.emitter.emit('continue')
})
ew.run(file1)