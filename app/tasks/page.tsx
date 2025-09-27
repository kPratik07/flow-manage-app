"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
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
  const { data: session, status } = useSession();
  const router = useRouter();
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [status, router]);

  const fetchTasks = async () => {
    try {
      const response = await fetch("/api/tasks");
      if (!response.ok) {
        if (response.status === 401) {
          // Unauthorized - redirect to login
          router.push("/auth/login");
          return;
        }
        throw new Error("Failed to fetch tasks");
      }
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    if (session) {
      fetchTasks();
    }
  }, [session]);

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

  // Show loading while checking authentication
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render anything if not authenticated (will redirect)
  if (!session) {
    return null;
  }

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
