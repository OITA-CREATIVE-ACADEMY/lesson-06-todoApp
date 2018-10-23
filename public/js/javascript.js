var database = firebase.database().ref('/'); //データベースでデータの読み書きを行うインスタンス,refはルート
$(function(){
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
              '<input type="button" class="btn btn-danger" value="DELETE" id='
              +childKey+
              ' onclick="del(this);"/> <input type="button" class="btn btn-warning" value="EDIT" id='
              +childKey+
              ' data-toggle="modal" data-target="#sampleModal" onclick="edit(this);" /></div>');   
          });
        });

});
/*追加*/
function add(){
  console.log("追加できてるよ");
  var name = $('#todo').val();
  database.push({name:name});
  $('#todo').val('');
};
/*削除*/
function del(ele){
  database.child(ele.id).remove();
};
function edit(ele){
 console.log("edit押せてるよ");

};