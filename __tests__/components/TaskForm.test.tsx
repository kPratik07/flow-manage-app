import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { TaskForm } from "../../components/TaskForm";

// Mock the API call
jest.mock("../../lib/api", () => ({
  createTask: jest.fn(),
  updateTask: jest.fn(),
}));

const mockOnSuccess = jest.fn();
const mockOnCancel = jest.fn();

describe("TaskForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders create form correctly", () => {
    render(<TaskForm onSuccess={mockOnSuccess} onCancel={mockOnCancel} />);

    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/priority/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/due date/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /create task/i })
    ).toBeInTheDocument();
  });

  it("renders edit form correctly", () => {
    const mockTask = {
      id: "1",
      title: "Test Task",
      description: "Test Description",
      priority: "HIGH" as const,
      dueDate: "2024-12-31",
      status: "PENDING" as const,
    };

    render(
      <TaskForm
        task={mockTask}
        onSuccess={mockOnSuccess}
        onCancel={mockOnCancel}
      />
    );

    expect(screen.getByDisplayValue("Test Task")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Test Description")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /update task/i })
    ).toBeInTheDocument();
  });

  it("validates required fields", async () => {
    render(<TaskForm onSuccess={mockOnSuccess} onCancel={mockOnCancel} />);

    const submitButton = screen.getByRole("button", { name: /create task/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/title is required/i)).toBeInTheDocument();
    });
  });

  it("calls onCancel when cancel button is clicked", () => {
    render(<TaskForm onSuccess={mockOnSuccess} onCancel={mockOnCancel} />);

    const cancelButton = screen.getByRole("button", { name: /cancel/i });
    fireEvent.click(cancelButton);

    expect(mockOnCancel).toHaveBeenCalledTimes(1);
  });
});
