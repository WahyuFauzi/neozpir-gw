import { Show } from "solid-js";
import { useI18n } from "../../i18n/I18nContext";
import { createSignal } from "solid-js";

const Navbar = () => {
  const { t, changeLang } = useI18n()
  const [languageDropdown, setLanguageDropdown] = createSignal(false);
  const [menuOpen, setMenuOpen] = createSignal(false);

  return (
    <nav class="bg-white border-gray-200 sticky top-0 z-50">
      <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" class="flex items-center space-x-3 rtl:space-x-reverse">
            <span class="self-center text-2xl font-semibold whitespace-nowrap text-[#3DDC97]">Neozpir</span>
        </a>
        <div class="flex md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen())}
            class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-controls="navbar-default"
            aria-expanded={menuOpen()}
          >
            <span class="sr-only">Open main menu</span>
            <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
            </svg>
          </button>
        </div>
        <div class={`w-full md:block md:w-auto absolute md:relative ${menuOpen() ? 'block top-20' : 'hidden'}`} id="navbar-default">
          <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-white md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
            <li>
              <a href="/" class="block py-2 px-3 text-gray-900 rounded-sm" onClick={() => {setMenuOpen(false); setMenuOpen(false); setLanguageDropdown(false)}}>{t('navbar.home')}</a>
            </li>
            <li>
              <a href="/services" class="block py-2 px-3 text-gray-900 rounded-sm" onClick={() => {setMenuOpen(false); setMenuOpen(false); setLanguageDropdown(false)}}>{t('navbar.services')}</a>
            </li>
            <li>
              <a href="/about" class="block py-2 px-3 text-gray-900 rounded-sm" onClick={() => {setMenuOpen(false); setMenuOpen(false); setLanguageDropdown(false)}}>{t('navbar.about')}</a>
            </li>
            <li class={`relative ${menuOpen() ? 'block' : 'hidden'}`}>
              <button id="dropdownButton" class="block py-2 px-3 text-gray-900 rounded-sm" onClick={() => setLanguageDropdown(!languageDropdown())}>
                {t('navbar.language')}
              </button>
              <Show when={languageDropdown()}>
                <div id="dropdownMenu" class="absolute mt-2 w-32 bg-white rounded shadow-md z-10">
                  <ul class="text-sm text-gray-700">
                    <li onClick={() => {changeLang('id'); setMenuOpen(false); setLanguageDropdown(false);}}><p class="block px-4 py-2 hover:bg-green-100">{t('navbar.languageOptions.id')}</p></li>
                    <li onClick={() => {changeLang('en-US'); setMenuOpen(false); setLanguageDropdown(false);}}><p class="block px-4 py-2 hover:bg-green-100">{t('navbar.languageOptions.en')}</p></li>
                  </ul>
                </div>
              </Show>
            </li>
          </ul>
        </div>
        <div class="hidden relative md:block">
          <button id="dropdownButton" class="border border-gray-600 rounded px-4 py-2 cursor-pointer hover:bg-gray-500" onClick={() => setLanguageDropdown(!languageDropdown())}>
            {t('navbar.language')}
          </button>
          <Show when={languageDropdown()}>
            <div id="dropdownMenu" class="absolute mt-2 w-32 bg-white rounded shadow-md z-10">
              <ul class="text-sm text-gray-700">
                <li onClick={() => changeLang('id')}><p class="block px-4 py-2 hover:bg-green-100">{t('navbar.languageOptions.id')}</p></li>
                <li onClick={() => changeLang('en-US')}><p class="block px-4 py-2 hover:bg-green-100">{t('navbar.languageOptions.en')}</p></li>
              </ul>
            </div>
          </Show>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
