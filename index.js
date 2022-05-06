const taskManager = new TaskManager(0);

 const newTaskForm = document.querySelector('#newTaskForm');

newTaskForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const newTaskNameInput = document.querySelector('#newTaskNameInput');
    const newTaskDescription = document.querySelector('#newTaskDescription');
    const newTaskAssignedTo = document.querySelector('#newTaskAssignedTo');
    const newTaskDueDate = document.querySelector('#newTaskDueDate');
    const errorMessage = document.querySelector('#alertMessage');

    const name = newTaskNameInput.value;
    const description = newTaskDescription.value;
    const assignedTo = newTaskAssignedTo.value;
    const dueDate = newTaskDueDate.value;

  taskManager.addTask(name, description, assignedTo, dueDate);  

  taskManager.render();
  
  newTaskNameInput.value = '';
  newTaskDescription.value = '';
  newTaskAssignedTo.value = '';
  newTaskDueDate.value = '';
});
  // Select the Tasks List
const tasksList = document.querySelector('#tasksList');

// Add an 'onclick' event listener to the Tasks List
tasksList.addEventListener('click', (event) => {
    // Check if a "Mark As Done" button was clicked
    if (event.target.classList.contains('done-button')) {
        // Get the parent Task
        const parentTask = event.target.parentElement.parentElement;

        // Get the taskId of the parent Task.
        const taskId = Number(parentTask.dataset.taskId);

        // Get the task from the TaskManager using the taskId
        const task = taskManager.getTaskById(taskId);

        // Update the task status to 'DONE'
        task.status = 'DONE';

        // Render the tasks
        taskManager.render();
    }
    // Check if a "Delete" button was clicked create delet button task number 9
    if (event.target.classList.contains('delete-button')) {
      // Get the parent Task
      const parentTask = event.target.parentElement.parentElement;

      // Get the taskId of the parent Task.
      const taskId = Number(parentTask.dataset.taskId);

      // Delete the task
      taskManager.deleteTask(taskId);

      // Save the tasks to localStorage
      taskManager.save();

      // Render the tasks
      taskManager.render();
  }
    
});

  
