import React, { Component } from "react";

export class TodoForm extends Component {
  constructor(props){
    super(props);
    this.state = this.props.todo.content 
      ? { content: this.props.todo.content }
      : { content: "" };
  }

  handleChange = (e) => {
    this.setState({
      content: e.target.value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit({...this.props.todo, content: this.state.content});
    this.setState({content: ""});
  }

  render() {
    return (
      <form className={this.props.className} onSubmit={this.handleSubmit}>
        <input
          type="text"
          value={this.state.content}
          onChange={this.handleChange}
          placeholder="Enter a new to-do..."
          required
        />
        <button type="submit">{this.props.children}</button>
      </form>
    );
  }
}