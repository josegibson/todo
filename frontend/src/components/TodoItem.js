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

function TodoItem({ todo }) {
  const dispatch = useDispatch();

  const handleToggleComplete = () => {
    dispatch({ type: "TOGGLE_COMPLETE", id: todo.id });
  };

  const handleDelete = () => {
    dispatch({ type: "DELETE_TODO", id: todo.id });
  };

  return (
    <ListItem
      sx={{ backgroundColor: todo.completed? colors.green[100]: colors.green[200], width : "40%", margin: "auto" }}
      display={"flex"}
      justify-content={"space-between"}
      divider={true}
    >
      <ListItemText>
        <Typography>{todo.text}</Typography>
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
