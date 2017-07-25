let taskInput = document.getElementById('new-todo'); //Add a new task.
let addButton = document.getElementsByTagName('button')[0]; //first button
let incompleteTaskHolder = document.getElementById('incomplete-tasks'); //ul of #incomplete-tasks
let completedTasksHolder = document.getElementById('completed-tasks'); //completed-tasks

//New task list item
let createNewTaskElement = function(taskString) {
  let listItem = document.createElement('li');

  //input (checkbox)
  let checkBox = document.createElement('input'); //checkbx
  let label = document.createElement('label'); //label
  let editInput = document.createElement('input'); //text
  let editButton = document.createElement('button'); //edit button
  let deleteButton = document.createElement('button'); //delete button

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

let addTask = function() {
  // Prevents creation of empty tasks
  if (taskInput.value === '') {
    deleteTask(taskInput.value);
  } else {
    //Create a new list item with the text from the #new-todo:
    let listItem = createNewTaskElement(taskInput.value);

    //Append listItem to incompleteTaskHolder
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);

    taskInput.value = '';
    console.log('Add Task');
  }
};

//Edit an existing task.

let editTask = function() {
  console.log('Edit Task');
  
  let listItem = this.parentNode;
  let editInput = listItem.querySelector('input[type=text]');
  let label = listItem.querySelector('label');
  let containsClass = listItem.classList.contains('editMode');

  if (containsClass) {
    label.innerText = editInput.value;
  } else {
    editInput.value = label.innerText;
  }

  //toggle .editmode on the parent.
  listItem.classList.toggle('editMode');
};

//Delete task.
let deleteTask = function() {
  console.log('Delete Task');

  let listItem = this.parentNode;
  let ul = listItem.parentNode;
  //Remove the parent list item from the ul.
  ul.removeChild(listItem);
};


//Completed tasks
let taskCompleted = function() {
  console.log('Complete Task...');
  //Append the task list item to the #completed-tasks
  let listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
};

// Incomplete task
let taskIncomplete = function() {
  console.log('Incomplete Task');
  //Append the task list item to the #incomplete-tasks.
  let listItem = this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
};

// Makes AJAX request
let ajaxRequest = function() {
  console.log('AJAX Request');
};

//Onclick handler
addButton.onclick = addTask;
addButton.addEventListener('click', addTask);
addButton.addEventListener('click', ajaxRequest);

let bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
  console.log('bind list item events');
  //select ListItems children
  let checkBox = taskListItem.querySelector('input[type=checkbox]');
  let editButton = taskListItem.querySelector('button.edit');
  let deleteButton = taskListItem.querySelector('button.delete');
  //Bind editTask to edit button.
  editButton.onclick = editTask;
  //Bind deleteTask to delete button.
  deleteButton.onclick = deleteTask;
  //Bind taskCompleted to checkBoxEventHandler.
  checkBox.onchange = checkBoxEventHandler;
};

//cycle over incompleteTaskHolder ul list items
for (let i = 0; i < incompleteTaskHolder.children.length; i++) {
  //bind events to list items chldren(tasksCompleted)
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

//cycle over completedTasksHolder ul list items
for (let i = 0; i < completedTasksHolder.children.length; i++) {
  //bind events to list items chldren(tasksIncompleted)
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}
