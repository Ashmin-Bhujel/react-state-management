import { Header } from "./components";
import { ThemeProvider } from "./components/theme-provider";
import { Button } from "./components/ui/button";

function App() {
  return (
    <ThemeProvider defaultTheme="system" key="vite-ui-theme">
      <Header />
      <main className="container mx-auto flex flex-col gap-4 p-8">
        <Button className="mx-auto w-fit">Hello World</Button>
      </main>
    </ThemeProvider>
  );
}

export default App;
