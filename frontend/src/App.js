import {React, useEffect} from 'react';
import "./App.css"; // Import your CSS file for any additional styles
import TodoList from "./components/TodoList";
import TodoCreator from "./components/TodoCreator";
import { colors } from "@mui/material";
import { fetchTodos } from './redux_components/actions';
import { useDispatch } from "react-redux";

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  return (
    <div className="App" style={{ height: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: colors.green[50] }}>
      <h1 style={{ color: colors.green[800], margin: '1rem 0' }}>To-Do List</h1>
      <TodoCreator />
      <br/>
      <TodoList style={{ flexGrow: 1 }} />
    </div>
  );
}

export default App;
