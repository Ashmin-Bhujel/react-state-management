import { useTodo, type TodoType } from "@/contexts/TodoContext";
import { Button } from "./ui/button";
import { Pencil, Save, Trash2 } from "lucide-react";
import { useState } from "react";
import { Input } from "./ui/input";
import { Checkbox } from "./ui/checkbox";

export default function TodoItem({ todo }: { todo: TodoType }) {
  const [isEditable, setIsEditable] = useState(false);
  const [todoContent, setTodoContent] = useState(todo.content);
  const { updateTodo, deleteTodo, toggleDone } = useTodo();

  function handleUpdate(id: string, content: string) {
    const response = confirm("Are you sure you want to update this todo?");

    if (response) {
      updateTodo(id, content);
    }
  }

  function handleDelete(id: string) {
    const response = confirm("Are you sure you want to delete this todo?");

    if (response) {
      deleteTodo(id);
    }
  }

  return (
    <div
      key={todo.id}
      className="bg-card text-card-foreground mx-auto flex max-w-3xl items-center justify-between gap-4 rounded-lg border p-4 shadow-sm"
    >
      <div className="flex flex-1 items-center gap-2">
        <Checkbox
          checked={todo.done}
          onCheckedChange={() => {
            toggleDone(todo.id, !todo.done);
          }}
        />
        {isEditable ? (
          <Input
            value={todoContent}
            onChange={(e) => setTodoContent(e.target.value)}
          />
        ) : (
          <p className={todo.done ? "line-through" : ""}>{todo.content}</p>
        )}
      </div>

      <div className="space-x-2">
        {isEditable ? (
          <Button
            onClick={() => {
              handleUpdate(todo.id, todoContent);
              setIsEditable(false);
            }}
          >
            <Save />
          </Button>
        ) : (
          <Button
            onClick={() => setIsEditable(true)}
            variant={"secondary"}
            disabled={todo.done}
          >
            <Pencil />
          </Button>
        )}

        <Button variant={"destructive"} onClick={() => handleDelete(todo.id)}>
          <Trash2 />
        </Button>
      </div>
    </div>
  );
}
