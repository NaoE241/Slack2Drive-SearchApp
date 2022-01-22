// 検索したい親ドライブのID
var url = "XXXXXXXXXXXXXXXXXXXX"

// Drive Database GSSのID
var database = 'XXXXXXXXXXXXXXXXXXXXXXXXXXX';

// 検索したいドライブの選択肢を増やす場合はここで
// その場合はボタンも追加してください
// 選択肢はSlackの制限上、5個まで増やせます
var folder_list = [];
var file_list = [];
var drive_id = {
  "general"         : url
}
var id_order = {
  "general"         : 1
}

//検索クエリに合致するすべてのファイルを取得するプログラム
function fileSearch1(s_word) {
  var searchedFiles = DriveApp.searchFiles(s_word);
  
  while (searchedFiles.hasNext()) {
    let file = searchedFiles.next();
    let hyperurl = "<" + file.getUrl() + "|" + file.getName() + ">";
    file_list.push(hyperurl);
  }
}

function getSearchObj(area){
  // Drive Database GSSに接続
  var ss = SpreadsheetApp.openById(database);
  var sheetName = ss.getSheetByName("IDList");

  var searchObj = sheetName.getRange(id_order[area] + 1, 2).getValue();
  
  return searchObj;
}

function doPost(e) {
  // ペイロード部分の取り出し
  var payload = JSON.parse(e["parameter"]["payload"]);
  var name = payload["actions"][0]["name"];
  var value = payload["actions"][0]["value"];
  var id = drive_id[name];

  username = e.user_name;
  searchtext = value;
  log = [username,searchtext];

  // 「終了」という選択肢が選ばれた時のみ異なる処理をしてボタンを消す(ボタン無しメッセージで上書きする)
  if (value == "quit"){
    // 終了時
    var reply = {
      "attachments": [
        {
          "text": "要望などはこちらへお願いします!",
          "color": "#00bfff"
        }
      ]
    };
    return ContentService.createTextOutput(JSON.stringify(reply)).setMimeType(ContentService.MimeType.JSON);
  }

  var searchObj = "(" + getSearchObj(name) + ")" + " and title contains" + " '" + value + "' ";

  fileSearch1(searchObj, id);

  var num = file_list.length;
  if(num != 0){
    var output = file_list.join("\n");
  }
  else{
    var output = "Not found.";
  }

  var head_text = "検索結果";
  var quest_attachment = {
    "title": "以下の" + num + "個のファイルが見つかりました.",
    "text": output,
    "fallback": "Opps",
    "callback_id": "callback_button",
    "color": "#00bfff",
    "attachment_type": "default",
    "actions": [
      {
        "name": "exit",
        "text": "Exit",
        "type": "button",
        "value": "quit"
      }
    ]
  };

    // 送信されるメッセージの定義
  var new_rep = {
    "text": head_text,
    "attachments": [
      quest_attachment
    ]
  };

  // それ以外の場合は選択肢メッセージを出し続ける
  return ContentService.createTextOutput(JSON.stringify(new_rep)).setMimeType(ContentService.MimeType.JSON);
  
}