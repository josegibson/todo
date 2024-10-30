const BASE_URL = process.env.REACT_APP_BASE_URL;

export const fetchTodos = () => async (dispatch) => {
  try {
      const response = await fetch(`${BASE_URL}`, { method: 'GET' });
      const todos = await response.json();
      dispatch({ type: 'INITIALIZE_TODOS', todos });
  } catch (error) {
      console.error('Failed to fetch todos:', error);
  }
};

export const deleteTodo = (id) => async (dispatch) => {
    try {
      const response = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete the todo item.');
      dispatch({ type: 'DELETE_TODO', id });
    } catch (error) {
      console.error('Error deleting todo:', error);
      // Optionally dispatch a failure action here
    }
  };

export const addTodo = (text) => async (dispatch) => {
    try {
      const response = await fetch(`${BASE_URL}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
      if (!response.ok) throw new Error('Failed to add the todo item.');
      const todo = await response.json();
      dispatch({ type: 'ADD_TODO', todo });
    } catch (error) {
      console.error('Error adding todo:', error);
      // Optionally dispatch a failure action here
    }
  }

export const toggleComplete = (id) => async (dispatch) => {
    try {
      const response = await fetch(`${BASE_URL}/${id}/toggle`, { method: 'PUT' });
      if (!response.ok) throw new Error('Failed to toggle the todo item.');
      dispatch({ type: 'TOGGLE_COMPLETE', id });
    } catch (error) {
      console.error('Error toggling todo:', error);
      // Optionally dispatch a failure action here
    }
  }