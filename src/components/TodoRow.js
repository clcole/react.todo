import React from "react";

export function TodoRow({ todo, onToggleClick, onEditClick, onDeleteClick }) {
  const classNameContent = todo.active 
    ? "todo-content todo-content-active" 
    : "todo-content todo-content-completed";
  
  const classNameButton = todo.active ? "active-button" : "completed-button";

  return (
    <div className="todo-row">
      <span className={classNameContent}>{todo.content}</span>
      
      <button
        className={classNameButton}
        type="button"
        onClick={() => onToggleClick(todo.id)}
      >
        <i className="fas fa-check"></i>
      </button>
      
      <button
        className="edit-button"
        type="button"
        onClick={() => onEditClick(todo.id)}
      >
        <i className="fas fa-pen"></i>
      </button>
      
      <button
        className="delete-button"
        type="button"
        onClick={() => onDeleteClick(todo.id)}
      >
        <i className="fas fa-trash"></i>
      </button>
    </div>
  );
}
