import { useI18n } from "../../i18n/I18nContext";
import { createSignal } from "solid-js";
import i18next from "i18next";
import indonesiaFlag from "../../assets/indonesia.webp";
import ukFlag from "../../assets/united-kingdom-flag.webp";

const Navbar = () => {
  const { t, changeLang } = useI18n()
  const [menuOpen, setMenuOpen] = createSignal(false);

  return (
    <nav class="bg-white border-gray-200 sticky top-0 z-50">
      <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" class="flex items-center space-x-3 rtl:space-x-reverse">
            <span class="self-center text-2xl font-semibold whitespace-nowrap text-[#3DDC97]">Neozpir</span>
        </a>
        <div class="flex md:hidden">
          <div class="flex items-center p-2 rounded-md bg-gray-200 mr-2">
            <img src={indonesiaFlag} alt="Indonesia Flag" class="w-6 h-4 bg-gray-200" />
            <label class="inline-flex items-center cursor-pointer mx-2">
              <input type="checkbox" value="" class="sr-only peer" onClick={() => changeLang(i18next.language === 'id' ? 'en-US' : 'id')} checked={i18next.language !== 'id'} />
              <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-400"></div>
            </label>
            <img src={ukFlag} alt="United Kingdom Flag" class="w-6 h-4" />
          </div>
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
              <a href="/" class="block py-2 px-3 text-gray-900 rounded-sm" onClick={() => {setMenuOpen(false); setMenuOpen(false)}}>{t('navbar.home')}</a>
            </li>
            <li>
              <a href="/products" class="block py-2 px-3 text-gray-900 rounded-sm" onClick={() => {setMenuOpen(false); setMenuOpen(false)}}>{t('navbar.services')}</a>
            </li>
            <li>
              <a href="/about" class="block py-2 px-3 text-gray-900 rounded-sm" onClick={() => {setMenuOpen(false); setMenuOpen(false)}}>{t('navbar.about')}</a>
            </li>
            {/* <li>
               <a href="/blog" class="block py-2 px-3 text-gray-900 rounded-sm" onClick={() => {setMenuOpen(false); setMenuOpen(false)}}>{t('navbar.blog')}</a>
            </li> */ } 
          </ul>
        </div>
        <div class="hidden md:flex items-center p-2 rounded-md bg-gray-200">
          <img src={indonesiaFlag} alt="Indonesia Flag" class="w-6 h-4 bg-gray-200" />
          <label class="inline-flex items-center cursor-pointer mx-2">
            <input type="checkbox" value="" class="sr-only peer" onClick={() => changeLang(i18next.language === 'id' ? 'en-US' : 'id')} checked={i18next.language !== 'id'} />
            <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-400"></div>
          </label>
          <img src={ukFlag} alt="United Kingdom Flag" class="w-6 h-4" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
