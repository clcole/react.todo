import React from "react";

export function TodoRow({ todo, onToggleClick, onDeleteClick }) {
  const className = todo.active ? "active-button" : "completed-button";
  return (
    <div className="todo-row">
      <span className="todo-content">{todo.content}</span>
      <button
        className={className}
        type="button"
        onClick={() => onToggleClick(todo.id)}
      >
        <i className="fas fa-check"></i>
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
