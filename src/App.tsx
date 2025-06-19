import { Toaster } from "sonner";
import { Header, TodoForm, TodoList } from "./components";
import { ThemeProvider } from "./components/theme-provider";
import { TodoProvider } from "./contexts/TodoContext";

function App() {
  return (
    <ThemeProvider defaultTheme="system" key="vite-ui-theme">
      <Toaster theme="system" closeButton />
      <TodoProvider>
        <Header />
        <main className="container mx-auto flex flex-col gap-8 p-8">
          <h1 className="text-center text-3xl font-semibold">
            React Todo Application
          </h1>
          <TodoForm />
          <TodoList />
        </main>
      </TodoProvider>
    </ThemeProvider>
  );
}

export default App;
