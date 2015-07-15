# private-telegram-bot

  Selective access telegram bots builder

  With private-telegram-bot you can manage your own Telegram bot with a security layer that allow build a public, selective or private bot.
Add or remove functionality to your bot is really easy. Add/remove any script in your public or private folder and you’ll can to run from your mobile. Easy!
Tested in Linux and Raspberry Pi!

## How install

Using npm: npm install private-telegram-bot

## First use

Before use it you must create a bot in Telegram bot platform. It’s very easy:

	- From your Telegram in your mobile, talk with @botFather
	- Say him: /newbot and follow his instructions
	- After bot creation, @botFather’ll give you a token. Save it! Its very important!

More info here: https://core.telegram.org/bots
With token of your new bot, edit /config/bot.json and add your token value to ‘token’ property

Everything is ready… run with: ./private-telegram-bot.js
Now you can launch commands from your Telegram bot, from your mobile. Send /help to see which commands you have ready to run.

## How add your own commands

Easy. You can add any script in public or admin scripts folder. The name of your script will be a command.

By default, public and admin script folders are:
	[project folder]/publicScripts
  [project folder]/adminScripts

Only you (the bot owner) can run the ‘admins scripts’. Only who you want can run ‘public scripts’ (check ‘adduser’ and ‘removeuser’ commands)
You can change public and admin folder path properties in bot configuration file (bot.json)
You can add and remove commands, users, change configuration properties… without restart any process. Private-telegram-bot will detect and rebuild it any required object to get change.

## How to configure it

Only bot token is required to use it but, if you want to know how to modify bot behaviour, you can do it editing simple json property files in config folder.
Change bot language (currently ‘en’ and ‘es’ values), create rotate file log files, set commands timeout… etc Open your config files and take a look!


## License

(The MIT License)

Copyright (c) 2015 Guillermo Peña &lt;guillermo.pena.cardano@gmail.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
