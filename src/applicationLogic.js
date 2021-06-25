import todo from './todo';
import project from './project';
import domLogic from './domLogic';

const applicationLogic = (function () {
  const projects = [];
  const content = document.querySelector('#content');
  let actionsList;

   const clearActiveProject = () => {
    const activeProject = document.querySelector('.active');
    activeProject.classList.remove('active');
    content.innerHTML = '';
   }

  const activateProject = e => {
    clearActiveProject();
    let projectItem = e.target.classList[0] === 'project-item' ? e.target : e.target.parentElement;
    let projectItemIndex = projectItem.dataset.index;
    projectItem.classList.add('active');
    domLogic.displayTodoList(projects[projectItemIndex].todoList, projectItemIndex);
    addEventListeners();
  }

  const hideActions = () => {
    actionsList.classList.remove('active');
  }

  const showActions = e => {
    actionsList.classList.add('active');
    if (e.target.parentElement.classList[0] === 'project-item') {
      actionsList.style.left = `${e.target.offsetLeft + e.target.offsetWidth}px`;
      actionsList.style.top = `${e.target.offsetTop - e.target.offsetHeight/4}px`;
    } else if (e.target.parentElement.classList[0] === 'main') {
      actionsList.style.left = `${e.target.offsetLeft - (e.target.offsetWidth*4.5)}px`;
      actionsList.style.top = `${e.target.offsetTop - e.target.offsetHeight/4}px`;
    }
  };

  const addEventListeners = () => {
    const projectItems = document.querySelectorAll('.project-item');
    const actionsButtons = document.querySelectorAll('.actions');

    projectItems.forEach(projectItem => projectItem.addEventListener('click', activateProject));
    actionsButtons.forEach(actionButton => actionButton.addEventListener('mouseenter', showActions));
    actionsList.addEventListener('mouseleave', hideActions);
  }

  const initiateTodoProject = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const defaultTodo = todo('Start a todo list :)', 'I need to start a todo list.', tomorrow, 1, 'Add some notes here', ('This Is A Checklist').split(' '), false);
    const defaultProject = project(`Let's Get This Bread`, []);
    const defaultTodo2 = todo('Start a todo list Part 2 :) Start a todo list Part 2 :) Start a todo list Part 2 :) Start a todo list Part 2 :)', 'I need to start a todo list.', tomorrow, 1, 'Add some notes here', ('This Is A Checklist').split(' '), false);
    const defaultProject2 = project(`Let's Get This Bread Part 2 Let's Get This Bread Part 2`, []);
    defaultProject.todoList.push(defaultTodo);
    defaultProject.todoList.push(defaultTodo);
    defaultProject2.todoList.push(defaultTodo2);
    defaultProject2.todoList.push(defaultTodo2);
    projects.push(defaultProject);
    projects.push(defaultProject2);
    
    domLogic.displayProjectList(projects);
    domLogic.displayTodoList(projects[0].todoList);
    let firstProject = document.querySelector('.project-item');
    firstProject.classList.add('active');

    domLogic.displayAddButton();
    domLogic.createActionsList();
    actionsList = document.querySelector('#actions-list');

    addEventListeners();
  }

  return {
    addEventListeners,
    initiateTodoProject
  };
})();

export default applicationLogic;