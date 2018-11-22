//HTMLが読み込まれたときに　firebaseからデータを取得し　一覧表示
$(function(){
  var taskRef = firebase.database().ref('/tasks/');    //データベースの参照を取得（これから作業する部分）

  taskRef.on('child_added', function (snapshot) {
  var tasks = snapshot.val();

  // 一覧を作る
    // tasks.forEach(function(item){
      var userId = snapshot.key;
      var task = tasks.task;
      var time = tasks.time;
      
      console.log('key =' + snapshot.key); // Id
      console.log('item =' + tasks.task); // タスク名
      console.log('item =' + tasks.time); // タイムスタンプ
      
      //カード（li要素）を追加する
      var element = '<li id='+ userId +'><div class="card"><div class="card-body"><h5 class="card-title">'+ task +'</h5><p class="card-text" id="time">'+ time +'</p><button type="button" class="btn btn-primary done_btn" id="done-button">DONE</button><button type="button" class="btn btn-primary modal-button edit-modal" id="edit-button" data-toggle="modal" data-target="#exampleModal">EDIT</button></div></div></li>'
      $('ul').append(element);
    // })
  });  

  //.modal-button　をクリックで modalShow を実行
  $(document).on('click', '.modal-button', modalShow);

  function modalShow(e){
    var target = $(e.target);
    console.log(target);
    if (target.hasClass('add-modal')) {
      // ADDボタンを表示（データ追加用モーダル）
      $('#add-button').css('display', 'block');
      $('#update-button').css('display', 'none');
      $('#delete-button').css('display', 'none');  
    } else if (target.hasClass('edit-modal')) {
      // UPDATE, DELETEボタンを表示（データ編集用モーダル）
      $('#add-button').css('display', 'none');
      $('#update-button').css('display', 'block');
      $('#delete-button').css('display', 'block');

      var targetLi = $(target).parents('li');
      console.log(targetLi);
    //id名を取得
      var listId = targetLi.attr('id');
      console.log(listId)

    //テキストをhtmlから取得
      var targetClass = targetLi.find('.card-title');
      console.log(targetClass);
      var editText = targetClass.text();
      console.log(editText);

    // モーダルのどこかに に保存
      $('.modal-body').addClass(editText);
      
    //取得したテキストを表示させる
      $('#add-text').val(editText);

    //取得した固有idをinputタグに　data属性として持たせる
    var element = $('input')[0]; //html中に出てくる1番目のinput　= element
    console.log(element);
    $.data(element, 'id', listId);
    var result = $.data(element, 'id');
    console.log(result);
    }
  }

    //編集処理
    $(document).on('click', '#update-button', function(e){ 
      console.log('データを編集しました。登録します-------------------');

      var catchId = $('#add-text').data('id');
      console.log(catchId); // id が表示される

      var editTask = $('#add-text').val(); 
      console.log(editTask);

      //カードのタスク名を変更
      $('#' + catchId).find('.card-title').text(editTask);

      

      //timeStamp 作成
    var d = new Date();
    var year  = d.getFullYear();
    var month = d.getMonth() + 1;
    var day   = d.getDate();
    var hour  = ( d.getHours()   < 10 ) ? '0' + d.getHours()   : d.getHours();
    var min   = ( d.getMinutes() < 10 ) ? '0' + d.getMinutes() : d.getMinutes();
    var timeStamp = ( year + '-' + month + '-' + day + ' ' + hour + ':' + min);
    console.log(timeStamp);    


      var updates = {};
      var postData = {
        task: editTask,
        time: timeStamp
      };
      updates[catchId] = postData;
      console.log(updates);
      
      taskRef.update(updates);

      // モーダルを閉じる
      $('.modal').modal('hide');

    });

    

  //タイムスタンプを更新
    //timeStamp 作成
    var d = new Date();
    var year  = d.getFullYear();
    var month = d.getMonth() + 1;
    var day   = d.getDate();
    var hour  = ( d.getHours()   < 10 ) ? '0' + d.getHours()   : d.getHours();
    var min   = ( d.getMinutes() < 10 ) ? '0' + d.getMinutes() : d.getMinutes();
    var timeStamp = ( year + '-' + month + '-' + day + ' ' + hour + ':' + min);
    console.log(timeStamp);    

  // DELETEボタンを押下で　カードとデータを消去
    $('#delete-button').click(function(e){
      console.log("delete ---------------------");
      var target = $(e.target); //$マークをつけて定義することで、Jqueryオブジェクトとして使うことができる
      console.log(target);

      var catchId = $('#add-text').data('id');
      console.log(catchId); // id が表示される

     // データを消去したのでカードを消去する
      $('ul li').each((index, ele) => {
        const key = $(ele).attr('id');
        console.log(key);
        if (key === catchId) {
          $('#' + key).remove();
    }
      });

      // モーダルを閉じる
      $('.modal').modal('hide');

      // firebaseのIDからデータを検索し、データを消去する処理を追加
      taskRef.child(catchId).remove();

    });

  // DONE ボタンを押下で　カードとデータを消去
  $(document).on('click', '.done_btn', function(e){
    console.log("done ---------------------");
    var target = $(e.target); //$マークをつけて定義することで、Jqueryオブジェクトとして使うことができる
    console.log(target);

    var catchId = $(this).parents('li').attr('id');
    console.log(catchId); // id が表示される

   // データを消去したのでカードを消去する
    $('ul li').each((index, ele) => {
      const key = $(ele).attr('id');
      console.log(key);
      if (key === catchId) {
        $('#' + key).remove();
  }
    });

    // firebaseのIDからデータを検索し、データを消去する処理を追加
    taskRef.child(catchId).remove();

  });



  
  // ADDボタンを押下時の処理
  $('#add-button').click(function(){
    //firebaseにデータを登録する処理
    var addText = $('#add-text').val();
    console.log(addText);

    //timeStamp 作成
    var d = new Date();
    var year  = d.getFullYear();
    var month = d.getMonth() + 1;
    var day   = d.getDate();
    var hour  = ( d.getHours()   < 10 ) ? '0' + d.getHours()   : d.getHours();
    var min   = ( d.getMinutes() < 10 ) ? '0' + d.getMinutes() : d.getMinutes();
    var timeStamp = ( year + '-' + month + '-' + day + ' ' + hour + ':' + min);
    console.log(timeStamp);    

    // データをDBにpush（登録）
    taskRef.push({
      task: addText,
      time: timeStamp,
    });
    
    $('#add-text').val(''); //テキストボックスの中身を空にする

    //カード（li要素）を追加する
    // var element = '<li><div class="card"><div class="card-body"><h5 class="card-title">'+ addText +'</h5><p class="card-text" id="time">'+ timeStamp +'</p><a href="#" class="btn btn-primary" id="done-button">DONE</a><a href="#" class="btn btn-primary modal-button edit-modal" id="edit-button" data-toggle="modal" data-target="#exampleModal">EDIT</a></div></div></li>'
    // $('ul').append(element);
  })

});



// ref.child(id名)
// removeで削除