//HTMLが読み込まれたときに　firebaseから取得したデータを表示
$(function(){

  // 新規作成用modalを表示
  function createModal(){
    $('#modal-button').click(function(){
      // ADDボタンのみを表示
      $('#add-button').css('display', 'block');
      $('#update-button').css('display', 'none');
      $('#delete-button').css('display', 'none');
    });
  }

  // EDITボタンを押下で　編集用modalを表示
  function editModal(){
    $('#edit-button').click(function(){
      // UPDATE, DELETEボタンを表示
      $('#update-button').css('display', 'block');
      $('#delete-button').css('display', 'block');
      $('#add-button').css('display', 'none');
      });
  }

  // DELETE, DONE ボタンを押下で　カードとデータを消去
  function deleteData(){
    $('#delete-button').click(function(){
      var target = $(this.target); //$マークをつけて定義することで、Jqueryオブジェクトとして使うことができる
     // firebaseのIDからデータを検索し、データを消去する処理を追加
    });
  }
  
  // ADDボタンを押下で firebaseにデータを登録
  function createData(){
    $('#add-button').click()
  }


  // //タイムスタンプを入れる（後回し）
  //   var timeInMs = Date.now();
  //   console.log(timeInMs);
    
  //   var timeStamp = document.GetElementById("time")
  //   timeStamp.innerHTML = "timeInMs";

  //Dateオブジェクトを利用
  var d = new Date();
  var year  = d.getFullYear();
  var month = d.getMonth() + 1;
  var day   = d.getDate();
  var hour  = ( d.getHours()   < 10 ) ? '0' + d.getHours()   : d.getHours();
  var min   = ( d.getMinutes() < 10 ) ? '0' + d.getMinutes() : d.getMinutes();
  var timeStamp = print( year + '-' + month + '-' + day + ' ' + hour + ':' + min);

  //結果  2011-10-14 00:00:00

});
