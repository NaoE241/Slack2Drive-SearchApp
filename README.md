# Slack2Drive-SearchApp
Slackから任意のGoogle Drive内をファイル名検索します

## Usage
- [/設定したコマンド 検索語] ex. /searchfile Mtg
![image](https://user-images.githubusercontent.com/66460987/150640809-b4d6caf9-6dfd-400c-89c4-183c87143b2f.png)
- 検索したいドライブを選択
![image](https://user-images.githubusercontent.com/66460987/150640860-625d7333-c4c2-4c67-959c-1cad92d061ca.png)
- 検索結果が返ってくる
![image](https://user-images.githubusercontent.com/66460987/150640888-bade8568-58b8-460e-91fa-05e574d87946.png)


## 各種機能の住み分け
このアプリは3つの機能から構成されています.
|  機能  |  詳細  |
| ---- | ---- |
|  Action  |  Slackからコマンド入力を受けつけてメッセージを返す  |
|  Interactivity  |  ユーザーの反応に対して検索結果を返す  |
|  Database  |  ドライブのIDを保管する  |

## Slack Appの設定
まずSlack Appを追加するための設定をしましょう.　　
といっても,必要な設定はoAuthでwrite系列のものを承認すればいいだけです.　　
アプリ名とか画像は後でも大丈夫です.

次にこの何もできないアプリに機能を追加していきましょう.

## Action
Action機能はコマンド入力から検索語を取得し,メッセージを返す機能です.  
GASとSlackのCommand機能から成り立っています.  
コードは[こちら](https://script.google.com/d/15BldR3e3o8bHdVeRu7ueptC7WNIcT5NCb0YsiVMIamFYcH3W3Ag8dukO/edit?usp=sharing)  
Slackのトークンなどのパラメータは各自入力してください.

こちらのコードをデプロイしたら,デプロイ結果のURLをSlack AppのCommand機能にぶちこんでください.

## Interactivity 
Interactivity機能はユーザーが選択した結果に対して,検索結果を返す機能です.  
GASとSlackのInteractivity機能から成り立っています.  
コードは[こちら](https://script.google.com/d/15XgMnegyG55S3RcQzG8_tBG_lo99wo773VO6iFpaxu4RJlISiPDomCmw/edit?usp=sharing)  
ドライブIDなどのパラメータは各自入力してください.

こちらのコードをデプロイしたら,デプロイ結果のURLをSlack AppのInteractivity機能にぶちこんでください.

## Database
Database機能は検索したい親ドライブのフォルダ情報を保持する機能です.  
GSSとGASから成り立っています.  
コードは[こちら](https://script.google.com/d/1N9M9dWRuqNX400utN-oI1mo6qWoPmTxgEp4iMRo4MX0E-Jx5WmbQGSfH/edit?usp=sharing)  
GSSの見本は[こちら](https://docs.google.com/spreadsheets/d/1Yt9vkDL40wPo6evmBiG6vphEMnUFUAotZv1Vsz-ceiU/edit?usp=sharing)

## Slack Appのインストール
最後に各種機能を追加したアプリをインストールしましょう.

確認事項
- []oAuthが設定されていること
- []各種GASのパラメータを調整したこと
- []データベースのGSSにドライブ情報が入っていること
- []Command機能が設定されていること
- []Interactivity機能が設定されていること
- []インストール先が正しいこと

## 開発裏話
Slack Responseは3秒以内に返らないとSlackが無視してしまう...

つまりどういうことかというと,GASで外部APIを呼び出しすぎると検索処理が間に合わないのです.  
親フォルダ以下のサブフォルダを全探索する処理が3秒で間に合うはずがありません.  
そこで本来なら必要のないDatabase機能を追加しました.すると圧倒的速度で検索できるようになりました.

APIがボトルネックになる,ということを学びました.
