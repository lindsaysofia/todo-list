import './style.css';
import todo from './todo';
import project from './project';
import domLogic from './domLogic';
import applicationLogic from './applicationLogic';

const todoList = (function(){
  applicationLogic.initiateTodoProject();
})();