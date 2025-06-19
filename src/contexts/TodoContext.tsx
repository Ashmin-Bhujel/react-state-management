import { createContext, useContext, useEffect, useState } from "react";

export interface TodoType {
  id: string;
  content: string;
  done: boolean;
}

export interface TodoContextType {
  todos: TodoType[];
  setTodos: (todos: TodoType[]) => void;
  addTodo: (content: string) => void;
  updateTodo: (id: string, content: string) => void;
  deleteTodo: (id: string) => void;
  toggleDone: (id: string, done: boolean) => void;
}

const initialTodoContextState: TodoContextType = {
  todos: [],
  setTodos: () => null,
  addTodo: () => null,
  updateTodo: () => null,
  deleteTodo: () => null,
  toggleDone: () => null,
};

const todoContext = createContext<TodoContextType>(initialTodoContextState);

export function TodoProvider({ children }: { children: React.ReactNode }) {
  const [todos, setTodos] = useState<TodoType[]>([]);

  // Add todo
  async function addTodo(content: string) {
    try {
      // Create the new todo object
      const newTodo: TodoType = {
        id: crypto.randomUUID(),
        content,
        done: false,
      };

      // First update local state
      setTodos((prevTodos) => [...prevTodos, newTodo]);

      // Then make the API call
      const res = await fetch("http://localhost:5000/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTodo),
      });

      // If API call fails, revert the local state
      if (!res.ok) {
        setTodos((prevTodos) =>
          prevTodos.filter((todo) => todo.id !== newTodo.id)
        );
        throw new Error("Failed to add new todo");
      }
    } catch (error) {
      console.error("Failed to add new todo:", error);
      throw error;
    }
  }

  // Update todo
  async function updateTodo(id: string, content: string) {
    try {
      // Have a backup
      const backupTodos = [...todos];

      // First update local state
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo.id === id ? { ...todo, content } : todo))
      );

      // Then make the API call
      const res = await fetch(`http://localhost:5000/todos/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });

      // If API call fails, revert the local state
      if (!res.ok) {
        setTodos(backupTodos);
        throw new Error("Failed to update todo");
      }
    } catch (error) {
      console.error("Failed to update todo:", error);
      throw error;
    }
  }

  // Delete todo
  async function deleteTodo(id: string) {
    try {
      // Have a backup
      const backupTodos = [...todos];

      // First update local state
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));

      // Then make the API call
      const res = await fetch(`http://localhost:5000/todos/${id}`, {
        method: "DELETE",
      });

      // If API call fails, revert the local state
      if (!res.ok) {
        setTodos(backupTodos);
        throw new Error("Failed to delete todo");
      }
    } catch (error) {
      console.error("Failed to delete todo:", error);
      throw error;
    }
  }

  // Toggle done
  async function toggleDone(id: string, done: boolean) {
    try {
      // Have a backup
      const backupTodos = [...todos];

      // First update local state
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, done: !todo.done } : todo
        )
      );

      // Then make the API call
      const res = await fetch(`http://localhost:5000/todos/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ done }),
      });

      // If API call fails, revert the local state
      if (!res.ok) {
        setTodos(backupTodos);
        throw new Error("Failed to toggle done status for todo");
      }
    } catch (error) {
      console.error("Failed to toggle done status for todo:", error);
      throw error;
    }
  }

  // Fetch todos from db.json
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await fetch("http://localhost:5000/todos", {
          method: "GET",
        });
        const data = await res.json();
        setTodos(data);
      } catch (error) {
        console.error("Failed to fetch todos:", error);
      }
    };
    fetchTodos();
  }, []);

  return (
    <todoContext.Provider
      value={{ todos, setTodos, addTodo, updateTodo, deleteTodo, toggleDone }}
    >
      {children}
    </todoContext.Provider>
  );
}

export function useTodo() {
  return useContext(todoContext);
}
