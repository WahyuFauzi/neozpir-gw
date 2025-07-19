
import { useI18n } from "../../i18n/I18nContext";

function Footer()  {
  const { t } = useI18n();
  return(
    <footer class="bg-white border-t border-gray-200 py-12 px-4">
      <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-gray-700">
        <div>
          <div class="flex items-center gap-2 mb-3">
            <div class="w-4 h-4 bg-gray-900 rounded"></div>
            <span class="text-lg font-semibold text-gray-900">{t('footer.brand')}</span>
          </div>
          <p class="text-sm text-gray-600">
            {t('footer.tagline')}
          </p>
        </div>
        <div>
          <h4 class="text-sm font-semibold text-gray-900 mb-3">{t('footer.services.title')}</h4>
          <ul class="space-y-2 text-sm">
            <li><a href="#" class="hover:underline">{t('footer.services.items.0')}</a></li>
            <li><a href="#" class="hover:underline">{t('footer.services.items.1')}</a></li>
            <li><a href="#" class="hover:underline">{t('footer.services.items.2')}</a></li>
          </ul>
        </div>
        <div>
          <h4 class="text-sm font-semibold text-gray-900 mb-3">{t('footer.company.title')}</h4>
          <ul class="space-y-2 text-sm">
            <li><a href="/about" class="hover:underline">{t('footer.company.about')}</a></li>
          </ul>
        </div>
        <div>
          <h4 class="text-sm font-semibold text-gray-900 mb-3">{t('footer.contact.title')}</h4>
          <ul class="space-y-2 text-sm">
            <li class="flex items-center gap-2">
              <svg class="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.94 6.94a10.15 10.15 0 0010.12 10.12l1.58-1.58a.75.75 0 01.75-.2c1.64.48 3.4.74 5.25.74a.75.75 0 00.75-.75V2.75a.75.75 0 00-.75-.75H2.75a.75.75 0 00-.75.75v3.5a.75.75 0 00.94.69z"/>
              </svg>
              <a href="mailto:support@neozpir.com" class="hover:underline">{t('footer.contact.email')}</a>
            </li>
            <li class="flex items-center gap-2">
              <svg class="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884l.342-.342a2.96 2.96 0 014.214 0l1.72 1.72a2.96 2.96 0 010 4.214l-.343.343a.75.75 0 00-.166.823c.22.58.502 1.137.84 1.653a.75.75 0 00.774.332l1.918-.48a2.96 2.96 0 012.85.777l2.131 2.132a2.96 2.96 0 010 4.214l-.342.342a2.96 2.96 0 01-4.214 0l-1.72-1.72a2.96 2.96 0 01-.777-2.85l.48-1.918a.75.75 0 00-.332-.774 10.15 10.15 0 01-1.653-.84.75.75 0 00-.823.166l-.343.343a2.96 2.96 0 01-4.214 0l-2.132-2.132a2.96 2.96 0 010-4.214z"/>
              </svg>
              <a href="https://wa.me/6289670377077" class="hover:underline">{t('footer.contact.phone')}</a>
            </li>
          </ul>
        </div>

      </div>
      <div class="mt-10 border-t border-gray-200 pt-6 text-center text-sm text-gray-500">
        © 2025 Neozpir. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
