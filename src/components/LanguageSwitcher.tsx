import { useDispatch, useSelector } from "react-redux";
import { setLanguage } from "../features/language/languageSlice";
import { useTranslation } from "react-i18next";
import type { RootState } from "../store";
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

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLang = e.target.value;
    dispatch(setLanguage(selectedLang));
    i18n.changeLanguage(selectedLang);
  };

  return (
    <div className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
      <Globe className="w-4 h-4" />
      <select
        value={lang}
        onChange={handleChange}
        className="bg-transparent text-sm outline-none"
      >
        {languages.map(({ code, label }) => (
          <option key={code} value={code} className="text-black dark:text-white bg-white dark:bg-gray-800">
            {label}
          </option>
        ))}
      </select>
    </div>
  );
};
