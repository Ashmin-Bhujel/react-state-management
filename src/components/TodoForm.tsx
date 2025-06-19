import { useTodo } from "@/contexts/TodoContext";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";

export default function TodoForm() {
  const { addTodo } = useTodo();
  const [todo, setTodo] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmedTodo = todo.trim();
    if (!trimmedTodo) {
      setError("Please enter a todo");
      return;
    }

    try {
      setIsSubmitting(true);
      addTodo(trimmedTodo);
      setTodo("");
    } catch (error) {
      setError("Failed to add todo. Please try again.");
      console.error("Error adding todo:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-2xl space-y-6">
      <form className="space-y-2" onSubmit={handleSubmit}>
        <div className="flex gap-2">
          <Input
            type="text"
            name="todo"
            id="todo"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            placeholder="Enter a new todo"
            disabled={isSubmitting}
            autoFocus
            className={cn(
              "flex-1",
              error && "border-red-500 focus-visible:ring-red-500"
            )}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={error ? "todo-error" : undefined}
          />
          <Button
            type="submit"
            disabled={isSubmitting}
            className="min-w-[100px]"
          >
            {isSubmitting ? "Adding..." : "Add Todo"}
          </Button>
        </div>
        {error && (
          <p id="todo-error" className="text-sm text-red-500">
            {error}
          </p>
        )}
      </form>
    </div>
  );
}
