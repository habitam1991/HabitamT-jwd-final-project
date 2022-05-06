const createTaskHtml = (name, description, assignedTo, dueDate, status) => `
  <li class="list-group-item">
        <div class="d-flex w-100 mt-2 justify-content-between align-items-center">
            <h5>${name}</h5>
            <span class="badge "badge ${status === 'TODO' ? 'badge-danger' : 'badge-success'}" badge-danger">${status} </span>
            </div>
          <div class="d-flex w-100 mt-2 justify-content-between">
                <small>${assignedTo}</small>
                <small>${dueDate}</small>
          </div>
          <p>${description}</p>
          <div class="d-flex w-100 justify-content-end">
            <button class="btn btn-outline-success done-button ${status === 'TODO' ? 'visible' : 'invisible'}">Mark As Done</button>
            
        </div>
  </li>`;
                                                          

class TaskManager {
  constructor(currentId = 0){
    this.tasks = [];
    this.currentId = currentId;
  } 

  addTask(name, description, assignedTo, dueDate) {
     const task = {
      id: this.currentId++,
      name: name,
      description: description,
      assignedTo: assignedTo,
      dueDate: dueDate,  
      status: 'TODO'
    };
  
    this.tasks.push(task);
  }
  // Task number 9 
  // Create the deleteTask method
  deleteTask(taskId) {
    // Create an empty array and store it in a new variable, newTasks
    const newTasks = [];

    // Loop over the tasks
    for (let i = 0; i < this.tasks.length; i++) {
        // Get the current task in the loop
        const task = this.tasks[i];

        // Check if the task id is not the task id passed in as a parameter
        if (task.id !== taskId) {
            // Push the task to the newTasks array
            newTasks.push(task);
        }
    }

    // Set this.tasks to newTasks
    this.tasks = newTasks;
  }

  getTaskById(taskId) {
      let foundTask;
  
      for (let i = 0; i < this.tasks.length; i++) {
        const task = this.tasks[i];
  
        if (task.id === taskId) {
          foundTask = task;
        }
      }
  
      return foundTask;
    }
  
    render() {
    const tasksHtmlList = [];

    for(let i = 0; i < this.tasks.length; i++) {
      const task = this.tasks[i];

      const date = new Date(task.dueDate);
      const formattedDate = date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear();

      const taskHtml = createTaskHtml(task.name, task.description, task.assignedTo, formattedDate, task.status);

      tasksHtmlList.push(taskHtml);
    }
    // const tasksHtml = tasksHtml.join('\n');
    const tasksHtml = tasksHtmlList.join('\n');


    const tasksList = document.querySelector('#tasksList');
    tasksList.innerHTML = tasksHtml;
  }
    // Task number 8 step 1
  save() {

    const tasksJson = JSON.stringify(this.tasks);

    localStorage.setItem('tasks', tasksJson);

    const currentId = String(this.currentId);

    localStorage.setItem('currentId', currentId);
  }
  // Task number 8 step 2
  load() {

    if (localStorage.getItem('tasks')) {
      
      const tasksJson = localStorage.getItem('tasks');

      this.tasks = JSON.parse(tasksJson);
    }
    
    if (localStorage.getItem('currentId')) {
      
      const currentId = localStorage.getItem('currentId');

      this.currentId = Number(currentId);
    }
  }
}


