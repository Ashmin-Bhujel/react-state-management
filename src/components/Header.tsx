import { ModeToggle } from "./mode-toggle";

export default function Header() {
  return (
    <header className="container mx-auto p-4">
      <nav className="flex items-center justify-between">
        <p className="text-2xl font-bold">React State Management</p>
        <ModeToggle />
      </nav>
    </header>
  );
}
