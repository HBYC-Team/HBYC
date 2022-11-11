# HBYC Changelog
This documentation is a changelog of this repository.

## v3.2.0
Release Date: 2022-11-11

### Features
* Added some new info content. ([osu.js](./src/cmds/osu.js)) (5223334)

* Added `/lightsup` game. ([lightsUp.js](./src/cmds/lightsUp.js)) (76a9ca7)

* Added private `/sendann` command. ([supportGuildSendAnn.cjs](./src/cmds/lightsUp.js)) (524e951)

* Added clear commands script. ([clear.js](./src/clear.js)) (b6039b9)

### Changes
* Added clear script. ([package.json](package.json)) (4263563)

### Fixes
* Wrong typing in `/avatar` command. ([avatar.js](./src/cmds/avatar.js)) (a92adae)

### Refactors
* Created webhook object from a new file. ([WebhookManager.js](./src/utils/WebhookManager.js)) (a92adae)

* Import announcement content from a new file. ([lateatUpdate.js](./src/data/latestUpdate.js)) (e697451)

* Replaced `size` and `boardSize` value with `Number.prototype.toString()`  method. (ecf8f3a)

## v3.1.1
Release Date: 2022-10-19

### Features
* Added private commands deployment. ([deploy.js](./src/deploy.js)) (830563d)

### Changes
* Added develop guild info. ([constants.json](./src/constants.json)) (40cbd92)

* Added some replies when permission denied. ([buttonRole.js](./src/cmds/buttonRole.js)) (725bc20)

* Log in console when someone interacts the bot, added this for host cloud not to cycling. ([interactionCreate.js](./src/events/interactionCreate.js)) (bcb811c)

### Fixes
* Fixed button in `/buttonrole` command will be expired after bot restart. ([interactionCreate.js](./src/events/interactionCreate.js)) (a0a8a1e)

## v3.1.0
Release Date: 2022-10-16

### Features
* Added `/buttonrole` command. ([buttonRole.js](./src/cmds/buttonRole.js)) (f1a1e4b)

* Added `/osu userinfo` command. ([osu.js](./src/cmds/osu.js)) (96089f0)

* Added osu!api config property. ([config.js](./config.js)) (568c4c1)

### Changes
* Changed few content in [LICENSE](./LICENSE). (d1ead18)

* Changed few content in `errHookEmbed`. ([interactionCreate.js](./src/events/interactionCreate.js)) (071c725)

* Changed few content in webhook embeds. ([messageCreate.js](./src/events/messageCreate.js)) (4580c04)

* Changed reply content on `/ping` command. ([ping.js](./src/cmds/ping.js)) (b39b8f2)

* REST API has changed to v10. ([deploy.js](./src/deploy.js)) (e0fada4)

### Fixes
* Fixed wrong typing. ([ticTacToe.js](./src/cmds/ticTacToe.js)) (d4de018)

* Fixed `/say` and `/echo` command that still can do mentions. ([say.js](./src/cmds/say.js) / [echo.js](./src/cmds/echo.js)) (c19fe2d)

### Refactors
* Refactored some constants with ternary operator. (3ab5cbd)

### Others
* Convert Changelog to new format.

## v3.0.0 - [Moves]
* MOVED THE FILE IN THE BOT TO NEW REPOSITORY AND REWRITE.

* Added new member information. ([constants.json](./src/constants.json))

* Changed some method. ([report.js](./src/js/cmds/report.js))

* Changed some content. ([announcement.js](./src/js/cmds/announcement.js)

* Changed package manager to yarn.

* Rewrote all the indentation.

* Refactored all the code.

* `/say` command cannot @everyone or @here anymore.

## v2.1.0
* Added few lines of webhook embeds([messageCreate](./src/js/events/messageCreate.js)).

* Changed something([avatar.ts](./src/ts/avatar.ts)).

* Fixed missing webhook.

* Fixed wrong webhook embed shard number(errEmbed in [interactionCreate](./src/js/events/interactionCreate.js)).

* Ignore `@everyone` mentions and `role` mentions, the bot will not reply([messageCreate](./src/js/events/messageCreate.js)).

* Return when the bot got mention and the message event happen at the same time([messageCreate](./src/js/events/messageCreate.js)).

* Reply when the argument number is not allowed([ticTacToe](./src/js/cmds/ticTacToe.js)).

* Removed unuse import([deploy](./src/js/deploy.js)).

* Refactored events when catching errors([messageCreate](./src/js/events/messageCreate.js)).

## v2.0.1
* Fixed error when trigged interaction command(`/thinking`). 

* Fixed the wrong chances of `www` messageCreate event.

* Refactored `app.js`(moved interactionCreate event to a new module).

* Refactored interaction error message(import with `config.json`).

## v2.0.0 - [Connection]
* Added Webhooks(Shard#1, #2, #3, #4, #5).

* Added `constants.json` for some data.

* Fixed known bugs.

* Refactored most of the files.

* Changed some import data way.

* Changed `messageCreate` event to [messageCreate.js](./src/js/events/messageCreate).

* Rewrite some code for refactore.

* Rename some command name because that is not finished yet.

## v1.1.0a
* Pushed ignored commands.

* Few bug fixes.

## v1.1.0
* Added Tic-Tac-Toe game, `hbycinfo` command and ban list test.

* Removed all events of [interactionCreate](./src/js/events/interactionCreate.cjs).

* Fixed more bugs:
```
(1) The bot will offline when erroring.
(2) Some datetime error of the games.
(3) On message event, console will show "interaction is not defined".
```

* Added ignore files, ban list.

* Finish Python [Chat Commands](./src/python/cmds/chat.py) example, configuration files.

* Added new banner and avatar.

## v1.0.0 - [Beginning]
* Added Go, Python, TypeScript main file examples.

* Added Guide.

* Removed `tutorial.md`.

* Rewrite auto-configure files for muiti languages.

* Bug fixes - `finalCode.js`, `info.js`.

* Updated link with new repo adress - `github.js`, `help.js`, `ToS.js`. 

> Guide document will out in future versions.

> More Examples of Other Languages will out in future versions.

## v0.2.0
* Added batch file for [autoConfigure](./docs/autoConfig.md).

* Added `tos` command.

* Added npm scripts.

* Changed game language to Chinese.

* The bugs of `Gomoku`.

* The code is being simplified now.

* Added `strings.json` of the custom strings.


## v0.1.0
**Moved Project From Python**

* Added Games - `BigTwo`, `2048`, `BullsAndCows`, `FinalCode`, `FlipTrip`, `Gomoku`.

* Added Commands - `dev`,  `info`,  `select`,  `github`.

* Changed repeat => echo.

* Added pythonk to `thinking` command.

* Fixed Lots of bugs.

* Refactored ping Command(Using Embed now).

* Refactored say, thinking Command(Now the check message will be ephemeral).

* Removed Music Commands.

* Removed Message Commands.

* Added `build.sh` for [autoConfigure](./docs/autoConfig.md).

* Added `disclaimer`, `ToS`, `help`, `tutorial` documents.
