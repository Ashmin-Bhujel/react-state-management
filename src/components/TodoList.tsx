import { useGetTodosQuery } from "@/app/services/todosAPI";
import TodoItem from "./TodoItem";

export default function TodoList() {
  const { data } = useGetTodosQuery("");

  return (
    <div className="space-y-2">
      {data?.length === 0 ? (
        <p className="text-muted-foreground text-center">
          No todos yet. Add one above!
        </p>
      ) : (
        data?.map((todo) => <TodoItem todo={todo} key={todo.id} />)
      )}
    </div>
  );
}
