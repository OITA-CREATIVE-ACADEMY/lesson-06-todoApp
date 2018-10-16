$(function(){
    var messagesRef = firebase.database().ref('/');
    $('#myModal').on('shown.bs.modal', function () {
        $('#myInput').trigger('focus')
      })
  $('#messageInput').keypress(function (e) {
    if (e.keyCode == 13) {
      var name = $('#nameInput').val();//名前取って
      var text = $('#messageInput').val();//コメント取って
      messagesRef.push({name:name, text:text});//pushして
      $('#messageInput').val('');//消す
    }
  });
  $('.comment').click(function(){
    var name = $('#nameInput').val();
      var text = $('#messageInput').val();
      messagesRef.push({name:name, text:text});
      $('#messageInput').val('');
  });
  messagesRef.on('child_added', function (snapshot) {
    var message = snapshot.val();
console.log(message.name);
    if (message.name) {
      $('<div/>').text(message.text).prepend($('<em/>').text(message.name+': ')).appendTo($('#messagesDiv'));
      $('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;
    }
  });
});
