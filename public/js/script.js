$(function(){
    var todoRef = firebase.database().ref('/');

    $('.add_btn').on('click',function() {
        // タスク名取得
        var addTask = $('#add_task').val()
        // 現在の時刻を取得
        var date = moment()
        var formatDate = date.format('YYYY-MM-DD HH:mm')
        console.log(formatDate)
        todoRef.push({
            task: addTask,
            date: formatDate
        });
        $('#add_task').val('');
    });
    todoRef.on('child_added', function (snapshot) {
        var taskData = snapshot.val();
        if (taskData.task) {
            var cloneTask = $('#task-dummy').find('div.panel').clone(true);
            cloneTask.find('.task_name').text(taskData.task);
            $('#task-list').append(cloneTask);
        }
    });
});