# Slack2Drive-SearchApp
Slackから任意のGoogle Drive内をファイル名検索します

## Usage
- [/設定したコマンド 検索語] ex. /searchfile Mtg
![image](https://user-images.githubusercontent.com/66460987/150640809-b4d6caf9-6dfd-400c-89c4-183c87143b2f.png)
- 検索したいドライブを選択
- 検索結果が返ってくる


## 各種ファイルの住み分け
このアプリは3つの機能から構成されています
|  機能  |  詳細  |
| ---- | ---- |
|  Action  |  Slackからコマンド入力を受けつけてメッセージを返す  |
|  Interatcivity  |  ユーザーの反応に対して検索結果を返す  |
|  DataBase  |  ドライブのIDを保管する  |

## Action
Action機能はコマンド入力から
