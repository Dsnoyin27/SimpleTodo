var taskInput = document.getElementById('new-task'); //Add a new task.
var addButton = document.getElementsByTagName('button')[0]; //first button
var incompleteTaskHolder = document.getElementById('incomplete-tasks'); //ul of #incomplete-tasks
var completedTasksHolder = document.getElementById('completed-tasks'); //completed-tasks

//New task list item
var createNewTaskElement = function(taskString) {
  var listItem = document.createElement('li');

  //input (checkbox)
  var checkBox = document.createElement('input'); //checkbx
  var label = document.createElement('label'); //label
  var editInput = document.createElement('input'); //text
  var editButton = document.createElement('button'); //edit button
  var deleteButton = document.createElement('button'); //delete button

  label.innerText = taskString;

  checkBox.type = 'checkbox';
  editInput.type = 'text';

  editButton.innerText = 'Edit';
  editButton.className = 'edit';
  deleteButton.innerText = 'Delete';
  deleteButton.className = 'delete';

  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
};

var addTask = function() {
  // Prevents creation of empty tasks
  if (taskInput.value === '') {
    deleteTask(taskInput.value);
  } else {
    //Create a new list item with the text from the #new-task:
    var listItem = createNewTaskElement(taskInput.value);

    //Append listItem to incompleteTaskHolder
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);

    taskInput.value = '';
    console.log('Add Task');
  }
};

//Edit an existing task.

var editTask = function() {
  console.log('Edit Task');
  
  var listItem = this.parentNode;
  var editInput = listItem.querySelector('input[type=text]');
  var label = listItem.querySelector('label');
  var containsClass = listItem.classList.contains('editMode');

  if (containsClass) {
    label.innerText = editInput.value;
  } else {
    editInput.value = label.innerText;
  }

  //toggle .editmode on the parent.
  listItem.classList.toggle('editMode');
};

//Delete task.
var deleteTask = function() {
  console.log('Delete Task');

  var listItem = this.parentNode;
  var ul = listItem.parentNode;
  //Remove the parent list item from the ul.
  ul.removeChild(listItem);
};


//Completed tasks
var taskCompleted = function() {
  console.log('Complete Task...');
  //Append the task list item to the #completed-tasks
  var listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
};

// Incomplete task
var taskIncomplete = function() {
  console.log('Incomplete Task');
  //Append the task list item to the #incomplete-tasks.
  var listItem = this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
};

// Makes AJAX request
var ajaxRequest = function() {
  console.log('AJAX Request');
};

//Onclick handler
addButton.onclick = addTask;
addButton.addEventListener('click', addTask);
addButton.addEventListener('click', ajaxRequest);

var bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
  console.log('bind list item events');
  //select ListItems children
  var checkBox = taskListItem.querySelector('input[type=checkbox]');
  var editButton = taskListItem.querySelector('button.edit');
  var deleteButton = taskListItem.querySelector('button.delete');
  //Bind editTask to edit button.
  editButton.onclick = editTask;
  //Bind deleteTask to delete button.
  deleteButton.onclick = deleteTask;
  //Bind taskCompleted to checkBoxEventHandler.
  checkBox.onchange = checkBoxEventHandler;
};

//cycle over incompleteTaskHolder ul list items
for (var i = 0; i < incompleteTaskHolder.children.length; i++) {
  //bind events to list items chldren(tasksCompleted)
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

//cycle over completedTasksHolder ul list items
for (var i = 0; i < completedTasksHolder.children.length; i++) {
  //bind events to list items chldren(tasksIncompleted)
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}
