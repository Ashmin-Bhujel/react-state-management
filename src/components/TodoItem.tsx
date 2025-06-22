import { Button } from "./ui/button";
import { Pencil, Save, Trash2 } from "lucide-react";
import { useState } from "react";
import { Input } from "./ui/input";
import { Checkbox } from "./ui/checkbox";
import ConfirmationDialog from "./ConfirmationDialog";
import renderToaster from "@/utils/renderToaster";
import {
  useDeleteTodoMutation,
  useToggleDoneMutation,
  useUpdateTodoMutation,
  type TodoType,
} from "@/app/services/todosAPI";

export default function TodoItem({ todo }: { todo: TodoType }) {
  const [isEditable, setIsEditable] = useState(false);
  const [todoContent, setTodoContent] = useState(todo.content);
  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();
  const [toggleDone] = useToggleDoneMutation();

  return (
    <div
      key={todo.id}
      className="bg-card text-card-foreground mx-auto flex max-w-3xl items-center justify-between gap-4 rounded-lg border p-4 shadow-sm"
    >
      <div className="flex flex-1 items-center gap-2">
        <Checkbox
          checked={todo.done}
          onCheckedChange={() => {
            toggleDone({ id: todo.id, done: !todo.done });
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
          <ConfirmationDialog
            description="Do you want to update this todo?"
            action="Update"
            handlerFunction={() => {
              updateTodo({ id: todo.id, content: todoContent });
              renderToaster("Update Todo", "Successfully updated the todo.");
              setIsEditable(false);
            }}
          >
            <Save />
          </ConfirmationDialog>
        ) : (
          <Button
            onClick={() => setIsEditable(true)}
            variant={"secondary"}
            disabled={todo.done}
          >
            <Pencil />
          </Button>
        )}
        <ConfirmationDialog
          description="Do you want to delete this todo?"
          action="Delete"
          distructive={true}
          handlerFunction={() => {
            deleteTodo(todo.id);
            renderToaster("Delete Todo", "Successfully deleted the todo.");
          }}
        >
          <Trash2 />
        </ConfirmationDialog>
      </div>
    </div>
  );
}
