/* ___________________________________________________________________________

  Module: private-telegram-bot.js   Version: v0.0.1
  Repository: http://github.com/GuillermoPena/private-telegram-bot
  Author: Guillermo Peña (guillermo.pena.cardano@gmail.com)
  Last update: 04/07/2015

  Selective access telegram bots builder

____________________________________________________________________________*/

var Bot = require(__dirname + '/lib/bot.js') // Bot Library
var bot = new Bot(__dirname + '/config/')
