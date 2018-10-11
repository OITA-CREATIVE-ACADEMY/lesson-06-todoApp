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
            date: formatDate,
            comp: false
        });
        $('#add_task').val('');
    });

    /**
     * タスクの参照
     */
    todoRef.on('child_added', function (snapshot) {
        var taskData = snapshot.val();
        if (taskData.task) {
            if (!taskData.comp) {
                var taskDom = getTaskDom(taskData.task,snapshot.key,taskData.date)
                $('#task-list').append(taskDom);
            } else {
                var taskDom = getTaskDom(taskData.task,snapshot.key,taskData.date)
                taskDom.find('button').remove();
                $('#comp-task-list').append(taskDom);
            }
        }
    });

    // 追加するタスクのhtmlを取得する
    function getTaskDom(taskName,taskId,date){
        var cloneTask = $('#task-dummy').find('div.panel').clone(true);
        cloneTask.find('.task_name').text(taskName);
        cloneTask.find('.task_name').attr('data-key',taskId);
        cloneTask.find('.update_at').text(date);
        return cloneTask;
    }

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

        // 現在の時刻を取得
        var date = moment()
        var formatDate = date.format('YYYY-MM-DD HH:mm')

        var updates = {};
        updates[taskId + '/task'] = taskName;
        updates[taskId + '/date'] = formatDate;
        if (todoRef.update(updates)) {
            $('[data-key=' + taskId + ']').text(taskName);
        }
      
    });

    /**
     * タスクが完了
     */
    $('.done_btn').on('click',function(e){

        var $target = $(e.target);
        // タスク取得
        var date = $($target).parents('div.task-body').find('span.update_at');
        var taskData = $($target).parents('div.task-body').find('span.task_name');
        var taskId = taskData.data('key');

        // 現在の時刻を取得
        var date = moment()
        var formatDate = date.format('YYYY-MM-DD HH:mm')

        var updates = {};
        updates[taskId + '/comp'] = true;
        updates[taskId + '/date'] = formatDate;
        if (todoRef.update(updates)) {
            deletePanel($target);
            var taskDom = getTaskDom(taskData.text(),taskId,formatDate);
            taskDom.find('button').remove();
            $('#comp-task-list').append(taskDom);
        }
        
    });

    /**
     * タスクの削除
     */
    $('.delete_btn').on('click',function(e){
        // タスク取得
        var taskName = $('#edit_task').val();
        var taskId = $('#task-id').val();

        if(!confirm(taskName + 'を削除してもよろしいですか？')) {
            return false;
        } else {

        if (todoRef.child(taskId).remove()) {
            deletePanel($('[data-key=' + taskId + ']'));
        }
    }
        
    });

    /**
     * タスクの表示削除
     */
    function deletePanel(target) {
        var taskPanel = $(target).parents('div.task-panel');
        $(taskPanel).remove();
    }
});