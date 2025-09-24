import { useState } from "react";
import "../styles/TaskForm.css";

interface TaskFormProps {
  onClose: () => void;
  onTaskCreated: () => void;
}

export default function TaskForm({ onClose, onTaskCreated }: TaskFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [task, setTask] = useState({
    title: "",
    description: "",
    priority: "LOW",
    status: "PENDING",
    dueDate: new Date().toISOString().split("T")[0],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create task");
      }

      // Reset form
      setTask({
        title: "",
        description: "",
        priority: "LOW",
        status: "PENDING",
        dueDate: new Date().toISOString().split("T")[0],
      });

      // Notify parent and close form
      await onTaskCreated();
      onClose();
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to create task"
      );
      console.error("Create task error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <div className="form-group">
        <label className="form-label">Title *</label>
        <input
          type="text"
          value={task.title}
          onChange={(e) => setTask({ ...task, title: e.target.value })}
          className="form-input"
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label">Description</label>
        <textarea
          value={task.description}
          onChange={(e) => setTask({ ...task, description: e.target.value })}
          className="form-input"
          rows={3}
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Priority</label>
          <select
            value={task.priority}
            onChange={(e) => setTask({ ...task, priority: e.target.value })}
            className="form-input"
          >
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
            <option value="URGENT">Urgent</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Status</label>
          <select
            value={task.status}
            onChange={(e) => setTask({ ...task, status: e.target.value })}
            className="form-input"
          >
            <option value="PENDING">Pending</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="COMPLETED">Completed</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Due Date</label>
        <input
          type="date"
          value={task.dueDate}
          onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
          className="form-input"
        />
      </div>

      {error && <div className="error-message text-red-500 mt-2">{error}</div>}

      <div className="form-actions">
        <button
          type="button"
          onClick={onClose}
          className="cancel-btn"
          disabled={loading}
        >
          Cancel
        </button>
        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? "Creating..." : "Create Task"}
        </button>
      </div>
    </form>
  );
}
