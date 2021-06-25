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
      actionsComplete.textContent = projects[+lastActionElement.dataset.index].complete ? 'Mark as Incomplete' : 'Mark As Complete';
    } else if (e.target.parentElement.classList[0] === 'main') {
      actionsList.style.left = `${e.target.offsetLeft - (e.target.offsetWidth*3.5)}px`;
      actionsList.style.top = `${e.target.offsetTop - e.target.offsetHeight/4}px`;
      lastActionElement = e.target.parentElement.parentElement;
      actionsComplete.textContent = projects[activeProjectIndex].todoList[lastActionElement.dataset.index].complete ? 'Mark as Incomplete' : 'Mark As Complete';
    }
  };

  const handleProjectComplete = projectIndex => {
    projects[projectIndex].complete = true;
    (document.querySelectorAll('.project-item'))[projectIndex].style.background = 'green';
  };

  const handleTodoComplete = (todoIndex, projectIndex) => {
    projects[projectIndex].todoList[todoIndex].complete = true;
    (document.querySelectorAll('.todo-item'))[todoIndex].style.background = 'green';
  };

  const handleComplete = () => {
    if (lastActionElement.classList[0] === 'project-item') {
      handleProjectComplete(lastActionElement.dataset.index);
    } else if (lastActionElement.classList[0] === 'todo-item') {
      handleTodoComplete(lastActionElement.dataset.index, activeProjectIndex);
    }
  };

  const addEventListeners = () => {
    const projectItems = document.querySelectorAll('.project-item');
    const actionsButtons = document.querySelectorAll('.actions');

    projectItems.forEach(projectItem => projectItem.addEventListener('click', activateProject));
    actionsButtons.forEach(actionButton => actionButton.addEventListener('mouseenter', showActions));
    actionsList.addEventListener('mouseleave', hideActions);
    actionsComplete.addEventListener('click', handleComplete);
  };

  const initiateTodoProject = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const defaultProject = project(`Let's Get This Bread`, []);
    const defaultTodo00 = todo('Start a todo list :)', 'I need to start a todo list.', tomorrow, 1, 'Add some notes here', ('This Is A Checklist').split(' '), 0);
    const defaultTodo01 = todo('Start a todo list :)', 'I need to start a todo list.', tomorrow, 1, 'Add some notes here', ('This Is A Checklist').split(' '), 0);
    const defaultProject2 = project(`Let's Get This Bread Part 2 Let's Get This Bread Part 2`, []);
    const defaultTodo10 = todo('Start a todo list Part 2 :) Start a todo list Part 2 :) Start a todo list Part 2 :) Start a todo list Part 2 :)', 'I need to start a todo list.', tomorrow, 1, 'Add some notes here', ('This Is A Checklist').split(' '), 1);
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
    addEventListeners,
    initiateTodoProject
  };
})();

export default applicationLogic;