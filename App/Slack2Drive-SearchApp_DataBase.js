// 定期的にDBを更新できるようにトリガーを設定することをお勧めします

// DBとして使うGSSのID
// IDListという空タブを作ってください
// そのタブのA1セルにA、B1セルにBを入力しないとエラーが出ます
var database = "XXXXXXXXXXXXXXXXXX"

// 検索したい親ドライブのID
var url = "XXXXXXXXXXXXXXXXXXX"

var search;
var rowIndex = 2;
var colIndex = 1;
var folderlist = [];
var Area_List = ["General"];
var ID_List = {
  "General"         : url
};

function main(){
  Area_List.forEach(function(key){
    getListInFolder(key);
  });
}

function getListInFolder(Area) {
  folderlist = [];
  var ss = SpreadsheetApp.openById(database);
  var sheetName = ss.getSheetByName("IDList");

  var folder_id = ID_List[Area];

  var url = 'https://drive.google.com/drive/folders/' + folder_id;
  var paths = url.split('/'); // Separate URL into an array of strings by separating the string into substrings
  var folderId = paths[paths.length - 1];

  // 初期化処理
  // rangeList.clearContent();

  getFiletree(folderId);

  range = sheetName.getRange(rowIndex,colIndex);

  // 対象の範囲にまとめて書き出します
  range.setValue(Area);

  range = sheetName.getRange(rowIndex,colIndex + 1);

  // 対象の範囲にまとめて書き出します
  range.setValue("'" + search);

  rowIndex ++;
}

function getFiletree(folderid){
    /* 基準フォルダから下のフォルダ階層をすべてリストアップする */
    let key = folderid;
    let stt = DriveApp.getFolderById(key);
    let i = 0;
    let j = 0;

    // 開始フォルダ
    folderlist.push([stt, key]);
    search = "'" + key + "' in parents "; 
    name = stt + '/';

    do {
      //フォルダ一覧取得
      let folders = DriveApp.searchFolders("'"+key+"' in parents");
      //フォルダ一覧からフォルダ名称とIdを取得
      while(folders.hasNext()){
        i++;
        let folder = folders.next();
        folderlist.push([folder.getName(),folder.getId()]);
        search = search + "or '" + folder.getId() + "' in parents ";
      }
      //フォルダ名称とIdを取り出す
      j++;
      if(j <= i){
        key = folderlist[j][1];
      }
    } while (j <= i);
}

// GSSと直接連携している場合は、更新をGSSからできます
// 一度この関数を実行すると、GSSのメニューにファイル一覧を取得という機能が追加されます
function onOpen(){

  var menu=[
    {name: "ファイル一覧を取得", functionName: "getListInFolder"}
  ];

  SpreadsheetApp.getActiveSpreadsheet().addMenu("コマンド",menu); //メニューを追加

}