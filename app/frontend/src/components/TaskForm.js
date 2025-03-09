import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const TaskFormComponent = ({ task, onSave, onCancel }) => {
  // Initialize form data based on the `task` prop
  const [formData, setFormData] = useState({
    title: task ? task.title : "",
    description: task ? task.description : "",
    category: task ? task.category : "",
    priority: task ? task.priority : "Medium",
  });

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate the form
    if (!formData.title) {
      alert("Title is required!");
    }

    onSave(formData);
  };

  // Handle input changes
  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  return (
    <div className="card p-3">
      <Form onSubmit={handleSubmit}>
        <h2>{task ? "Edit Task" : "Add Task"}</h2>

        {/* Title Field */}
        <Form.Group controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            value={formData.title}
            required
            isInvalid={!formData.title}
            onChange={handleChange("title")}
          />
          <Form.Control.Feedback type="invalid">
            Title is required
          </Form.Control.Feedback>
        </Form.Group>

        {/* Description Field */}
        <Form.Group controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            value={formData.description}
            onChange={handleChange("description")}
          />
        </Form.Group>

        {/* Category Field */}
        <Form.Group controlId="category">
          <Form.Label>Category</Form.Label>
          <Form.Control
            type="text"
            value={formData.category}
            onChange={handleChange("category")}
          />
        </Form.Group>

        {/* Priority Field */}
        <Form.Group controlId="priority">
          <Form.Label>Priority</Form.Label>
          <Form.Select
            value={formData.priority}
            onChange={handleChange("priority")}
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </Form.Select>
        </Form.Group>

        {/* Buttons */}
        <div className="mt-3">
          {task ? (
            <>
              <Button type="submit" variant="primary" className="me-2">
                Save Changes
              </Button>
              <Button variant="secondary" onClick={onCancel}>
                Cancel
              </Button>
            </>
          ) : (
            <Button type="submit" variant="primary">
              Add Task
            </Button>
          )}
        </div>
      </Form>
    </div>
  );
};

export default TaskFormComponent;
