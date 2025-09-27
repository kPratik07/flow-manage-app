import { useState } from "react";
import "../styles/TaskForm.css";

interface Task {
  id: string;
  title: string;
  description: string;
  priority: string;
  status: string;
  dueDate: string;
}

interface EditTaskFormProps {
  task: Task;
  onClose: () => void;
  onUpdate: () => void;
}

export default function EditTaskForm({
  task,
  onClose,
  onUpdate,
}: EditTaskFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editedTask, setEditedTask] = useState(task);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`/api/tasks/${task.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedTask),
      });

      if (!response.ok) {
        throw new Error("Failed to update task");
      }

      onUpdate();
      onClose();
    } catch (error) {
      setError("Failed to update task. Please try again.");
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
          value={editedTask.title}
          onChange={(e) =>
            setEditedTask({ ...editedTask, title: e.target.value })
          }
          className="form-input"
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label">Description</label>
        <textarea
          value={editedTask.description}
          onChange={(e) =>
            setEditedTask({ ...editedTask, description: e.target.value })
          }
          className="form-input"
          rows={3}
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Priority</label>
          <select
            value={editedTask.priority}
            onChange={(e) =>
              setEditedTask({ ...editedTask, priority: e.target.value })
            }
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
            value={editedTask.status}
            onChange={(e) =>
              setEditedTask({ ...editedTask, status: e.target.value })
            }
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
          value={editedTask.dueDate ? editedTask.dueDate.split("T")[0] : ""}
          onChange={(e) =>
            setEditedTask({ ...editedTask, dueDate: e.target.value })
          }
          className="form-input"
        />
      </div>

      {error && <div className="error-message">{error}</div>}

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
          {loading ? "Updating..." : "Update Task"}
        </button>
      </div>
    </form>
  );
}
