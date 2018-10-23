$(function(){
    var messagesRef = firebase.database().ref('/');
    $('#myModal').on('shown.bs.modal', function () {
        $('#myInput').trigger('focus')
      })
  $('#messageInput').keypress(function (e) {
    if (e.keyCode == 13) {
      $('.comment').click();
    }
  });
  $('.comment').click(function(){
      var text = $('#messageInput').val();
      var time = moment().format('YYYY-MM-DD HH:mm');
      messagesRef.push({text:text,time:time});
      $('#messageInput').val('');
  });
  $('.edit-text').click(function(){
    const itemKey = $(this).data('key');
      messagesRef.child(itemKey).update();
  });
  $('.delete-text').click(function(){
      const itemKey = $(this).data('key');
      messagesRef.child(itemKey).set(null);
      $(this).parents('.text-item').remove();
  });

messagesRef.on('child_added', function (snapshot) {
    var message = snapshot.val();
    var messageKey = snapshot.key;
    var formatDate = message.time;
    // var formatDate = moment().format('YYYY-MM-DD HH:mm');
// console.log(message.text);
    if (message.text) {
      var taskcopy = createcard(message,messageKey,formatDate);
      taskcopy.appendTo($('#messagesDiv'));
      $('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;
    }
  });

  function createcard(message,messageKey,formatDate) {
      console.log(formatDate);
    var cloneTask = $('#cardDamy').find('div.card').clone(true);
    cloneTask.find('.textMain').text(message.text);
    cloneTask.find('.delete-text').attr('data-key',messageKey);
    cloneTask.find('.edit-text').attr('data-key',messageKey);
    cloneTask.find('.now').text(formatDate);
    return cloneTask;
  }
});