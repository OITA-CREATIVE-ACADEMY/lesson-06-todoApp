$(function(){
    var messagesRef = firebase.database().ref('/');//モーダルを使う為の記述
    $('#myModal').on('shown.bs.modal', function () {
        $('#myInput').trigger('focus')
      })
  $('#messageInput').keypress(function (e) {//enterでも反応させる
    if (e.keyCode == 13) {
      $('.comment').click();
    }
  });

  $('#modal-btn').click(function(){
    $('.comment').show();
    $('.edit-btn').hide();
  });

  $('.comment').click(function(){//テキストと時間の取得
      var text = $('#messageInput').val();
      var time = moment().format('YYYY-MM-DD HH:mm');
      messagesRef.push({text:text,time:time});
      $('#messageInput').val('');
  });
  // $('.edit-text').click(function(snapshot){
    $('.edit-text').on('click',function() {
    const itemKey = $(this).data('key');
    $('.edit-btn').show();
    $('.comment').hide();
    var textmain = messagesRef.child(itemKey);
    // var textmain = this.closest('.textMain');
    console.log(textmain);
    $('#messageInput').val(textmain);
    $('#exampleModal').modal('show');
      $('.edit-btn').click(function(){
        var text = $('#messageInput').val();
        var time = moment().format('YYYY-MM-DD HH:mm');
        writeNewPost(text,itemKey,time);
        $('#messageInput').val('');
      });
    // var utext = snapshot.val().text
    // // タスク名取得
    // // var taskData = $($target).parents('div.task-body').find('span.task_name');
    // var taskName = taskData.text();
    // var taskId = taskData.data('key');
    // $('#edit_task').val(taskName);
    // $('#task-id').val(taskId);
    // $('#edit_task').focus();

    // const itemKey = $(this).data('key');
    // var text = $('#messageInput').val();
    // var time = moment().format('YYYY-MM-DD HH:mm');
    // console.log(messagesRef.child(itemKey));
    // messagesRef.child(itemKey).update({text:text,time:time});
    // $('#messageInput').val('');
    // writeNewPost(text,itemKey);
  });
  $('.delete-text').click(function(){//カードの削除
      const itemKey = $(this).data('key');
      messagesRef.child(itemKey).remove();
      $(this).parents('.text-item').remove();
  });

messagesRef.on('child_added', function (snapshot) {//メッセージを追加する時に自動発火
    var message = snapshot.val();
    var messageKey = snapshot.key;
    var formatDate = message.time;
    if (message.text) {
      var taskcopy = createcard(message,messageKey,formatDate);
      taskcopy.appendTo($('#messagesDiv'));
      $('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;
    }
  });

  function createcard(message,messageKey,formatDate) {//カードを作成
      console.log(formatDate);
    var cloneTask = $('#cardDamy').find('div.card').clone(true);
    cloneTask.find('.textMain').text(message.text);
    cloneTask.find('.delete-text').attr('data-key',messageKey);
    cloneTask.find('.edit-text').attr('data-key',messageKey);
    cloneTask.find('.now').text(formatDate);
    return cloneTask;
  }


  function writeNewPost(text,itemKey,time) {
    // A post entry.
    var postData = {
      text: text,
      time: time,
    };

    var updates = {};
    updates[itemKey] = postData;
    // updates['/user-posts/' + itemKey] = postData;
    return messagesRef.update(updates);
  }
});