$(function(){

    var ROOT_PATH = '/tasks/';

    var todoRef = firebase.database().ref(ROOT_PATH);

    /**
     * タスクの追加
     */
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

    /**
     * タスクの参照
     */
    todoRef.on('child_added', function (snapshot) {
        var taskData = snapshot.val();
        if (taskData.task) {
            var cloneTask = $('#task-dummy').find('div.panel').clone(true);
            cloneTask.find('.task_name').text(taskData.task);
            cloneTask.find('.task_name').attr('data-key',snapshot.key);
            $('#task-list').append(cloneTask);
        }
    });

    /**
     * タスクの変更
     */
    $('.edit_btn').on('click',function(e) {
        var $target = $(e.target);

        // タスク名取得
        var taskData = $($target).parents('div.task-body').find('span.task_name');
        var taskName = taskData.text();
        var taskId = taskData.data('key');
        $('#edit_task').val(taskName);
        $('#task-id').val(taskId);
        $('#edit_task').focus();
    });

    $('.update_done_btn').on('click',function(e) {

        var taskName = $('#edit_task').val();
        var taskId = $('#task-id').val();

        var updates = {};
        updates[taskId + '/task'] = taskName;
        if (todoRef.update(updates)) {
            $('[data-key=' + taskId + ']').text(taskName);
        }
      
        return ;
    });

});