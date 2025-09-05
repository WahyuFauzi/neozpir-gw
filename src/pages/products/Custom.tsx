import { CTASchedule } from '../../components/cta/cta';
import customLogo from '../../assets/speech-bubble.webp';
import { useI18n } from '../../i18n/I18nContext';

const CustomService = () => {
  const { t } = useI18n();

  return (
    <div>
      <section class="bg-white py-12 px-4">
        <div class="max-w-7xl h-[48rem] mx-auto flex flex-col lg:flex-row items-center gap-12">
          <div class="w-full lg:w-1/2 flex justify-center">
            <img
              src={customLogo}
              alt="Custom Service Logo"
              class="w-[24rem] h-[24rem] object-contain"
            />
          </div>
          <div class="text-center lg:text-left max-w-xl">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              {t('customService.title')}
            </h2>
            <p class="text-gray-600 mb-6 text-lg">{t('customService.description')}</p>
          </div>
        </div>
      </section>
      <section class="bg-gray-50 py-12 px-4">
        <div class="max-w-7xl mx-auto">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">
            {t('customService.whatWeOffer.title')}
          </h2>
          <div class="grid md:grid-cols-2 gap-8">
            <div class="bg-white p-8 rounded-lg shadow-sm">
              <h3 class="text-2xl font-semibold mb-4">
                {t('customService.whatWeOffer.consultation.title')}
              </h3>
              <p>{t('customService.whatWeOffer.consultation.description')}</p>
            </div>
            <div class="bg-white p-8 rounded-lg shadow-sm">
              <h3 class="text-2xl font-semibold mb-4">
                {t('customService.whatWeOffer.development.title')}
              </h3>
              <p>{t('customService.whatWeOffer.development.description')}</p>
            </div>
          </div>
        </div>
      </section>
      <section class="py-20 px-8 bg-white">
        <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div class="w-full md:w-1/2">
            <h2 class="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
              {t('customService.getStarted.title')}
            </h2>
            <p class="text-gray-600 mb-6">{t('customService.getStarted.description')}</p>
            <a
              href="/about"
              class="w-fit bg-[#3DDC97] text-[#2C2C2C] px-6 py-3 rounded hover:bg-gray-700 transition"
            >
              {t('customService.getStarted.cta')}
            </a>
          </div>
        </div>
      </section>
      <CTASchedule />
    </div>
  );
};

export default CustomService;
