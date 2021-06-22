import formatDistance from 'date-fns/formatDistance';

function todo(title, description, dueDate, priority, notes, checklist, complete) {
  const dueDateAsDays = function() {
    return `Due in ${formatDistance(new Date(), dueDate)}`;
  }

  return {
    title,
    description,
    dueDate,
    dueDateAsDays,
    priority,
    notes,
    checklist,
    complete,
  };

}

export default todo;