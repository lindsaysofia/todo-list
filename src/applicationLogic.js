import todo from './todo';
import project from './project';
import domLogic from './domLogic';
import { add } from 'date-fns';

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
    const activeProject = document.querySelector('.active');
    activeProject.classList.remove('active');
    content.innerHTML = '';
   }

  const activateProject = e => {
    clearActiveProject();
    let projectItem = e.target.classList[0] === 'project-item' ? e.target : e.target.parentElement;
    activeProjectIndex = projectItem.dataset.index;
    projectItem.classList.add('active');
    domLogic.displayTodoList(projects[activeProjectIndex].todoList);
    addEventListeners();
  }

  const hideActions = () => {
    actionsList.classList.remove('active');
  }

  const showActions = e => {
    actionsList.classList.add('active');
    if (e.target.parentElement.classList[0] === 'project-item') {
      actionsList.style.left = `${e.target.offsetLeft}px`;
      actionsList.style.top = `${e.target.offsetTop - e.target.offsetHeight/4}px`;
      lastActionElement = e.target.parentElement;
    } else if (e.target.parentElement.classList[0] === 'main') {
      actionsList.style.left = `${e.target.offsetLeft - (e.target.offsetWidth*3.5)}px`;
      actionsList.style.top = `${e.target.offsetTop - e.target.offsetHeight/4}px`;
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

  const handleTodoEdit = (todoIndex, projectIndex) => {
    console.log('edit');
  };

  const handleEdit = () => {
    if (lastActionElement.classList[0] === 'project-item') {
      handleProjectEdit(lastActionElement.dataset.index);
    } else if (lastActionElement.classList[0] === 'todo-item') {
      handleTodoEdit(lastActionElement.dataset.index, activeProjectIndex);
    }
  };

  const handleNewChecklistItem = (e) => {
    e.preventDefault();
    let newTodoValue = e.target[e.target.length - 2].value;
    let todoIndex = e.target.parentElement.parentElement.dataset.index;
    projects[activeProjectIndex].todoList[todoIndex].checklist.push(newTodoValue);
    domLogic.displayTodoList(projects[activeProjectIndex].todoList);
    addEventListeners();
  };

  const toggleTodoExpand = (e) => {
    let todoItemElement = e.target.parentElement.parentElement;
    let todoItemIndex = todoItemElement.dataset.index;
    let todoExpand = todoItemElement.querySelector('.expand');
    todoExpand.classList.toggle('active');
    let todo = projects[activeProjectIndex].todoList[todoItemIndex];
    todo.isActive = !todo.isActive;
    e.target.innerHTML = todo.isActive ? '&and;' : '&or;';
  }

  const toggleDueDate = (e) => {
    let todoItemElement = e.target.parentElement.parentElement;
    let todoItemIndex = todoItemElement.dataset.index;
    let todo = projects[activeProjectIndex].todoList[todoItemIndex];
    todo.isDueDateADate = !todo.isDueDateADate;
    e.target.innerHTML = todo.isDueDateADate ? todo.dueDateAsDate() : todo.dueDateAsDays();
  }

  const addEventListeners = () => {
    const projectItems = document.querySelectorAll('.project-item');
    const projectItemTitles = document.querySelectorAll('.project-item .title');
    const actionsButtons = document.querySelectorAll('.actions');
    const forms = document.querySelectorAll('form');
    const carets = document.querySelectorAll('.caret');
    const dueDates = document.querySelectorAll('.due-date');

    projectItems.forEach(projectItem => projectItem.addEventListener('click', activateProject));
    projectItemTitles.forEach(title => {
      title.addEventListener('input', handleProjectChange);
      title.addEventListener('blur', handleProjectChangeEnd);
    });
    actionsButtons.forEach(actionButton => actionButton.addEventListener('mouseenter', showActions));
    actionsList.addEventListener('mouseleave', hideActions);
    actionsComplete.addEventListener('click', handleCompleteAndDelete);
    actionsEdit.addEventListener('click', handleEdit);
    actionsDelete.addEventListener('click', handleCompleteAndDelete);
    forms.forEach(form => form.addEventListener('submit', handleNewChecklistItem));
    carets.forEach(caret => caret.addEventListener('click', toggleTodoExpand));
    dueDates.forEach(dueDate => dueDate.addEventListener('click', toggleDueDate));
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
    actionsList = document.querySelector('#actions-list');
    actionsComplete = document.querySelector('#complete');
    actionsEdit = document.querySelector('#edit');
    actionsDelete = document.querySelector('#delete');

    addEventListeners();
  }

  return {
    initiateTodoProject
  };
})();

export default applicationLogic;