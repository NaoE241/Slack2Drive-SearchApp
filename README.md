# Slack2Drive-SearchApp
Slackから任意のGoogle Drive内をファイル名検索します

## Usage
- [/設定したコマンド 検索語] ex. /searchfile Mtg
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
