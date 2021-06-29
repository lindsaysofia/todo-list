import todo from './todo';
import project from './project';
import domLogic from './domLogic';

const applicationLogic = (function () {
  const projects = [];
  const content = document.querySelector('#content');
  let actionsList;
  let actionsComplete;
  let actionsEdit;
  let actionsDelete;
  let lastActionElement;
  let activeProjectIndex;

  const clearActiveProject = () => {
    const activeProject = document.querySelector('.project-item.active');
    activeProject.classList.remove('active');
    content.innerHTML = '';
  };

  const activateProject = e => {
    clearActiveProject();
    let projectItem = e.target.classList[0] === 'project-item' ? e.target : e.target.parentElement;
    activeProjectIndex = projectItem.dataset.index;
    projectItem.classList.add('active');
    domLogic.displayTodoList(projects[activeProjectIndex].todoList);
    addEventListeners();
  };

  const hideActions = () => {
    actionsList.classList.remove('active');
  };

  const showActions = e => {
    actionsList.classList.add('active');
    if (e.target.parentElement.classList[0] === 'project-item') {
      actionsList.style.left = `${e.target.offsetLeft}px`;
      actionsList.style.top = `${e.target.offsetTop - e.target.offsetHeight/4}px`;
      actionsEdit.style.display = 'block';
      lastActionElement = e.target.parentElement;
    } else if (e.target.parentElement.classList[0] === 'main') {
      actionsList.style.left = `${e.target.offsetLeft - (e.target.offsetWidth*3.5)}px`;
      actionsList.style.top = `${e.target.offsetTop - e.target.offsetHeight/4}px`;
      actionsEdit.style.display = 'none';
      lastActionElement = e.target.parentElement.parentElement;
    }
  };

  const handleProjectCompleteAndDelete = projectIndex => {
    projects.splice(projectIndex, 1);
    domLogic.displayProjectList(projects);
    domLogic.displayTodoList(projects.length === 0 ? [] : projects[0].todoList);
    activeProjectIndex = 0;
    addEventListeners();
  };

  const handleTodoCompleteAndDelete = (todoIndex, projectIndex) => {
    projects[projectIndex].todoList.splice(todoIndex, 1);
    domLogic.displayTodoList(projects[projectIndex].todoList);
    addEventListeners();
  };

  const handleCompleteAndDelete = () => {
    if (lastActionElement.classList[0] === 'project-item') {
      handleProjectCompleteAndDelete(lastActionElement.dataset.index);
    } else if (lastActionElement.classList[0] === 'todo-item') {
      handleTodoCompleteAndDelete(lastActionElement.dataset.index, activeProjectIndex);
    }
  };

  const handleProjectChange = e => {
    let newTitle = e.target.textContent;
    projects[activeProjectIndex].title = newTitle;
  };

  const handleProjectChangeEnd = () => {
    let title = lastActionElement.querySelector('.title');
    title.contentEditable = false;
  };

  const handleProjectEdit = (projectIndex) => {
    let title = lastActionElement.querySelector('.title');
    title.contentEditable = true;
    activeProjectIndex = projectIndex;
    title.focus();
  };

  const handleNewChecklistItem = e => {
    e.preventDefault();
    let newTodoValue = e.target[e.target.length - 2].value;
    if (newTodoValue === '') return;
    let todoIndex = e.target.parentElement.parentElement.dataset.index;
    projects[activeProjectIndex].todoList[todoIndex].checklist.push(newTodoValue);
    domLogic.displayTodoList(projects[activeProjectIndex].todoList);
    addEventListeners();
  };

  const toggleTodoExpand = e => {
    let todoItemElement = e.target.parentElement.parentElement;
    let todoItemIndex = todoItemElement.dataset.index;
    let todoExpand = todoItemElement.querySelector('.expand');
    todoExpand.classList.toggle('active');
    let todo = projects[activeProjectIndex].todoList[todoItemIndex];
    todo.isActive = !todo.isActive;
    e.target.innerHTML = todo.isActive ? '&and;' : '&or;';
  };

  const toggleDueDate = e => {
    let todoItemElement = e.target.parentElement.parentElement;
    let todoItemIndex = todoItemElement.dataset.index;
    let todo = projects[activeProjectIndex].todoList[todoItemIndex];
    todo.isDueDateADate = !todo.isDueDateADate;
    e.target.innerHTML = todo.isDueDateADate ? todo.dueDateAsDate() : todo.dueDateAsDays();
  };

  const handleNewProject = () => {
    handleCloseAddNew();
    const addForm = document.querySelector('#new-project-container');
    addForm.classList.add('active');
    addForm.style.top = `${(document.body.offsetHeight / 2) - (addForm.offsetHeight / 2)}px`;
    addForm.style.left = `${(document.body.offsetWidth / 2) - (addForm.offsetWidth / 2)}px`;
  };

  const handleNewTodo = () => {
    handleCloseAddNew();
    const addForm = document.querySelector('#new-todo-container');
    const addFormProjects = document.querySelector('#new-todo-project');
    addForm.classList.add('active');
    addFormProjects.innerHTML = '';
    addFormProjects.innerHTML = `            
      <option value="">--Please choose an option--</option>
      ${(projects.map((project, index) => {
        return `<option value="${index}">${project.title}</option>`;
      })).join('')}`;
    addForm.style.top = `${(document.body.offsetHeight / 2) - (addForm.offsetHeight / 2)}px`;
    addForm.style.left = `${(document.body.offsetWidth / 2) - (addForm.offsetWidth / 2)}px`;
  };

  const handleAddButton = () => {
    handleCloseProjectForm();
    handleCloseTodoForm();
    const addNew = document.querySelector('#create-new-item');
    addNew.classList.add('active');
    addNew.style.top = `${(document.body.offsetHeight / 2) - (addNew.offsetHeight / 2)}px`;
    addNew.style.left = `${(document.body.offsetWidth / 2) - (addNew.offsetWidth / 2)}px`;
  };

  const handleCloseAddNew = () => {
    const addForm = document.querySelector('#create-new-item');
    addForm.classList.remove('active');
  };

  const handleCloseProjectForm = () => {
    const addForm = document.querySelector('#new-project-container');
    addForm.classList.remove('active');
  };

  const handleCloseTodoForm = () => {
    const addForm = document.querySelector('#new-todo-container');
    addForm.classList.remove('active');
  };

  const handleNewTodoSubmit = e => {
    e.preventDefault();
    let title = e.target[0].value;
    let description = e.target[1].value;
    let notes = e.target[2].value;
    let dueDate = new Date(e.target[3].value);
    let priority = e.target[4].value;
    let projectIndex = e.target[5].value;
    projects[projectIndex].todoList.push(todo(title, description, dueDate, priority, notes, [], projectIndex));
    domLogic.displayProjectList(projects);
    const activeProject = document.querySelectorAll('.project-item')[activeProjectIndex];
    activeProject.classList.add('active');
    domLogic.displayTodoList(projects[activeProjectIndex].todoList);
    addEventListeners();
    handleCloseTodoForm();
  }

  const handleNewProjectSubmit = e => {
    e.preventDefault();
    let title = e.target[0].value;
    projects.push(project(title, []));
    domLogic.displayProjectList(projects);
    const activeProject = document.querySelectorAll('.project-item')[activeProjectIndex];
    activeProject.classList.add('active');
    domLogic.displayTodoList(projects[activeProjectIndex].todoList);
    addEventListeners();
    handleCloseProjectForm();
  };

  const addEventListeners = () => {
    const projectItems = document.querySelectorAll('.project-item');
    const projectItemTitles = document.querySelectorAll('.project-item .title');
    const actionsButtons = document.querySelectorAll('.actions');
    const forms = document.querySelectorAll('form.checklist');
    const carets = document.querySelectorAll('.caret');
    const dueDates = document.querySelectorAll('.due-date');
    const addButton = document.querySelector('.add');
    const closeAddNewButton = document.querySelector('.close-new-add-container');
    const closeTodoButton = document.querySelector('.close-todo-form');
    const closeProjectButton = document.querySelector('.close-project-form');
    const addNewProjectButton = document.querySelector('.add-new-project');
    const addNewTodoButton = document.querySelector('.add-new-todo');
    const newTodoForm = document.querySelector('#new-todo');
    const newProjectForm = document.querySelector('#new-project');

    projectItems.forEach(projectItem => projectItem.addEventListener('click', activateProject));
    projectItemTitles.forEach(title => {
      title.addEventListener('input', handleProjectChange);
      title.addEventListener('blur', handleProjectChangeEnd);
    });
    actionsButtons.forEach(actionButton => actionButton.addEventListener('mouseenter', showActions));
    actionsList.addEventListener('mouseleave', hideActions);
    actionsComplete.addEventListener('click', handleCompleteAndDelete);
    actionsEdit.addEventListener('click', handleProjectEdit);
    actionsDelete.addEventListener('click', handleCompleteAndDelete);
    forms.forEach(form => form.addEventListener('submit', handleNewChecklistItem));
    carets.forEach(caret => caret.addEventListener('click', toggleTodoExpand));
    dueDates.forEach(dueDate => dueDate.addEventListener('click', toggleDueDate));
    addButton.addEventListener('click', handleAddButton);
    closeAddNewButton.addEventListener('click', handleCloseAddNew);
    addNewProjectButton.addEventListener('click', handleNewProject);
    closeProjectButton.addEventListener('click', handleCloseProjectForm);
    addNewTodoButton.addEventListener('click', handleNewTodo);
    closeTodoButton.addEventListener('click', handleCloseTodoForm);
    newTodoForm.addEventListener('submit', handleNewTodoSubmit);
    newProjectForm.addEventListener('submit', handleNewProjectSubmit);
  };

  const initiateTodoProject = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const defaultProject = project(`Let's Get This Bread`, []);
    const defaultTodo00 = todo('Start a todo list :)', 'I need to start a todo list.', tomorrow, 1, 'Add some notes here', ('This Is A Checklist').split(' '), 0);
    const defaultTodo01 = todo('Start a todo list :)', 'I need to start a todo list.', tomorrow, 2, 'Add some notes here', ('This Is A Checklist').split(' '), 0);
    const defaultProject2 = project(`Let's Get This Bread Part 2 Let's Get This Bread Part 2`, []);
    const defaultTodo10 = todo('Start a todo list Part 2 :) Start a todo list Part 2 :) Start a todo list Part 2 :) Start a todo list Part 2 :)', 'I need to start a todo list.', tomorrow, 3, 'Add some notes here', ('This Is A Checklist').split(' '), 1);
    const defaultTodo11 = todo('Start a todo list Part 2 :) Start a todo list Part 2 :) Start a todo list Part 2 :) Start a todo list Part 2 :)', 'I need to start a todo list.', tomorrow, 1, 'Add some notes here', ('This Is A Checklist').split(' '), 1);
    defaultProject.todoList.push(defaultTodo00);
    defaultProject.todoList.push(defaultTodo01);
    defaultProject2.todoList.push(defaultTodo10);
    defaultProject2.todoList.push(defaultTodo11);
    projects.push(defaultProject);
    projects.push(defaultProject2);
    
    domLogic.displayProjectList(projects);
    domLogic.displayTodoList(projects[0].todoList);
    let firstProject = document.querySelector('.project-item');
    firstProject.classList.add('active');
    activeProjectIndex = 0;

    domLogic.displayAddButton();
    domLogic.createActionsList();
    domLogic.createAddTodoForm(projects);
    domLogic.createAddForm();
    domLogic.createAddProjectForm();
    actionsList = document.querySelector('#actions-list');
    actionsComplete = document.querySelector('#complete');
    actionsEdit = document.querySelector('#edit');
    actionsDelete = document.querySelector('#delete');

    addEventListeners();
  };

  return {
    initiateTodoProject
  };
})();

export default applicationLogic;