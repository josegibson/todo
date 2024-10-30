import logging
from flask import Flask, request, jsonify, abort
from flask_cors import CORS
from database import db
from model import Todo

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///todos.db'
db.init_app(app)

with app.app_context():
    db.create_all()

CORS(app)

@app.route("/todos", methods=["GET"])
def get_todos():
    # Get all todos from the database
    todos = Todo.query.all()
    todo_dict = [todo.to_dict() for todo in todos]
    return jsonify(todo_dict)

@app.route("/todos", methods=["POST"])
def create_todo():
    todo_data = request.get_json()
    todo = Todo(task=todo_data['text'])
    db.session.add(todo)
    db.session.commit()
    return jsonify(todo.to_dict()), 201

@app.route("/todos/<int:todo_id>", methods=["DELETE"])
def delete_todo(todo_id):
    # Find the todo by ID
    todo = Todo.query.get(todo_id)
    if todo is None:
        abort(404)
    db.session.delete(todo)
    db.session.commit()
    return '', 204

@app.route("/todos/<int:todo_id>/toggle", methods=["PUT"])
def toggle_todo_complete(todo_id):
    todo = Todo.query.get(todo_id)
    if todo is None:
        abort(404)
    todo.completed = not todo.completed
    db.session.commit()
    return jsonify(todo.to_dict())

@app.errorhandler(404)
def not_found(error):
    return jsonify({"error": "Not found"}), 404

if __name__ == "__main__":
    # with app.app_context():
    #     db.create_all()
    app.run(debug=True)
