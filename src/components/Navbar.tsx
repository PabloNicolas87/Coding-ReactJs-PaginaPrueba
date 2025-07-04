import { LanguageSwitcher } from "./LanguageSwitcher";
import { ThemeToggle } from "./ThemeToggle";
import { SectionsNavigator } from "./SectionsNavigator";

export const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 flex justify-between items-center px-6 py-4 bg-white dark:bg-gray-900 shadow-md">
      <h1 className="text-xl font-bold text-gray-800 dark:text-white">
        🌐 Mi Portafolio
      </h1>

      {/* Desktop: menú de secciones a la izquierda */}
      <div className="hidden md:flex gap-4 items-center">
        <SectionsNavigator />
        <LanguageSwitcher />
        <ThemeToggle />
      </div>

      {/* Mobile/Tablet: menú hamburguesa a la derecha */}
      <div className="flex md:hidden gap-4 items-center">
        <LanguageSwitcher />
        <ThemeToggle />
        <SectionsNavigator />
      </div>
    </nav>
  );
};
