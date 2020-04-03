import React, { Component } from "react";

export class TodoForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      content: ""
    };
  }

  handleChange = (e) => {
    this.setState({
      content: e.target.value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onAddSubmit(this.state.content);
    this.setState({content: ""});
  }

  render() {
    return (
      <form className="todo-form" onSubmit={this.handleSubmit}>
        <input
          type="text"
          value={this.state.content}
          onChange={this.handleChange}
        />
        <button type="submit">Add</button>
      </form>
    );
  }
}