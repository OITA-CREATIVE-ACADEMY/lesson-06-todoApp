// firebaseの設定
// Initialize Firebase
var config = {
  apiKey: "AIzaSyCsi4CV9XWfsFCCpxdtjByWXqIYTCXuiTE",
  authDomain: "todoapp-5007d.firebaseapp.com",
  databaseURL: "https://todoapp-5007d.firebaseio.com",
  projectId: "todoapp-5007d",
  storageBucket: "todoapp-5007d.appspot.com",
  messagingSenderId: "973143086716"
};
firebase.initializeApp(config);

window.onload = function() {

  // 日付の取得
  var nowDate = new Date();
  var year = nowDate.getFullYear();
  var month = ("0" + (nowDate.getMonth() + 1)).slice(-2);
  var week = nowDate.getDay();
  var day = ("0" + nowDate.getDate()).slice(-2);
  var hour = ("0" + nowDate.getHours()).slice(-2);
  var minute = ("0" + nowDate.getMinutes()).slice(-2);
  var yobi = new Array("(Sun)", "(Mon)", "(Tue)", "(Wed)", "(Thu)", "(Fry)", "(Sat)");

  var date = year + "." + month + "." + day + yobi[week] + "　" + hour + ":" + minute;

  // firebaseでデータの登録
  var database = firebase.database();
  var addTaskRef = database.ref('/task/');

  $(".todoButton_add").on('click', function() {
    nowDate = new Date();
    var addTitle = $(".todoTitle_create").val();
    addTaskRef.push({
      title: addTitle,
      date: date
    });
    addTitle = "";
    $(".modal").fadeOut(500);
    addTitle = "";
  });

  // HTMLを更新
  addTaskRef.on('child_added', function(snapshot) {
    var todoTask = snapshot.val();
    var taskId = snapshot.key;

    if (todoTask.title) {
      var title = todoTask.title;
      var date = todoTask.date;
      nowDate = new Date();
      // HTMLにカードを追加
      var addCard = '<li class="todo_card" id="' + taskId + '"><div class="todo_title"><h4>' + title + '</h4></div><div class="todo_card_buttons"><button class="todoButton_done" ">DONE</button><button class="todoButton_edit">EDIT</button></div><div class="todoDate">' + date + '</div> </li>';
      $(".todo_list").append(addCard);
      $('.todo_list')[0].scrollTop = $('.todo_list')[0].scrollHeight;
    }
  });

  // 編集用モーダルは初期非表示
  $(".edit").css("display", "none");

  // DONEボタンを押す
  $(document).on('click', ".todoButton_done", function() {
    // アラートで確認
    if (!confirm('実行済みのタスクを削除しますか？')) {
      /* キャンセルの時の処理 */
      return false;
    } else {
      /* OKの時の処理 */
      var doneID = $(this).parents(".todo_card").attr("id");
      var doneTitle = $(this).parents(".todo_card").find("h4").text();

      var success = addTaskRef.child(doneID).remove();
      if (success) {
        $('#' + doneID).remove();
      }
    }
  });

  // EDITボタンを押す
  $(document).on('click', ".todoButton_edit", function() {
    var editTitle = $(this).parents(".todo_card").find("h4").text();
    var editID = $(this).parents(".todo_card").attr("id");

    $(".edit_title").val(editTitle);
    $(".edit").css("display", "flex");
    $(".entry").css("display", "none");
    $(".modal").fadeIn().css("display", "flex");

    // DELETEボタンを押す
    $(document).on('click', ".todoButton_delete", function() {
      // アラートで確認
      if (!confirm('タスクを削除しますか？')) {
        /* キャンセルの時の処理 */
        return false;
      } else {
        /*　OKの時の処理 */
        $(".modal").fadeOut(500);
        var success = addTaskRef.child(editID).remove();
        if (success) {
          $('#' + editID).remove();
        }
      }
    });
    // UPDATEボタンを押す
    $(document).on('click', ".todoButton_update", function() {
      var editedTitle = $(".edit").children(".edit_title").val();

      // json形式でデータを作成
      var updates = {};
      updates[editID + '/title'] = editedTitle;
      updates[editID + '/date'] = date;
      // 変更内容を保存
      var success = addTaskRef.update(updates);
      if (success) {
        // 変更が成功したらHTMLも変更
        var span_task = $('#' + editID).find('h4');
        $(span_task).html(editedTitle);
      }
      $(".modal").fadeOut(500);
    });
  });


  // 新規作成ボタンを押すとモーダル出現
  $(".entryButton").on('click', function() {
    $(".edit").css("display", "none");
    $(".entry").children(".todoTitle_create").val("");
    $(".entry").css("display", "flex");
    $(".modal").fadeIn().css("display", "flex");
  });
  // モーダルの×ボタンで閉じる
  $(".closeButton").on('click', function() {
    $(".modal").fadeOut(500);
  });
};
