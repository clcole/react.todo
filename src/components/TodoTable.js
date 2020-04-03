import React from "react";
import { TodoRow } from "./TodoRow";
import { FILTERS } from "../constants/filters";

export function TodoTable({ todos, filter, onToggleClick, onDeleteClick }) {
  const todoList = [];

  todos.forEach(todo => {
    if (filter === FILTERS.SHOW_ACTIVE && todo.active) {
      todoList.push(
        <TodoRow 
          key={todo.id} 
          todo={todo} 
          onToggleClick={onToggleClick}
          onDeleteClick={onDeleteClick}
        />
      );
    }
    if (filter === FILTERS.SHOW_COMPLETED && !todo.active) {
      todoList.push(
        <TodoRow 
          key={todo.id} 
          todo={todo} 
          onToggleClick={onToggleClick}
          onDeleteClick={onDeleteClick}
        />
      );
    }
    if (filter === FILTERS.SHOW_ALL) {
      todoList.push(
        <TodoRow 
          key={todo.id} 
          todo={todo} 
          onToggleClick={onToggleClick}
          onDeleteClick={onDeleteClick}
        />
      );
    }
  });

  return (
    <div className="todo-table">
      {todoList}
    </div>
  );
}