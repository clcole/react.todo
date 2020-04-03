import React, { Component } from "react";
import { TodoForm } from "./TodoForm";
import { TodoTable } from "./TodoTable";
import { FilterButton } from "./FilterButton";
import { FILTERS } from "../constants/filters";

// const TODOS = [
//   { id: 100, content: "todo1", active: true },
//   { id: 200, content: "todo2", active: true },
//   { id: 300, content: "todo3", active: false },
//   { id: 400, content: "todo4", active: true }
// ];

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      nextId: 0,
      todos: [],
      visibility: FILTERS.SHOW_ALL      
    };
  }

  setLocalStorage = () => {
    localStorage.setItem("clc-react-todo-app", JSON.stringify(this.state))
  }

  getLocalStorage = () => {
    return localStorage.getItem("clc-react-todo-app");
  }

  handleFilterClick = (filter) => {
    this.setState({
      visibility: filter
    }, this.setLocalStorage);
  }

  handleAddSubmit = (content) => {
    const id = this.state.nextId;
    this.setState(state => {
      const todos = [...state.todos, { id, content, active: true }];
      return { todos, nextId: id + 1 };
    }, this.setLocalStorage);
  }

  handleToggleClick = (id) => {
    this.setState(state => {
      const todos = state.todos.map(todo => (
        id === todo.id ? { ...todo, active: !todo.active } : todo
      ));
      return { todos };
    }, this.setLocalStorage);
  }

  handleDeleteClick = (id) => {
    this.setState(state => {
      const todos = state.todos.filter(todo => id !== todo.id);
      return { todos };
    }, this.setLocalStorage);
  }

  componentDidMount = () => {
    const data = this.getLocalStorage();
    
    if(data !== null) {
      this.setState(JSON.parse(data));
    }
  };

  // componentWillUnmount = () => { 
  //   localStorage.removeItem("clc-react-todo-app"); 
  // };

  render() {
    let todoActiveCount = 0;
    this.state.todos.forEach(todo => {
      if(todo.active) todoActiveCount++;
    });

    return (
      <div id="page-container">
        <header id="header">
          <h1>To-do List</h1>
          <p>{todoActiveCount} active to-do(s)</p>
        </header>
        <nav id="nav">
          <FilterButton
            filter={FILTERS.SHOW_ALL}
            onFilterClick={this.handleFilterClick}
          >
            View All
            </FilterButton>
          <FilterButton
            filter={FILTERS.SHOW_ACTIVE}
            onFilterClick={this.handleFilterClick}
          >
            View Active
            </FilterButton>
          <FilterButton
            filter={FILTERS.SHOW_COMPLETED}
            onFilterClick={this.handleFilterClick}
          >
            View Completed
            </FilterButton>
        </nav>
        <main id="main">
          <TodoForm
            onAddSubmit={this.handleAddSubmit}
          />
          <TodoTable
            todos={this.state.todos}
            filter={this.state.visibility}
            onToggleClick={this.handleToggleClick}
            onDeleteClick={this.handleDeleteClick}
          />
        </main>
        <footer id="footer"></footer>
      </div>
    );
  }
}

export default App;
