import { useI18n } from '../../i18n/I18nContext';
import { createSignal, Show } from 'solid-js';
import { useAuthContext } from '../../context/auth.context';
import AuthService from '../../service/auth.service';
import indonesiaFlag from '../../assets/indonesia.webp';
import ukFlag from '../../assets/united-kingdom-flag.webp';

const Navbar = () => {
  const { t, changeLang } = useI18n();
  const [menuOpen, setMenuOpen] = createSignal(false);
  const [lang, setLang] = createSignal(t('selectedLanguage'));
  const { auth, setAuth } = useAuthContext();
  const authService = new AuthService();

  const changeLanguage = () => {
    if (lang() == 'en-US') {
      setLang('id-ID');
      changeLang('id-ID');
    } else {
      setLang('en-US');
      changeLang('en-US');
    }
  };

  const handleLogout = async () => {
    try {
      await authService.logoutUser();
      setAuth({ session: null, providedToken: null });
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <nav class="bg-white border-gray-200 sticky top-0 z-50">
      <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div class="flex items-center space-x-3 rtl:space-x-reverse w-1/2 md:w-auto">
          <a href="/" class="flex items-center space-x-3 rtl:space-x-reverse">
            <span class="self-center text-2xl font-semibold whitespace-nowrap text-[#3DDC97]">
              Neozpir
            </span>
          </a>
        </div>
        <div class="flex md:hidden items-center justify-end w-1/2">
          <Show when={auth()?.session}>
            <li class="flex justify-center md:hidden">
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                class="px-4 py-2 rounded-full hover:bg-gray-200 outline-2 outline-gray-500/50 cursor-pointer"
              >
                Logout
              </button>
            </li>
          </Show>
          <button
            onClick={changeLanguage}
            class="p-2 rounded-md bg-gray-200 hover:bg-gray-300 transition-colors mx-4"
            aria-label={lang() === 'id-ID' ? 'Switch to English' : 'Switch to Indonesian'}
          >
            <img
              src={lang() === 'en-US' ? ukFlag : indonesiaFlag}
              alt={lang() === 'en-US' ? 'United Kingdom Flag' : 'Indonesian Flag'}
              class="w-6 h-4"
            />
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen())}
            class="inline-flex w-10 h-10 justify-center items-center text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-controls="navbar-default"
            aria-expanded={menuOpen()}
          >
            <span class="sr-only">Open main menu</span>
            <svg
              class="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          class={`w-full mx-auto md:block md:w-auto ${menuOpen() ? 'block' : 'hidden'}`}
          id="navbar-default"
        >
          <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
            <li>
              <a
                href="/"
                class="block py-2 px-3 text-gray-900 rounded-sm"
                onClick={() => {
                  setMenuOpen(false);
                }}
              >
                {t('navbar.home')}
              </a>
            </li>
            <li>
              <a
                href="/products"
                class="block py-2 px-3 text-gray-900 rounded-sm"
                onClick={() => {
                  setMenuOpen(false);
                }}
              >
                {t('navbar.services')}
              </a>
            </li>
            <li>
              <a
                href="/about"
                class="block py-2 px-3 text-gray-900 rounded-sm"
                onClick={() => {
                  setMenuOpen(false);
                }}
              >
                {t('navbar.about')}
              </a>
            </li>
            <li>
              <a
                href="/blog"
                class="block py-2 px-3 text-gray-900 rounded-sm"
                onClick={() => {
                  setMenuOpen(false);
                }}
              >
                {t('navbar.blog')}
              </a>
            </li>
            <li>
              <a
                href="/partnership"
                class="block py-2 px-3 text-gray-900 rounded-sm"
                onClick={() => {
                  setMenuOpen(false);
                }}
              >
                {t('navbar.partnership')}
              </a>
            </li>
            <Show when={!auth()?.session}>
              <li class="max-w-32 rounded-full outline-2 outline-gray-500/50 cursor-pointer text-center my-2 md:my-0 md:hidden">
                <a
                  href="/login"
                  class="block py-2 px-3 hover:bg-gray-200 rounded-full"
                  onClick={() => setMenuOpen(false)}
                >
                  {t('navbar.login')}
                </a>
              </li>
              <li class="max-w-32 rounded-full cursor-pointer text-center my-2 md:my-0 md:hidden">
                <a
                  href="/register"
                  class="w-full block py-2 px-3 text-gray-900 rounded-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)]"
                  onClick={() => setMenuOpen(false)}
                >
                  {t('navbar.register')}
                </a>
              </li>
            </Show>
          </ul>
        </div>
        <div>
          <div class="hidden md:flex items-center">
            <Show when={auth()?.session}>
              <button
                onClick={handleLogout}
                class="px-4 py-2 mr-2 rounded-full hover:bg-gray-200 outline-2 outline-gray-500/50 cursor-pointer"
              >
                Logout
              </button>
            </Show>
            <Show when={!auth()?.session}>
              <div class="max-w-32 rounded-full outline-2 outline-gray-500/50 cursor-pointer text-center my-2 mx-2 hidden md:my-0 md:block">
                <a
                  href="/login"
                  class="block py-2 px-3 hover:bg-gray-200 rounded-full"
                  onClick={() => setMenuOpen(false)}
                >
                  {t('navbar.login')}
                </a>
              </div>
              <div class="max-w-32 rounded-full cursor-pointer text-center my-2 hidden md:my-0 md:block mx-2">
                <a
                  href="/register"
                  class="w-full block py-2 px-3 text-gray-900 rounded-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)]"
                  onClick={() => setMenuOpen(false)}
                >
                  {t('navbar.register')}
                </a>
              </div>
            </Show>
            <button
              onClick={changeLanguage}
              class="p-2 rounded-md bg-gray-200 hover:bg-gray-300 transition-colors"
              aria-label={lang() === 'id-ID' ? 'Switch to English' : 'Switch to Indonesian'}
            >
              <img
                src={lang() === 'en-US' ? ukFlag : indonesiaFlag}
                alt={lang() === 'en-US' ? 'United Kingdom Flag' : 'Indonesian Flag'}
                class="w-6 h-4"
              />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
