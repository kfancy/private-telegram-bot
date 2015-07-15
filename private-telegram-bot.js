#!/usr/bin/node

/* ___________________________________________________________________________

  Module: private-telegram-bot.js   Version: v0.0.2
  Repository: http://github.com/GuillermoPena/private-telegram-bot
  Author: Guillermo Peña (guillermo.pena.cardano@gmail.com)
  Last update: 15/07/2015

  Selective access telegram bots builder

____________________________________________________________________________*/

// Logger
var easyLogger = require('easylogger')
var logger = new easyLogger(__dirname + '/config/logger.json')

// Message bot formatter
logger.prepareMessage = function(message, to) {

  var messageToLog = ""
  // If NOT error...
  if (message.message_id) {

    // If last char is \n, remove it
    if (message.text.charAt(message.text.length-1) == '\n')
      message.text = message.text.substring(0, message.text.length-1)

    // Adding header in every line
    var header = "[msg_" + message.message_id + "] @" + message.from.username
    header += (to) ? " > @" + to + " : " : " : "
    messageToLog += header
    if (message.text) {
      message.text = message.text.replace(/\n/g,'\n' + header)
      messageToLog += message.text
    }
  }

  // If error...
  if (message.code)
    messageToLog = message.description.replace("Error:", "Error " + message.code + ":")

  return messageToLog
}

// Message bot printer
logger.printBotError = function(err, data, callback) {

  // Preparing message to be log
  var to = (err) ? null : data.chat.username
  var message = (err) ? logger.prepareMessage(err, to)
                      : logger.prepareMessage(data, to)
  var level = (err) ? 'error' : 'info'

  // Logging...
  logger.print(level, message)
}


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

// Launching bot...
var Bot = require(__dirname + '/lib/bot.js') // Bot Library
var bot = new Bot(__dirname + '/config/', logger)
