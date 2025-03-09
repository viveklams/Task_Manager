import React from "react";
import { Card, ListGroup, Badge, Button } from "react-bootstrap";
import "../styles.css";

const TaskList = React.memo(({ tasks, onDelete, onComplete, onEdit }) => {
  return (
    <div>
      {tasks.map((task) => (
        <Card key={task._id} className="mb-3 task-card">
          <Card.Body>
            <Card.Title>{task.title}</Card.Title>
            <Card.Text>{task.description}</Card.Text>
            <ListGroup>
              <ListGroup.Item>Category: {task.category}</ListGroup.Item>
              <ListGroup.Item>
                Priority:{" "}
                <Badge
                  bg={
                    task.priority === "High"
                      ? "danger"
                      : task.priority === "Medium"
                      ? "warning"
                      : "success"
                  }
                >
                  {task.priority}
                </Badge>
              </ListGroup.Item>
              <ListGroup.Item>
                Status:{" "}
                <Badge bg={task.isCompleted ? "success" : "secondary"}>
                  {task.isCompleted ? "Completed" : "Pending"}
                </Badge>
              </ListGroup.Item>
            </ListGroup>
            <div className="mt-3">
              {!task.isCompleted && (
                <Button
                  variant="success"
                  className="me-2"
                  onClick={() => onComplete(task._id)}
                >
                  Mark as Completed
                </Button>
              )}
              <Button
                variant="primary"
                className="me-2"
                onClick={() => onEdit(task)}
              >
                Edit
              </Button>
              <Button variant="danger" onClick={() => onDelete(task._id)}>
                Delete
              </Button>
            </div>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
});

export default TaskList;
