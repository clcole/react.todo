import React from "react";
import { TodoRow } from "./TodoRow";
import { TodoForm } from "./TodoForm";
import { FILTERS } from "../constants/filters";

export function TodoTable(props) {
  const {
    todos,
    filter,
    onToggleClick,
    onEditClick,
    onEditSubmit,
    onDeleteClick
  } = props;

  const todoList = [];

  todos.forEach(todo => {
    const row = todo.edit
      ?
      (<TodoForm
        key={todo.id}
        todo={todo}
        className="todo-form-edit"
        onSubmit={onEditSubmit}
        >
          Save
        </TodoForm>)
      :
      (<TodoRow
        key={todo.id}
        todo={todo}
        onToggleClick={onToggleClick}
        onEditClick={onEditClick}
        onDeleteClick={onDeleteClick}
      />);

    if (filter === FILTERS.SHOW_ACTIVE && todo.active) {
      todoList.push(row);
    }

    if (filter === FILTERS.SHOW_COMPLETED && !todo.active) {
      todoList.push(row);
    }

    if (filter === FILTERS.SHOW_ALL) {
      todoList.push(row);
    }
  });

  return (
    <div className="todo-table">
      {todoList}
    </div>
  );
}