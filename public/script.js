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
      messagesRef.push({text:text});
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
// console.log(message.text);
    if (message.text) {
      var taskcopy = createcard(message,messageKey);
      taskcopy.appendTo($('#messagesDiv'));
      $('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;
    }
  });

  function createcard(message,messageKey) {
      console.log(messageKey);
    var cloneTask = $('#cardDamy').find('div.card').clone(true);
    cloneTask.find('.textMain').text(message.text);
    cloneTask.find('.delete-text').attr('data-key',messageKey);
    cloneTask.find('.edit-text').attr('data-key',messageKey);
    return cloneTask;
  }
});