import { useTodo } from "@/contexts/TodoContext";
import TodoItem from "./TodoItem";

export default function TodoList() {
  const { todos } = useTodo();

  return (
    <div className="space-y-2">
      {todos.length === 0 ? (
        <p className="text-muted-foreground text-center">
          No todos yet. Add one above!
        </p>
      ) : (
        todos.map((todo) => <TodoItem todo={todo} key={todo.id} />)
      )}
    </div>
  );
}
