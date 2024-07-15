import React from "react";
import {
  Checkbox,
  Typography,
  IconButton,
  ListItem,
  ListItemText,
  colors,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import { toggleComplete, deleteTodo } from "../redux_components/actions";

function TodoItem({ todo }) {
   const dispatch = useDispatch();

  const handleToggleComplete = () => {
    dispatch(toggleComplete(todo.id));
  };

  const handleDelete = () => {
    dispatch(deleteTodo(todo.id));
  };

  return (
    <ListItem
      sx={{ backgroundColor: todo.completed? colors.green[100]: colors.green[200], width : "40%", margin: "auto" }}
      display={"flex"}
      justify-content={"space-between"}
      divider={true}
      key={todo.id}
    >
      <ListItemText>
        <Typography>{todo.task}</Typography>
      </ListItemText>
      {todo.completed ? (
        <IconButton onClick={handleDelete}>
          <CloseIcon />
        </IconButton>
      ) : (
        <Checkbox onChange={handleToggleComplete} />
      )}
    </ListItem>
  );
}

export default TodoItem;
