import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

const initialState = {
  todos: [],
};

function todoReducer(state = initialState, action) {
  switch (action.type) {
    case "INITIALIZE_TODOS":
      return {
        ...state,
        todos: action.todos,
      };
    case "ADD_TODO":
      return {
        ...state,
        todos: [
          ...state.todos,
          { task: action.todo.task, completed: action.todo.completed, id: action.todo.id },
        ],
      };
    case "TOGGLE_COMPLETE":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
        ),
      };
    case "DELETE_TODO":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.id),
      };
    default:
      return state;
  }
}

const store = configureStore({
  reducer: todoReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
});

export default store;
