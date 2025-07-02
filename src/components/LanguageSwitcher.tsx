// src/components/LanguageSwitcher.tsx
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store";
import { setLanguage } from "../features/language/languageSlice";
import { useTranslation } from "react-i18next";
import { Globe } from "lucide-react";

const languages = [
  { code: "es", label: "Español" },
  { code: "en", label: "Inglés" },
  { code: "pt", label: "Portugués" },
];

export const LanguageSwitcher = () => {
  const dispatch = useDispatch();
  const lang = useSelector((state: RootState) => state.language.value);
  const { i18n } = useTranslation();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLang = event.target.value;
    dispatch(setLanguage(selectedLang));
    i18n.changeLanguage(selectedLang);
  };

  return (
    <div className="flex items-center gap-3 p-3 rounded-md bg-white dark:bg-gray-800 shadow-md w-fit mx-auto mb-6">
      <Globe className="w-5 h-5 text-blue-500" />
      <label
        htmlFor="lang"
        className="text-sm font-semibold text-gray-800 dark:text-gray-200"
      >
        Idioma:
      </label>
      <select
        id="lang"
        value={lang}
        onChange={handleChange}
        className="text-sm px-3 py-1 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {languages.map(({ code, label }) => (
          <option key={code} value={code}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
};
