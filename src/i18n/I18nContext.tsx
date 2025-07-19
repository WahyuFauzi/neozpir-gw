import { createSignal, createContext, useContext, onMount } from 'solid-js';
import i18next from 'i18next';
import englishJson from './locales/en.json'
import indonesiaJson from './locales/id.json'

const I18nContext = createContext();

export function I18nProvider(props: any) {
  const userLang = navigator.language || 'en';
  const [isReady, setIsReady] = createSignal(false);

  onMount(async () => {
    await i18next.init({
      lng: userLang,
      debug: import.meta.env.MODE !== 'production',
      resources: {
        'en-US': englishJson,
        id: indonesiaJson,
      }
    });
    setIsReady(true);
  });

  const t = (key: string) => i18next.t(key);
  const changeLang = (lang: string) => i18next.changeLanguage(lang);

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

