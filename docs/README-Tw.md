# HBYC
![license](https://img.shields.io/github/license/HBYC-Team/HBYC?style=for-the-badge)
![last_commit](https://img.shields.io/github/last-commit/HBYC-Team/HBYC?style=for-the-badge)
![Discord](https://img.shields.io/discord/977204156043509780?style=for-the-badge)
[![EMU800!!!](../public/images/banner-20221009.jpg)](https://reurl.cc/GxQqdy)

一隻用 JavaScript 寫出來的 Discord 機器人。

## 指令列表
* `/say` - 強迫機器人說話（使用時請注意我們的[使用者條款](./TermsofService-Tw.md)）。

* `/tictactoe` - 在 Discord 伺服器中遊玩圈圈叉叉遊戲。

* `/thinking` - 發送一個特定的 thinking 表情符號。

* `/info` - 查看特定使用者或伺服器的資訊。

* `/select` - 讓機器人幫你解決選擇困難症。

HBYC 這隻爛機器人的指令，肯定不只這些，指令列表請查看[協助文件](./help.md)。

## 邀請到你的伺服器
你可以使用[此連結](https://discord.com/api/oauth2/authorize?client_id=977024737156931675&permissions=1644971949559&scope=bot%20applications.commands)邀請 HBYC 到你的伺服器。

## 如何做一台跟這台一樣的機器人
自己 fork 這份專案或抓 source code 回去。

每一個版本發布後，會顯示在 [Release](https://github.com/HBYC-Team/HBYC/releases) 的區塊，那裡有原始碼的壓縮檔。

也可以直接 clone 一份回去。

## 如何使用這份程式
**HBYC的原始碼需要在 node.js v18.8.0 以上的環境執行，請使用 `node -v` 確認你的 node.js 版本足夠。**

在你抓一份回去後，請先使用 `yarn install` 進行依賴項的安裝，接著請在根目錄創建一個 `.env` 檔案，並填入以下缺項：
```
TOKEN=
clientId=
# 這裡是 bot 的基本資料， token 請直接填 bot 的 token 

cmdHookId=
cmdHookToken=
errHookId=
errHookToken=
msgHookId=
msgHookToken=
botHookId=
botHookToken=
reportHookId=
reportHookToken=
# 這邊是 webhook 的基本資料，請確認缺項都有填寫正確，否則會產生報錯

osuApiKey=
# 這邊請填入你的 osu! api v1 的 key ， 如果沒有填入將使有用到 osu!api 的指令無法使用
```

填寫完畢之後，請記得執行 `yarn deploy` 進行斜線指令的部署，若是你的部署為全域指令，需要等待一段時間才會生效。

如果想部署特定伺服器的指令拿來使用抑或是測試，請在 [constants.json](../src/constants.json) 的部份將 `devGuild.id` 修改成你要部署斜線指令的伺服器。

接著即可執行 `yarn start` 讓機器人上線。

請注意，必須要在根目錄執行上述指令才會生效，不照做他會叫我不管。

若想清除指令，可以直接執行[這個檔案](../src/clear.js)或是直接執行 `yarn clear` 進行清除已部署指令的動作。

## 專案特色
* 簡易的實用性聊天指令

* 各種小遊戲指令

## 授權方式
本專案採 GPL-3.0 協定授權釋出，你可以進行重新的編寫及分發，而重新分發的內容**必須**同樣採用 GPL-3.0 協定，並開放原始碼。

更多詳細內容請參見[本檔案](../LICENSE)。

## 相依性套件
已經在 [package.json](./package.json) 檔案註明，故不在此贅述。

## 更新日誌
請見[更新日誌](../CHANGELOG.md)檔案 (EN-Only) 。

## 作者
HBYC團隊 ／ 恐龍#2549

有關於其他問題可以到[這裡](https://discord.gg/J7X2nWXszp)找到團隊成員進行詢問。