import todo from './todo';
import project from './project';
import domLogic from './domLogic';

const todoList = (function(){
  const projects = [];

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const defaultTodo = todo('Start a todo list :)', 'I need to start a todo list.', tomorrow, 1, 'Add some notes here', ('This Is A Checklist').split(' '), false);
  
  const defaultProject = project(`Let's Get This Bread`, []);
  defaultProject.todoList.push(defaultTodo);
  projects.push(defaultProject);
  
  domLogic.displayProjectList(projects);
  projects.forEach(project => {
    domLogic.displayTodoList(project.todoList);
  });



})();