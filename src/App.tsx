import { Toaster } from "sonner";
import { ThemeProvider } from "./components/theme-provider";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { Header, TodoList } from "./components";
import TodoForm from "./components/TodoForm";

function App() {
  return (
    <ThemeProvider defaultTheme="system" key="vite-ui-theme">
      <Toaster theme="system" closeButton />
      <Provider store={store}>
        <Header />
        <main className="container mx-auto flex flex-col gap-8 p-8">
          <h1 className="text-center text-3xl font-semibold">
            React Todo Application
          </h1>
          <TodoForm />
          <TodoList />
        </main>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
