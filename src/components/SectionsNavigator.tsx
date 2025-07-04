import { useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import { useLoadSections } from "../hooks/useLoadSections";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Menu } from "lucide-react";

export const SectionsNavigator = () => {
  const [open, setOpen] = useState(false);
  const lang = useSelector((state: RootState) => state.language.value);
  const isLoading = useSelector((state: RootState) => state.language.isLoading);
  const sections = useLoadSections(lang);

  // Skeletons para loading
  const skeletons = Array.from({ length: 3 }).map((_, i) => (
    <Skeleton key={i} width={90} height={24} borderRadius={6} />
  ));

  return (
    <div className="relative">
      {/* Desktop: menú horizontal */}
      <nav className="hidden md:flex gap-4 items-center">
        {isLoading
          ? skeletons
          : sections.map(({ slug, label }) => (
              <a
                key={slug}
                href={`#${slug}`}
                className="flex items-center justify-center h-6 px-2 text-center hover:underline"
              >
                {label}
              </a>
            ))}
      </nav>

      {/* Tablet/Mobile: menú hamburguesa */}
      <div className="md:hidden flex items-center">
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="p-2 rounded focus:outline-none focus:ring-2 focus:ring-gray-400"
          aria-label="Abrir menú"
        >
          <Menu className="w-6 h-6" />
        </button>
        {/* Overlay y menú desplegable */}
        {open && (
          <div className="absolute right-0 top-10 mt-2 w-48 bg-white dark:bg-gray-800 rounded shadow-lg z-50">
            <nav className="flex flex-col gap-2 p-4">
              {isLoading
                ? skeletons
                : sections.map(({ slug, label }) => (
                    <a
                      key={slug}
                      href={`#${slug}`}
                      className="py-2 px-3 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setOpen(false)}
                    >
                      {label}
                    </a>
                  ))}
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};