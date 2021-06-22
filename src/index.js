import todo from './todo';
import project from './project';

const todoList = (function(){
  const projects = [];

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const defaultTodo = todo('Start a todo list :)', 'I need to start a todo list.', tomorrow, 1, 'Add some notes here', ('This Is A Checklist').split(' '), false);
  
  const defaultProject = project(`Let's Get This Bread`, []);
  defaultProject.todos.push(defaultTodo);
  projects.push(defaultProject);
  
  console.log(projects);


})();