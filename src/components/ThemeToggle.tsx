import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../features/theme/themeSlice";
import { Sun, Moon } from "lucide-react";
import type { RootState } from "../store";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const ThemeToggle = () => {
  const dispatch = useDispatch();
  const mode = useSelector((state: RootState) => state.theme.mode);
  const isLoading = useSelector((state: RootState) => state.language.isLoading); // <--- aquí
  const { t } = useTranslation();

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
      disabled={isLoading}
    >
      {isLoading ? (
        <Skeleton width={80} height={24} borderRadius={6} />
      ) : mode === "dark" ? (
        <>
          <Sun className="w-4 h-4" />
          {t("theme.light", { defaultValue: "Claro" })}
        </>
      ) : (
        <>
          <Moon className="w-4 h-4" />
          {t("theme.dark", { defaultValue: "Oscuro" })}
        </>
      )}
    </button>
  );
};
