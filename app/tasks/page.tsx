"use client";

import { useState, useEffect } from "react";
import TaskList from "../../components/TaskList";
import TaskForm from "../../components/TaskForm";
import Navbar from "../../components/Navbar";
import "../../styles/TaskPage.css";

interface Task {
  id: string;
  title: string;
  description: string;
  priority: string;
  status: string;
  dueDate: string;
  createdAt: string;
}

export default function TasksPage() {
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchTasks = async () => {
    try {
      const response = await fetch("/api/tasks");
      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleTaskCreated = () => {
    setShowTaskForm(false);
    fetchTasks(); // Refresh the task list
  };

  const handleDelete = async (taskId: string) => {
    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        fetchTasks(); // Refresh the task list
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <>
      <Navbar />
      <main
        style={{ marginTop: "2rem" }}
        className="container mx-auto px-4 py-8"
      >
        <div className="tasks-header">
          <h1 className="tasks-title">My Tasks</h1>
          <h3 className="task-placeholder">Your Tasks will appear here</h3>
          <button
            className="add-task-button"
            onClick={() => setShowTaskForm(true)}
          >
            Add New Task
          </button>
        </div>

        <TaskList tasks={tasks} onDelete={handleDelete} />

        {showTaskForm && (
          <TaskForm
            onClose={() => setShowTaskForm(false)}
            onTaskCreated={handleTaskCreated}
          />
        )}
      </main>
    </>
  );
}
