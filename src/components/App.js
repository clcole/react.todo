import React, { Component } from "react";
import { TodoForm } from "./TodoForm";
import { TodoTable } from "./TodoTable";
import { FilterButton } from "./FilterButton";
import { FILTERS } from "../constants/filters";

// const TODOS = [
//   { id: 100, content: "todo1", active: true, edit: false },
//   { id: 200, content: "todo2", active: true, edit: false },
//   { id: 300, content: "todo3", active: false, edit: false },
//   { id: 400, content: "todo4", active: true, edit: false }
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

  handleAddSubmit = ({content}) => {
    const id = this.state.nextId;
    const todo = { id, content, active: true, edit: false};
    this.setState(state => {
      const todos = [...state.todos, todo];
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

  handleEditClick = (id) => {
    this.setState(state => {
      const todos = state.todos.map(todo => (
        id === todo.id ? { ...todo, edit: true } : todo
      ));
      return { todos };
    });
  }

  handleEditSubmit = ({id, content}) => {
    this.setState(state => {
      const todos = state.todos.map(todo => (
        id === todo.id ? { ...todo, content, edit: false } : todo
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

  getHeaderMessage = () => {
    let activeCount = 0;
    this.state.todos.forEach(todo => {
      if(todo.active) activeCount++;
    });

    if(activeCount === 0) return "You're all caught-up!";
    if(activeCount === 1) return "You have 1 active to-do";

    return `You have ${activeCount} active to-do's`;
  }

  render() {
    return (
      <div id="page-container">
        <header id="header">
          <h1>To-do List</h1>
          <p>{this.getHeaderMessage()}</p>
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
            todo={{}}
            className="todo-form-add"
            onSubmit={this.handleAddSubmit}
          >
            Add
          </TodoForm>
          <TodoTable
            todos={this.state.todos}
            filter={this.state.visibility}
            onToggleClick={this.handleToggleClick}
            onEditClick={this.handleEditClick}
            onEditSubmit={this.handleEditSubmit}
            onDeleteClick={this.handleDeleteClick}
          />
        </main>
        <footer id="footer"><p>CLCole</p></footer>
      </div>
    );
  }
}

export default App;
