function domLogic() {
  const projectsContainer = document.querySelector('#projects-container');
  const content = document.querySelector('#content');

  const createActionsButton = () => {
    const newActionsButton = document.createElement('button');
    newActionsButton.classList.add('actions');
    newActionsButton.innerHTML = '&hellip;';
    return newActionsButton;
  };

  const createCaretButton = () => {
    const newCaretButton = document.createElement('button');
    newCaretButton.classList.add('caret');
    newCaretButton.textContent = `&or;`;
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
  };

  const displayProjectList = projects => {
    projects.forEach(project => {
      projectsContainer.appendChild(createProjectElement(project));
    });
  };

  const createTodoElement = (todo, index) => {
    const newTodoElement = document.createElement('div');
    newTodoElement.dataset.index = index;
    newTodoElement.classList.add('todo-item');

    const mainTodo = document.createElement('div');
    mainTodo.classList.add('main');

    const todoTitle = document.createElement('p');
    todoTitle.classList.add('title');
    todoTitle.textContent = todo.title;
    
    const todoDueDate = document.createElement('p');
    todoDueDate.classList.add('due-date');
    todoDueDate.textContent = todo.dueDateAsDays();

    mainTodo.appendChild(createCaretButton());
    mainTodo.appendChild(todoTitle);
    mainTodo.appendChild(createActionsButton());
    mainTodo.appendChild(todoDueDate);

    const expandTodo = document.createElement('div');
    expandTodo.classList.add('expand');

    const todoDescription = document.createElement('p');
    todoDescription.classList.add('description');
    todoDescription.textContent = `Description: ${todo.description}`;
  
    const todoNotes = document.createElement('p');
    todoNotes.classList.add('notes');
    todoNotes.textContent = `Notes: ${todo.description}`;

    const todoChecklist = document.createElement('div');
    todoChecklist.classList.add('checklist');
    const todoChecklistName = document.createElement('p');
    todoChecklistName.textContent = 'Checklist:';
    const todoChecklistItems = document.createElement('ul');
    todo.checklist.forEach(item => {
      let checklistItem = document.createElement('li');
      checklistItem.textContent = item;
      todoChecklistItems.appendChild(checklistItem);
    });
    todoChecklist.appendChild(todoChecklistName);
    todoChecklist.appendChild(todoChecklistItems);

    expandTodo.appendChild(todoDescription);
    expandTodo.appendChild(todoNotes);
    expandTodo.appendChild(todoChecklist);

    newTodoElement.appendChild(mainTodo);
    newTodoElement.appendChild(expandTodo);

    return newTodoElement;
  };

  const displayTodoList = todoList => {
    todoList.forEach(todo => {
      content.appendChild(createTodoElement(todo));
    })
  };
}