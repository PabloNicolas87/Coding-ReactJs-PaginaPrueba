import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../features/theme/themeSlice";
import { Sun, Moon } from "lucide-react";
import type { RootState } from "../store";
import { useEffect } from "react";

export const ThemeToggle = () => {
  const dispatch = useDispatch();
  const mode = useSelector((state: RootState) => state.theme.mode);

  useEffect(() => {
    const html = document.documentElement;
    if (mode === "dark") {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  }, [mode]);

  return (
    <button
      onClick={() => dispatch(toggleTheme())}
      className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
    >
      {mode === "dark" ? (
        <>
          <Sun className="w-4 h-4" />
          Claro
        </>
      ) : (
        <>
          <Moon className="w-4 h-4" />
          Oscuro
        </>
      )}
    </button>
  );
};
