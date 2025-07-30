import { useI18n } from '../i18n/I18nContext';

function NotFound() {
  const { t } = useI18n();

  return (
    <div class="bg-white py-8 px-4 text-center">
      <h1 class="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <p class="text-2xl text-gray-600 mb-8">{t('notFound.message')}</p>
      <a href="/" class="text-blue-500 hover:underline">
        {t('notFound.goHome')}
      </a>
    </div>
  );
}

export default NotFound;
