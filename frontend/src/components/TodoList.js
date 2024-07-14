import React from "react";
import TodoItem from "./TodoItem";
import { ListItem, List, Grid, Divider } from "@mui/material";
import { useSelector } from "react-redux";

function TodoList() {
  const todos = useSelector((state) => state.todos);

  return (
    <List >
      {todos.map((todo) => (
        <>
        <br/>
        <TodoItem todo={todo} />
        </>
      ))}
    </List>
  );
}

export default TodoList;
