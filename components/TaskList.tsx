"use client";

import { useState } from "react";
import EditTaskForm from "./EditTaskForm";
import "../styles/TaskList.css"; // Changed from @/styles to relative path

interface Task {
  id: string;
  title: string;
  description: string;
  priority: string;
  status: string;
  dueDate: string;
  createdAt: string;
}

export default function TaskList({
  tasks = [],
  onDelete,
}: {
  tasks: Task[];
  onDelete: (id: string) => void;
}) {
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const sortedTasks = [...tasks].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  const handleEdit = (task: Task) => {
    setEditingTask(task);
  };

  const handleEditComplete = () => {
    setEditingTask(null);
    // Refresh tasks list by calling parent's fetch function
    window.location.reload();
  };

  return (
    <div className="task-list">
      {editingTask && (
        <div className="modal-overlay">
          <EditTaskForm
            task={editingTask}
            onClose={() => setEditingTask(null)}
            onUpdate={handleEditComplete}
          />
        </div>
      )}

      {sortedTasks.map((task) => (
        <div key={task.id} className="task-card">
          <div className="task-header">
            <h3 className="task-title">{task.title}</h3>
            <div className="task-badges">
              <span className={`priority-badge ${task.priority.toLowerCase()}`}>
                {task.priority}
              </span>
              <span className={`status-badge ${task.status.toLowerCase()}`}>
                {task.status}
              </span>
            </div>
          </div>
          <p className="task-description">{task.description}</p>
          <div className="task-meta">
            <span>
              Created: {new Date(task.createdAt).toLocaleDateString()}
            </span>
            {task.dueDate && (
              <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
            )}
          </div>
          <div className="task-actions">
            <button className="edit-button" onClick={() => handleEdit(task)}>
              Edit
            </button>
            <button className="delete-button" onClick={() => onDelete(task.id)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
