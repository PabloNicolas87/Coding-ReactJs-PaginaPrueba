import { LanguageSwitcher } from "./LanguageSwitcher";
import { ThemeToggle } from "./ThemeToggle";

export const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 flex justify-between items-center px-6 py-4 bg-white dark:bg-gray-900 shadow-md">
      <h1 className="text-xl font-bold text-gray-800 dark:text-white">
        🌐 Mi Portafolio
      </h1>

      <div className="flex gap-4">
        <LanguageSwitcher />
        <ThemeToggle />
      </div>
    </nav>
  );
};
