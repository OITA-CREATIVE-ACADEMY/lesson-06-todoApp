var database = firebase.database().ref('/'); //データベースでデータの読み書きを行うインスタンス,refはルート
var taskKey;//タスクのkey
$(function(){
   // モーダルを出す
   $('.modal_btn').on('click',function(e) {
    if ($(e.target).hasClass('add_modal')) {
      //追加用のモーダル
      $('.modal-add').show();
      $('.modal-edit').hide();
      $('.modal-title').html('タスクを追加する');
    } else {
      // 編集用のモーダル
      $('.modal-edit').show();
      $('.modal-add').hide();
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
      '<div class="todolist panel panel-primary panel-body task-name">'
      +childData.name+
      '<div class="pull-right"><input type="button" class="btn btn-danger" value="削除" id='
      +childKey+
      ' onclick="del(this);"/> <input type="button" class="btn btn-warning" value="編集" id='
      +childKey+
      ' data-toggle="modal" data-target="#sampleModal" onclick="edit(this);" /></div></div>');   
    });
  });
});
/*追加ボタン*/
function add(){
  var name = $('#todo-add').val();
  database.push({name:name});
};
/*削除ボタン*/
function del(ele){
  database.child(ele.id).remove();
};
/*モーダル内の削除ボタン*/
function del2(){
  database.child(taskKey).remove();
}
/*編集ボタン*/
function edit(ele){
  const item = $(ele).parent('.todolist').text();
  // 編集中のタスクのIDを取得  
  taskKey= $(ele).attr('id');
  $('#todo-edit').val(item);//モーダルに値を渡している
  $('.modal-edit').show();     
  $('.modal-add').hide();
  $('.modal-title').html('タスクを編集する');//html()前のは消される
};
/*空文字を入れる*/
function emp(){
  $('#todo-add').val('');
};
/*完了ボタン*/
function updata(){
  // タスクの入力欄の値を取得
 const newTask = $('#todo-edit').val();
  // json形式でデータを作成
  var updateData = {};
  updateData[taskKey] = {'name': newTask};
  // 変更内容を保存
  var success = database.update(updateData);
};