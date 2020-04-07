import React from "react";

export function TodoRow({ todo, onToggleClick, onEditClick, onDeleteClick }) {

  let classNameContent = "todo-content todo-content-active";
  let classNameToggleButton = "active-button";
  let toggleButtonText = <i class="far fa-square"></i>;

  if(!todo.active) {
    classNameContent = "todo-content todo-content-completed";
    classNameToggleButton = "completed-button";
    toggleButtonText = <i class="far fa-check-square"></i>;
  }

  return (
    <div className="todo-row">
      <span className={classNameContent}>{todo.content}</span>
      
      <button
        className={classNameToggleButton}
        type="button"
        onClick={() => onToggleClick(todo.id)}
      >
        {toggleButtonText}
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
