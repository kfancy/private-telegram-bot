/* ___________________________________________________________________________

  Module: commandManager.js   Version: v0.0.2
  Repository: http://github.com/GuillermoPena/private-telegram-bot
  Author: Guillermo Peña (guillermo.pena.cardano@gmail.com)
  Last update: 15/07/2015

  Module to run commands, catch responses and send from Telegram Bot to user

  __________________________________________________________________________*/

function CommandManager(bot, logger, configPath) {

  // ___ Modules ___________________________________________________________

  var fs = require('fs')                      // File System library
  var cm = require('jsonfile-config-manager') // Config Manager object
  var chokidar = require('chokidar')          // Chokidar library (FS Watcher)
  var contains = require("multiple-contains") // Contains library
  var path = require('path')                  // Path library

  // __ Private Methods ____________________________________________________

  // Translate exit codes
  var checkExitCode = function(code) {
    // TODO: check exit code of child process in error and exit events
  }

  // Function to re-send output and error messages
  var sendToUser = function(data, message) {

    var params = { "chat_id": message.chat.id, "text": data }
    var response = bot.sendMessage(params, logger.printBotError)
  }

  // Is script file executable?
  var isExecutable = function(file) {

    // Extracting execution permissions for owner and other users
    var fstat = fs.statSync(file)
    var decimalPermissions = parseInt(fstat.mode.toString(8), 10).toString()
    var ownerExeChar = decimalPermissions.charAt(3)
    var otherExeChar = decimalPermissions.charAt(5)

    return ( ownerExeChar == '7' || ownerExeChar == '5' ||
             otherExeChar == '7' || otherExeChar == '5' )
  }

  // Add command
  var addCommand = function(publicOrAdmin, file) {

    if (isExecutable(file)) {
      // Getting script file name
      var command = file.split('/').pop()
      logger.print('debug', 'New ' + publicOrAdmin + ' command detected has been added : ' + file)
      if (!contains(cm.config.help.commands, {"key":"name", "value":command}, 'exists'))
        logger.print('warn', command + ' : Dont forget add detailed help in help.json file')

      // Adding to public/admin commands array
      var commands = cm.config.commands[publicOrAdmin + 'Commands']
      commands.push(command)
    }
  }

  // Remove command
  var removeCommand = function(publicOrAdmin, file, removeHelp) {

    // Getting script file name
    var script = file.split('/').pop()
    logger.print('debug', 'One ' + publicOrAdmin + ' command has been removed : ' + script)

    // Removing from public/admin commands array
    var commands = cm.config.commands[publicOrAdmin + 'Commands']
    var cid = contains(commands, script, 'index')
    if (cid > -1) commands.splice(cid, 1)

    // Removing info in help.json
    if (removeHelp) {
      var helpIdx = contains( cm.config.help.commands
                            , { "key": "name", "value": script }
                            , "index")
      if (helpIdx > -1) {
        cm.config.help.commands.splice(helpIdx, 1)
        cm.updateBranchFile('help')
      }
    }
  }

  // Add command in progress to array
  var addActiveUser = function(username, command, child, timeout) {

    // Adding active user
    activeUsers.push({ "username": username
                     , "command": command
                     , "child": child
                     , "timeout": timeout
                     })
  }

  // Build Command Manager
  var buildCommandManager = function() {

    cm.config.commands.adminCommands = []     // Array of Admin Commands
    cm.config.commands.publicCommands = []    // Array of Public Commands

    // Removing listeners if we are REbuilding command Manager
    if (publicWatcher) {
      publicWatcher.removeAllListeners('add')
      publicWatcher.removeAllListeners('unlink')
    }
    if (adminWatcher) {
      adminWatcher.removeAllListeners('add')
      adminWatcher.removeAllListeners('unlink')
    }

    // Watch public script folder
    var publicScriptsPath = (cm.config.commands.publicScriptsPath.charAt(0) == '.') ?
                            path.resolve(__dirname, cm.config.commands.publicScriptsPath)
                          : cm.config.commands.publicScriptsPath
    var publicWatcher = chokidar.watch( publicScriptsPath
                                      , {ignored: /^\./, persistent: true})
    publicWatcher
      .on('add',    function(file)  { addCommand('public', file) })
      .on('unlink', function(file)  { removeCommand('public', file, true) })
      .on('change', function(file)  {
        removeCommand('public', file, false)
        addCommand('public', file)
      })

    // Watch owner script folder
    var adminScriptsPath = (cm.config.commands.adminScriptsPath.charAt(0) == '.') ?
                            path.resolve(__dirname,  cm.config.commands.adminScriptsPath)
                          : cm.config.commands.adminScriptsPath
    var adminWatcher = chokidar.watch( adminScriptsPath
                                     , {ignored: /^\./, persistent: true})
    adminWatcher
      .on('add',    function(file)  { addCommand('admin', file) })
      .on('unlink', function(file)  { removeCommand('admin', file, true) })
      .on('change', function(file)  {
        removeCommand('admin', file, false)
        addCommand('admin', file)
      })
  }

  // __ Public Methods _____________________________________________________

  // Run script file
  var run = function(message, scriptFile, args) {

    // Creating child process
    scriptFile = path.resolve(__dirname, scriptFile)

    var username = message.from.username
    var command  = scriptFile.split('/').pop()
    logger.print('debug', "User @" + username + " is running command '" + command + ' ' + args + "'")
    var child = require('child_process').execFile(scriptFile, args, function(err,data){
      removeActiveUser(username)
    })

    // Timeout for command
    var timeout = setTimeout( function() {
      var literal = cm.config.literals[cm.config.bot.defaultLanguage]
      var params = { "chat_id": message.chat.id
                   , "text": '/' + command + " : " + literal.commandTimeoutError }
      var response = bot.sendMessage(params, logger.printBotError)
      removeActiveUser(username)
    }, cm.config.commands.commandTimeout )

    // Returning child data/error output to user
    child.stdout.on('data', function(data) { sendToUser(data, message) })
    child.stderr.on('data', function(data) { sendToUser(data, message) })

    child.once('error', function(err) {
      logger.print('error', 'Command ' + command + ' : Error : ' + err)
      sendToUser(err, message)
      removeActiveUser(username)
    })

    // Adding active user to array
    addActiveUser(username, command, child, timeout)
  }

  // Get index of an user running a command?
  var getActiveUserIdx = function(username) {
    return idx = contains( activeUsers
                         , { "key": "username", "value": username }
                         , "index"
                         )
  }

  // Remove command from array after stop it
  var removeActiveUser = function(username) {

    // Getting active user by username
    var idx = getActiveUserIdx(username)
    if (idx > -1) {

      // Clearing timeout
      clearTimeout(activeUsers[idx].timeout)

      // Removing events and killing child
      var child = activeUsers[idx].child
      logger.print('debug', 'Removing active user ' + username + ' from array. Index: ' + idx)

      // Removing listeners
      setTimeout(function() {
        child.removeAllListeners('data')
        child.removeAllListeners('error')

        // Check if child process is finished and kill it
        if (child.connected) child.kill('SIGINT')
      }, 300)

      // Removing active users from Array
      activeUsers.splice(idx, 1)
    }
  }

  // Send message to child proccess
  var sendToChild = function(username, message) {

    var idx = getActiveUserIdx(username)
    if (idx > -1 && message) {
      if (message.charAt(message.length-1) == '\n') message = message.splice(message.length-1, 1)
      logger.print('debug', 'User @' + username + ' is running command ' + activeUsers[idx].command)
      logger.print('debug', 'Sending message to child process : ' + message)

      // Send message to child process
      activeUsers[idx].child.stdin.write(message + "\n")
    }
  }

  // Is a public command?
  var isPublicCommand = function(command) {
    return contains(cm.config.commands.publicCommands, command, 'exists')
  }

  // Is a admin command?
  var isAdminCommand = function(command) {
    return contains(cm.config.commands.adminCommands, command, 'exists')
  }

  // __ Main _______________________________________________________________

  cm.addFile(configPath + 'help.json', null, true)
  cm.addFile(configPath + 'literals.json', null, true)
  cm.addFile(configPath + 'commands.json', null, true, buildCommandManager)
  var activeUsers = [] // Array of users running commands

  return { "run": run
         , "getActiveUserIdx": getActiveUserIdx
         , "removeActiveUser": removeActiveUser
         , "sendToChild": sendToChild
         , "isPublicCommand": isPublicCommand
         , "isAdminCommand": isAdminCommand
         , "publicScriptsPath": cm.config.commands.publicScriptsPath
         , "adminScriptsPath": cm.config.commands.adminScriptsPath
         }
}

module.exports = CommandManager
