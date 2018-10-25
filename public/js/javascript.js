var database = firebase.database().ref('/'); //データベースでデータの読み書きを行うインスタンス,refはルート
$(function(){
   // モーダルを出す
   $('.modal_btn').on('click',function(e) {
     console.log(e.target);
    if ($(e.target).hasClass('add_modal')) {
      //追加のモーダル
      $('.modal-add').show();
      $('.modal-edit').hide();
      $('.modal-title').html('タスクを追加する');
    } else {
      // 編集のモーダル
      $('.modal-edit').show();
      $('.modal-add').hide();
      // タスク名取得  
    }

  });
  /*表示*/
  database.on('value', function (snapshot) { //イベントハンドラ、dataabaseに接続している
    $(".todo").empty();
    snapshot.forEach(function(childSnapshot) {
    var childKey = childSnapshot.key;
    var childData = childSnapshot.val();
    console.log(childData.name);
    $('#todoDiv').prepend(
      '<div class="todolist">'
      +childData.name+
      '<input type="button" class="btn btn-danger" value="削除" id='
      +childKey+
      ' onclick="del(this);"/> <input type="button" class="btn btn-warning" value="編集" id='
      +childKey+
      ' data-toggle="modal" data-target="#sampleModal" onclick="edit(this);" /></div>');   
    });
  });
});
/*追加*/
function add(){
  console.log("追加できてるよ");
  var name = $('#todo-add').val();
  database.push({name:name});
};
/*削除*/
function del(ele){
  database.child(ele.id).remove();

};
function edit(ele){
 console.log("edit押せてるよ");
 console.log(ele);
 const item = $(ele).parent('.todolist').text();
 console.log(item);
// 編集中のタスクのIDを取得  
const taskKey= $(ele).attr('id');
console.log(taskKey);


$('#comeId').html(taskKey);
$('#todo-edit').val(item);//モーダルに値を渡している


 $('.modal-edit').show();     
 $('.modal-add').hide();
 $('.modal-title').html('タスクを編集する');//html()前のは消される

};
/*空文字を入れる*/
function  emp(){
  $('#todo-add').val('');
};
function updata(){
  // タスクの入力欄の値を取得
 const newTask = $('#todo-edit').val();
 console.log(newTask);
// 編集中のタスクのIDを取得  
 const comeKey = $('#comeId').text();
 console.log(comeKey);
// json形式でデータを作成


var updateData = {};
updateData[comeKey] = {'name': newTask};

console.log(updateData);
// 変更内容を保存
var success = database.update(updateData);

console.log(success);
// if (success) {
//     // 変更が成功したらHTMLも変更
//     var span_task = $('#' + taskId).find('.task_name');
//     $(span_task).html(editTask);
// }

};