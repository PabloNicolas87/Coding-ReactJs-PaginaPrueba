import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import type { RootState } from "./store";
import { useLoadTranslations } from "./hooks/useLoadTranslations";
import { LanguageSwitcher } from "./components/LanguageSwitcher";

function App() {
  const lang = useSelector((state: RootState) => state.language.value);
  useLoadTranslations(lang);

  const { t, i18n } = useTranslation();

  // Verifica si ya se cargó el bundle
  const isReady = i18n.hasResourceBundle(lang, 'translation');

  if (!isReady) {
    return <div className="p-8">⏳ Cargando textos desde Firebase...</div>;
  }

  return (
    <main className="p-8">
      <LanguageSwitcher />
      <h1 className="text-2xl">{t("home.title", { defaultValue: "..." })}</h1>
      <p>{t("home.description", { defaultValue: "..." })}</p>
    </main>
  );
}

export default App;
