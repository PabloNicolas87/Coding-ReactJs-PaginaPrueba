import { Popover } from "@headlessui/react";
import { ChevronDown, Globe, Check } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setLanguage } from "../features/language/languageSlice";
import { useTranslation } from "react-i18next";
import type { RootState } from "../store";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useRef, useState } from "react";

const LANG_CODES = ["en", "es", "pt"];

export const LanguageSwitcher = () => {
  const dispatch = useDispatch();
  const lang = useSelector((state: RootState) => state.language.value);
  const isLoading = useSelector((state: RootState) => state.language.isLoading);
  const { t, i18n } = useTranslation();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [forceOpen, setForceOpen] = useState(false);

  const languageOptions =
    i18n.getResource(lang, "translation", "languageOptions") || {};

  const isOptionsReady = Object.keys(languageOptions).length > 0;

  // Detecta si es mobile
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  const handleChange = (selectedLang: string, close: () => void) => {
    dispatch(setLanguage(selectedLang));
    i18n.changeLanguage(selectedLang);
    close();
    setForceOpen(false);
  };

  return (
    <Popover className="relative">
      {({ open, close }) => (
        <div
          onMouseEnter={() => {
            if (!isMobile) {
              if (timeoutRef.current) clearTimeout(timeoutRef.current);
              if (!open) (document.activeElement as HTMLElement)?.blur();
              if (!open && (close as any).openPopover) (close as any).openPopover();
            }
          }}
          onMouseLeave={() => {
            if (!isMobile) {
              timeoutRef.current = setTimeout(() => {
                close();
              }, 150);
            }
          }}
        >
          <Popover.Button
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors outline-none w-32 justify-between"
            onClick={() => {
              if (isMobile) setForceOpen((prev) => !prev);
            }}
          >
            <Globe className="w-4 h-4" />
            {languageOptions[lang]}
            <ChevronDown className="w-4 h-4 ml-2" />
          </Popover.Button>
          {(open || forceOpen) && (
            <Popover.Panel className="absolute mt-1 w-full bg-white dark:bg-gray-800 rounded shadow-lg z-50 flex flex-col gap-2 p-2">
              {isLoading || !isOptionsReady ? (
                <Skeleton width={80} height={24} borderRadius={6} />
              ) : (
                LANG_CODES.map((code) => (
                  <button
                    key={code}
                    onClick={() => handleChange(code, close)}
                    className={`py-2 px-3 rounded cursor-pointer transition-colors flex items-center w-full text-left
                      ${
                        lang === code
                          ? "font-bold bg-gray-100 dark:bg-gray-700"
                          : "bg-white dark:bg-gray-800"
                      }
                      hover:bg-gray-100 dark:hover:bg-gray-700`}
                  >
                    {languageOptions[code]}
                    {lang === code && <Check className="w-4 h-4 ml-2" />}
                  </button>
                ))
              )}
            </Popover.Panel>
          )}
        </div>
      )}
    </Popover>
  );
};
