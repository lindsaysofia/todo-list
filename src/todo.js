import formatDistance from 'date-fns/formatDistance';
import format from 'date-fns/format';

function todo(title, description, dueDate, priority, notes, checklist, projectIndex) {
  let isActive = false;
  let isDueDateADate = false;

  const dueDateAsDays = function() {
    return `Due in ${formatDistance(new Date(), dueDate)}`;
  }

  const dueDateAsDate = function() {
    return format(dueDate, 'MM/dd/yyyy');
  }

  return {
    title,
    description,
    dueDate,
    dueDateAsDays,
    dueDateAsDate,
    priority,
    notes,
    checklist,
    projectIndex,
    isActive,
    isDueDateADate,
  };

}

export default todo;