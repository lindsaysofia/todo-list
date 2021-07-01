function todo(title, description, dueDate, priority, notes, checklist, projectIndex) {
  let isActive = false;
  let isDueDateADate = false;

  return {
    title,
    description,
    dueDate,
    priority,
    notes,
    checklist,
    projectIndex,
    isActive,
    isDueDateADate,
  };

}

export default todo;