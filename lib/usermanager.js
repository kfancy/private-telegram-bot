/* ___________________________________________________________________________

  Module: usermanager.js   Version: v0.0.1
  Repository: http://github.com/GuillermoPena/private-telegram-bot
  Author: Guillermo Peña (guillermo.pena.cardano@gmail.com)
  Last update: 1/07/2015

  User managment module

____________________________________________________________________________*/

function userManager(args) {

  // ___ Modules ___________________________________________________________


  // __ Properties _________________________________________________________

  var cm = args.configManager // Config Manager object
  var logger = args.logger    // Logger (winston) object
  var bot = args.bot          // Telegram Bot object

  // __ Private Methods ____________________________________________________


  // __ Public Methods _____________________________________________________

  // Add user
  var addUser = function() {

  }

  // Remove user
  var removeUser = function() {

  }

  // __ Return _____________________________________________________________

  return { "addUser": addUser
         , "removeUser": removeUser
         , "next": next
         }
}

module.exports = userManager
