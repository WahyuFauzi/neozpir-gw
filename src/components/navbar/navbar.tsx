import { useI18n } from "../../i18n/I18nContext";
import { createSignal, createEffect, Show } from "solid-js";
import { useAuthContext } from "../../context/auth.context";
import { logoutUser } from "../../service/auth.service";
import indonesiaFlag from "../../assets/indonesia.webp";
import ukFlag from "../../assets/united-kingdom-flag.webp";

const Navbar = () => {
  const { t, changeLang } = useI18n();
  const [menuOpen, setMenuOpen] = createSignal(false);
  const [lang, setLang] = createSignal(t('selectedLanguage'));
  const { auth, setAuth } = useAuthContext();

  const changeLanguage = () => {
    if(lang() == 'en-US') {
      setLang('id-ID')
      changeLang('id-ID') 
    }
    else {
      setLang('en-US')
      changeLang('en-US') 
    }
  }

  const handleLogout = async () => {
    try {
      await logoutUser();
      setAuth({ session: null, providedToken: null });
    } catch (error) {
      console.error("Error logging out:", error);
      alert("Logout failed.");
    }
  };

  createEffect(() => {
    if (!auth()?.session) {
      // Optionally redirect to login if session becomes null
      // navigate("/login");
    }
  });
  
  return (
    <nav class="bg-white border-gray-200 sticky top-0 z-50">
      <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" class="flex items-center space-x-3 rtl:space-x-reverse">
            <span class="self-center text-2xl font-semibold whitespace-nowrap text-[#3DDC97]">Neozpir</span>
        </a>
        <div class="flex md:hidden">
          <div class="mt-1.5 mr-2">
            <button
              onClick={changeLanguage}
              class="p-2 rounded-md bg-gray-200 hover:bg-gray-300 transition-colors"
              aria-label={lang() === 'id-ID' ? "Switch to English" : "Switch to Indonesian"}
            >
              <img
                src={lang() === 'en-US' ? ukFlag : indonesiaFlag}
                alt={lang() === 'en-US' ? "United Kingdom Flag" : "Indonesian Flag"}
                class="w-6 h-4"
              />
            </button>
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
            <li>
               <a href="/blog" class="block py-2 px-3 text-gray-900 rounded-sm" onClick={() => {setMenuOpen(false); setMenuOpen(false)}}>{t('navbar.blog')}</a>
            </li>
            <Show when={auth()?.session}>
              <li>
                <button
                  onClick={handleLogout}
                  class="block py-2 px-3 text-gray-900 rounded-sm cursor-pointer"
                >
                  Logout (Dev)
                </button>
              </li>
            </Show>
          </ul>
        </div>
        <div class="hidden md:flex items-center">
          <Show when={auth()?.session}>
            <button
              onClick={handleLogout}
              class="px-4 py-2 mr-2 text-white bg-red-600 rounded-lg hover:bg-red-700"
            >
              Logout (Dev)
            </button>
          </Show>
          <button
            onClick={changeLanguage}
            class="p-2 rounded-md bg-gray-200 hover:bg-gray-300 transition-colors"
            aria-label={lang() === 'id-ID' ? "Switch to English" : "Switch to Indonesian"}
          >
            <img
              src={lang() === 'en-US' ? ukFlag : indonesiaFlag}
              alt={lang() === 'en-US' ? "United Kingdom Flag" : "Indonesian Flag"}
              class="w-6 h-4"
            />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;