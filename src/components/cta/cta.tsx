import { useI18n } from '../../i18n/I18nContext';
function CTASchedule() {
  const { t } = useI18n();
  return(
    <section class="bg-gray-900 text-white py-16 text-center px-8">
      <h2 class="text-2xl md:text-3xl font-semibold mb-4">
        {t('CTASection.title')}
      </h2>
      <p class="text-gray-300 mb-8 max-w-xl mx-auto">
        {t('CTASection.desc')}
      </p>
      <div class="flex flex-col sm:flex-row justify-center items-center gap-4">
        <a
          href="https://wa.me/6289670377077"
          class="bg-[#3DDC97] text-[#2C2C2C] font-medium px-6 py-3 rounded hover:bg-gray-200 transition"
        >
          {t('CTASection.button')}
        </a>
       </div>
    </section>
  )
}

export { CTASchedule }
