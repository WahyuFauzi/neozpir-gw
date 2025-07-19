import { createSignal, createContext, useContext, onMount } from 'solid-js';
import i18next from 'i18next';
import englishJson from './locales/en.json'
import indonesiaJson from './locales/id.json'

const I18nContext = createContext();

export function I18nProvider(props: any) {
  const [isReady, setIsReady] = createSignal(false);
  const [version, setVersion] = createSignal(0);

  onMount(async () => {
    const lng = navigator.language || 'en-US';
    await i18next.init({
      lng,
      debug: import.meta.env.MODE !== 'production',
      resources: {
        'en-US': englishJson,
        id: indonesiaJson,
      }
    });
    setIsReady(true);
  });

  const t = (key: string) => {
    version(); // Depend on the version signal for reactivity
    return i18next.t(key);
  };

  const changeLang = async (lang: string) => {
    const newLang = lang == 'id' ? 'id' : 'en-US';
    await i18next.changeLanguage(newLang);
    setVersion(v => v + 1); // Increment version to trigger updates
  };

  return (
    <>
      {!isReady() ? (
        <div>Loading translations...</div>
      ) : (
        <I18nContext.Provider value={{ t, changeLang }}>
          {props.children}
        </I18nContext.Provider>
      )}
    </>
  );
}

export function useI18n() {
  return useContext(I18nContext) as any;
}

