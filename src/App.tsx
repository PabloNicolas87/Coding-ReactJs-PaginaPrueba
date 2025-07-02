import { useSelector } from "react-redux";
import type { RootState } from "./store";
import { useTranslation } from "react-i18next";
import { useLoadTranslations } from "./hooks/useLoadTranslations";
import { Navbar } from "./components/Navbar";

function App() {
  const lang = useSelector((state: RootState) => state.language.value);
  useLoadTranslations(lang);

  const { t, i18n } = useTranslation();
  const isReady = i18n.hasResourceBundle(lang, "translation");

  if (!isReady) {
    return <div className="p-8">⏳ Cargando textos desde Firebase...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-white transition-colors duration-300">
      <Navbar />

      <main className="p-8">
        <h1 className="text-2xl font-semibold mb-4">
          {t("home.title", { defaultValue: "..." })}
        </h1>
        <p className="text-lg">
          {t("home.description", { defaultValue: "..." })}
        </p>
      </main>
    </div>
  );
}

export default App;
