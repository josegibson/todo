import * as React from "react";
import { TextField, Button, FormControl, IconButton, colors } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import { useDispatch } from "react-redux";

function TodoCreator() {
  const [todoText, setTodoText] = React.useState("");
  const dispatch = useDispatch();

  const handleChange = (event) => {
    setTodoText(event.target.value);
  };

  const addTodo = () => {
    dispatch({ type: "ADD_TODO", text: todoText });
    setTodoText("");
  };

  return (
    <FormControl
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginX: "auto",
        width: "40%",
      }}
    >
      <TextField fullWidth
        id="outlined-basic"
        label="Add a new To-Do"
        variant="filled"
        color="success"
        value={todoText}
        onChange={handleChange}
      />
      <IconButton
        color="success"
        onClick={addTodo}
        disabled={!todoText}
        sx={{width: "10%", margin: '2px'}}
      >
        <DoneIcon />
      </IconButton>
    </FormControl>
  );
}

export default TodoCreator;
