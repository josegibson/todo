

export const fetchTodos = () => async (dispatch) => {
  try {
      const response = await fetch('http://127.0.0.1:5000/todos', { method: 'GET' });
      const todos = await response.json();
      dispatch({ type: 'INITIALIZE_TODOS', todos });
  } catch (error) {
      console.error('Failed to fetch todos:', error);
  }
};


export const deleteTodo = (id) => async (dispatch) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/todos/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete the todo item.');
      dispatch({ type: 'DELETE_TODO', id });
    } catch (error) {
      console.error('Error deleting todo:', error);
      // Optionally dispatch a failure action here
    }
  };

export const addTodo = (text) => async (dispatch) => {
    try {
      const response = await fetch('http://127.0.0.1:5000/todos', {
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
      const response = await fetch(`http://127.0.0.1:5000/todos/${id}/toggle`, { method: 'PUT' });
      console.log(response);
      if (!response.ok) throw new Error('Failed to toggle the todo item.');
      dispatch({ type: 'TOGGLE_COMPLETE', id });
    } catch (error) {
      console.error('Error toggling todo:', error);
      // Optionally dispatch a failure action here
    }
  }