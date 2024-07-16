from database import db

class Todo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    task = db.Column(db.String(120), nullable=False)
    completed = db.Column(db.Boolean, default=False)

    def to_dict(self):
        return {
            "id": self.id,
            "task": self.task,
            "completed": self.completed
        }