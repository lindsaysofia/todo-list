import format from 'date-fns/format';

const domLogic = (function () {
  const projectsContainer = document.querySelector('#projects-container');
  const content = document.querySelector('#content');
  const currentDate = format(new Date(), 'yyyy/MM/dd');

  const createActionsButton = () => {
    const newActionsButton = document.createElement('button');
    newActionsButton.classList.add('actions');
    newActionsButton.innerHTML = '&hellip;';
    return newActionsButton;
  };

  const createCaretButton = (isActive) => {
    const newCaretButton = document.createElement('button');
    newCaretButton.classList.add('caret');
    newCaretButton.innerHTML = isActive ? '&and;' : '&or;';
    return newCaretButton;
  };

  const createProjectElement = (project, index) => {
    const newProjectElement = document.createElement('div');
    newProjectElement.dataset.index = index;
    newProjectElement.classList.add('project-item');

    const projectTitle = document.createElement('p');
    projectTitle.classList.add('title');
    projectTitle.textContent = project.title;

    newProjectElement.appendChild(projectTitle);
    newProjectElement.appendChild(createActionsButton());

    return newProjectElement;
  };

  const displayProjectList = projects => {
    projectsContainer.innerHTML = '';
    projects.forEach((project, index) => {
      projectsContainer.appendChild(createProjectElement(project, index));
    });
  };

  const createTodoElement = (todo, index) => {
    const newTodoElement = document.createElement('div');
    newTodoElement.dataset.index = index;
    newTodoElement.dataset.project = todo.projectIndex;
    newTodoElement.classList.add('todo-item');

    const mainTodo = document.createElement('div');
    mainTodo.classList.add('main');

    const todoDueDate = document.createElement('p');
    todoDueDate.classList.add('due-date');
    if (todo.priority === 1) {
      todoDueDate.classList.add('high');
    } else if (todo.priority === 2) {
      todoDueDate.classList.add('medium');
    } else if (todo.priority === 3) {
      todoDueDate.classList.add('low');
    }
    todoDueDate.textContent = todo.isDueDateADate ? todo.dueDateAsDate() : todo.dueDateAsDays();

    const todoTitle = document.createElement('p');
    todoTitle.classList.add('title');
    todoTitle.textContent = todo.title;

    mainTodo.appendChild(createCaretButton(todo.isActive));
    mainTodo.appendChild(todoTitle);
    mainTodo.appendChild(todoDueDate);
    mainTodo.appendChild(createActionsButton());

    const expandTodo = document.createElement('div');
    expandTodo.classList.add('expand');
    if (todo.isActive) {
      expandTodo.classList.add('active');
    }

    const todoDescription = document.createElement('p');
    todoDescription.classList.add('description');
    todoDescription.textContent = `Description: ${todo.description}`;
  
    const todoNotes = document.createElement('p');
    todoNotes.classList.add('notes');
    todoNotes.textContent = `Notes: ${todo.description}`;

    const todoChecklist = document.createElement('form');
    todoChecklist.classList.add('checklist');
    const todoChecklistName = document.createElement('p');
    todoChecklistName.textContent = 'Checklist:';
    const todoChecklistItems = document.createElement('ul');
    todo.checklist.forEach(item => {
      let checklistItem = document.createElement('li');
      checklistItem.innerHTML = `<input type="checkbox"><label>${item}</label>`;
      todoChecklistItems.appendChild(checklistItem);
    });
    const todoChecklistInput = document.createElement('input');
    todoChecklistInput.type = 'text';
    const todoChecklistSubmit = document.createElement('input');
    todoChecklistSubmit.type = 'submit';
    todoChecklistSubmit.value = 'Add Todo';
    todoChecklistSubmit.classList.add('submit');
    todoChecklist.appendChild(todoChecklistName);
    todoChecklist.appendChild(todoChecklistItems);
    todoChecklist.appendChild(todoChecklistInput);
    todoChecklist.appendChild(todoChecklistSubmit);

    expandTodo.appendChild(todoDescription);
    expandTodo.appendChild(todoNotes);
    expandTodo.appendChild(todoChecklist);

    newTodoElement.appendChild(mainTodo);
    newTodoElement.appendChild(expandTodo);

    return newTodoElement;
  };

  const displayTodoList = (todoList) => {
    content.innerHTML = '';
    todoList.forEach((todo, index) => {
      content.appendChild(createTodoElement(todo, index));
    })
  };

  const displayAddButton = () => {
    const addButton = document.createElement('button');
    addButton.classList.add('add');
    addButton.textContent = '+';
    document.body.appendChild(addButton);
  };

  const createAddTodoForm = () => {
    const addForm = document.createElement('form');
    addForm.id = "new-todo";
    addForm.innerHTML = `
      <div>
        <label for="new-todo-title">Title: </label>
        <input id="new-todo-title" type="text" placeholder="Todo Title" required>
      </div>
      <div>
        <label for="new-todo-description">Description: </label>
        <input id="new-todo-description" type="text" placeholder="Enter a description" required>
      </div>
      <div>
        <label for="new-todo-notes">Notes: </label>
        <input id="new-todo-notes" type="text" placeholder="Enter some notes" required>
      </div>
      <div>
        <label for="new-todo-due-date">Due Date: </label>
        <input id="new-todo-due-date" type="date" min="${currentDate}" required>
      </div>
      <div>
        <label for="new-todo-priority">Priority: </label>
        <select name="priority" id="new-todo-priority" required>
          <option value="">--Please choose an option--</option>
          <option value="1">High</option>
          <option value="2">Medium</option>
          <option value="3">Low</option>
        </select>
      </div>
      <div>
        <input type="submit" value="Create New Todo">
      </div>      
    `;
    document.body.appendChild(addForm);
  };

  const createActionsList = () => {
    const actionsList = document.createElement('div');
    actionsList.id = 'actions-list';

    const markAsComplete = document.createElement('p');
    markAsComplete.id = 'complete';
    markAsComplete.textContent = 'Mark as Complete';
    const edit = document.createElement('p');
    edit.id = 'edit';
    edit.textContent = 'Edit';
    const del = document.createElement('p');
    del.id = 'delete';
    del.textContent = 'Delete';
;
    actionsList.appendChild(markAsComplete);
    actionsList.appendChild(edit);
    actionsList.appendChild(del);

    document.body.appendChild(actionsList);
  };

  return {
    displayProjectList,
    displayTodoList,
    displayAddButton,
    createActionsList,
    createAddTodoForm,
  };
})();

export default domLogic;