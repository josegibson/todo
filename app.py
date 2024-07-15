import logging
from os import abort
from flask import Flask, request, jsonify
from flask_cors import CORS

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

app = Flask(__name__)

# Modify this line to include the origins you want to allow
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})


# Define a list of todos
todos = []
current_id = 0

@app.route("/todos", methods=["GET"])
def get_todos():
    todo_json = jsonify(todos)
    return todo_json

@app.route("/todos/<int:todo_id>", methods=["DELETE"])
def delete_todo(todo_id):
    # Find the todo by ID
    todo = next((todo for todo in todos if todo["id"] == todo_id), None)
    if todo is None:
        # If not found, return 404
        abort(404)
    todos.remove(todo)
    # Return a success message
    return jsonify({"message": "Todo deleted successfully"}), 200

@app.route("/todos/<int:todo_id>/toggle", methods=["PUT"])
def toggle_todo(todo_id):
    # Find the todo by ID
    todo = next((todo for todo in todos if todo["id"] == todo_id), None)
    if todo is None:
        # If not found, return 404
        abort(404)
    
    # Toggle the 'done' status
    todo['completed'] = not todo['completed']
    
    # Return the updated todo
    return jsonify(todo), 200


@app.route("/todos", methods=["POST"])
def create_todo():
    global current_id  # Declare current_id as global
    # Create a new todo
    print("# Create a new todo")
    todo_data = request.get_json()
    todo = {"id": current_id + 1, "task": todo_data['text'], "completed": False}
    current_id += 1  # Update the global current_id
    todos.append(todo)
    # Return the new todo as a JSON response
    return jsonify(todo), 201


if __name__ == "__main__":
    app.run(debug=True)
