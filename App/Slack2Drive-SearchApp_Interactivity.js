// Verification Tokenで取得するトークン
// oAuth：任意チャンネルへメッセージを送れるようにしてください
var slack_token = 'XXXXXXXXXXXXXXXXXXXXX';

// ユーザーログ蓄積GSSのID
var logsheet = 'XXXXXXXXXXXXXXXXXXXXXXXXXXX'


function doPost(e) {
  // 指定したチャンネルからの命令しか受け付けない
  if (slack_token != e.parameter.token) {
    throw new Error(e.parameter.token);
  }
  
  var word = encodeURIComponent(e.parameter.text);
  
  // ユーザーログを取りたい方向け
  /*
  var ss = SpreadsheetApp.openById(logsheet);
  var username = encodeURIComponent(e.parameter.user_name);
  var date = new Date();
  var timestamp = Utilities.formatDate( date, 'Asia/Tokyo', 'yyyy/MM/dd HH:mm:ss')
  var log = [[timestamp,username,word]];
  var logsh = ss.getSheetByName("Log");
  var lastRow = logsh.getLastRow();
  var range = logsh.getRange(lastRow + 1, 1, 1, 3);
  range.setValues(log);
  */

// 返答データ本体
  var data = {
    "text": "検索したいエリアを選択してください", //アタッチメントではない通常メッセージ
    "response_type":"ephemeral", // ここを"ephemeral"から"in_chanel"に変えると他の人にも表示されるらしい（？）
    //アタッチメント部分
    "attachments": [{
      "title": "Area Select",//　アタッチメントのタイトル
      "text": "Please select Area.",//アタッチメント内テキスト
      "fallback": "Exec Failed",//ボタン表示に対応してない環境での表示メッセージ. 
      "callback_id": "callback_button",
      "color": "#00bfff", //左の棒の色を指定する
      "attachment_type": "default",
      // ボタン部分
      "actions": [
        //ボタン1
        {
          "name": "general",
          "text": "General",
          "type": "button",//
          "value": word
        }
        ]
      }]
  };
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}