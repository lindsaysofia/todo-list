import domLogic from './domLogic';

const applicationLogic = (function () {
   const clearActiveProjectItems = () => {
    const projectItems = document.querySelectorAll('.project-item');
    projectItems.forEach(projectItem => projectItem.classList.remove('active'));
   }

  const makeProjectItemActive = e => {
    clearActiveProjectItems();
    let projectItem = e.target.classList[0] === 'project-item' ? e.target : e.target.parentElement;
    projectItem.classList.add('active');
  }

  const addEventListeners = () => {
    const projectItems = document.querySelectorAll('.project-item');
    projectItems.forEach(projectItem => projectItem.addEventListener('click', makeProjectItemActive));
  }

  return {
    addEventListeners,
  };
})();

export default applicationLogic;