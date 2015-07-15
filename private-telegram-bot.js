#!/usr/bin/node

/* ___________________________________________________________________________

  Module: private-telegram-bot.js   Version: v0.0.1
  Repository: http://github.com/GuillermoPena/private-telegram-bot
  Author: Guillermo Peña (guillermo.pena.cardano@gmail.com)
  Last update: 04/07/2015

  Selective access telegram bots builder

____________________________________________________________________________*/

// Logger
var easyLogger = require('easylogger')
var logger = new easyLogger(__dirname + '/config/logger.json')

// Preparing to catch error events
process.on('SIGSTP', function()  {
  logger.print('warn', 'Stopping Bot due to SIGSTP signal')
  process.exit(1)
})
process.on('SIGINT', function()  {
  logger.print('warn', 'Stopping Bot due to SIGINT signal')
  process.exit(1)
})
process.on('SIGTERM', function() {
  logger.print('warn', 'Stopping Bot due to SIGTERM signal')
  process.exit(1)
})
process.on('SIGTSTP', function() {
  logger.print('warn', 'Stopping Bot due to SIGTSTP signal')
  process.exit(1)
})
process.on('uncaughtException', function(e) {
  logger.print('error', 'Stopping Bot due to uncaughtException')
  logger.print('error', require('util').inspect(e))
  process.exit(128)
})

try {
  var Bot = require(__dirname + '/lib/bot.js') // Bot Library
  var bot = new Bot(__dirname + '/config/')
} catch (e) {
  logger.print('error', require('util').inspect(e))
}
