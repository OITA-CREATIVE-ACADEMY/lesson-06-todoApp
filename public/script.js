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
      
  });
//   messagesRef.on('child_added', function (snapshot) {
//     var message = snapshot.val();
// console.log(message.text);
//     if (message.text) {
//       $("<div class='card pad'><div class='card-body'>"+message.text+"<button type='button' class='btn btn-secondary' data-dismiss='modal'>編集</button></div></div>").appendTo($('#messagesDiv'));
//     //   $('<div/>').text(message.text).prepend($('<em/>').text(message.name+': ')).appendTo($('#messagesDiv'));
//       $('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;
//     }
//   });
//   $('.comment').click(function(){
//     var text = $('#messageInput').val();
//     var now   = moment().format('YYYY-MM-DD HH:mm');
//     createcard(text,now);
// });

messagesRef.on('child_added', function (snapshot) {
    var message = snapshot.val();
// console.log(message.text);
    if (message.text) {
      var taskcopy = createcard(message);
      taskcopy.appendTo($('#messagesDiv'));
      $('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;
    }
  });

  function createcard(message) {
      console.log(message);
    var cloneTask = $('#cardDamy').find('div.card').clone(true);
    cloneTask.find('.textMain').text(message.text);
    return cloneTask;
  }
});