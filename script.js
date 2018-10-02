$(document).ready(function(){

  var database = firebase.database();

  $('.modal').modal();

  $('.add-btn').click(function() {
    $('.modal').modal('open');
  });

  $('.modal-add-btn').click(function() {
    var title = $('#todo-title').val();
    console.log(title);
    var m = moment(); //現在の時刻が入る
    var dateStr = m.format('YYYY-MM-DD HH:mm:ss dddd');
    var obj = {
      title: title,
      date: dateStr
    }
    // obj[dateStr] = title;
    database.ref().push(obj, function(err) {
      if (err) {
        // エラー処理

      } else {

      }
    });
  });

  var starCountRef = firebase.database().ref();
  starCountRef.on('child_added', function(snapshot) {

    var val = snapshot.val();
    console.log(val);
    var template = $('.template').clone(true);
    template.removeClass('template')

    template.css('display', 'block');
    template.html(val.title)
    $('.collection').append(template);
  });
});
