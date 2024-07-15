import React from "react";
import TodoItem from "./TodoItem";
import { List } from "@mui/material";
import { useSelector } from "react-redux";

function TodoList() {
  const todos = useSelector((state) => state.todos);

  return (
    <List>
      {todos.map((todo) => (
        <React.Fragment key={todo.id}>
          <br />
          <TodoItem todo={todo} />
        </React.Fragment>
      ))}
    </List>
  );
}

export default TodoList;
