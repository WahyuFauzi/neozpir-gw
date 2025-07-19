import Banner from '../components/banner/banner';
import Card from '../components/card/card';
import shopifyLogo from '../assets/shopify.png';
import softwareLogo from '../assets/software.png';
import configurationLogo from '../assets/configuration.png';
import speechBubbleLogo from '../assets/speech-bubble.png';
import contactLogo from '../assets/contact-us-amico.png'
import { useI18n } from '../i18n/I18nContext';

function Home() {
  const { t } = useI18n();
  return (
    <div>
      <Banner></Banner>
      <section class="w-full h-[12rem]"></section>
      <section class="w-full">
        <h3 class="my-12 text-center text-5xl" >{t('serviceSection.title')}</h3>
        <p class="text-gray text-center text-xl mb-8">
          {t('serviceSection.description')}
        </p>
        <div class="flex flex-wrap w-full justify-center">
          <Card imgSrc={shopifyLogo} imgAlt="shopify-icon" title={t('serviceSection.cards.ecommerce.title')} text={t('serviceSection.cards.ecommerce.desc')} ></Card>
          <Card imgSrc={softwareLogo} imgAlt="software-icon" title={t('serviceSection.cards.enterprise.title')} text={t('serviceSection.cards.enterprise.desc')} ></Card>
          <Card imgSrc={configurationLogo} imgAlt="configuration-icon" title={t('serviceSection.cards.automation.title')} text={t('serviceSection.cards.automation.desc')}></Card>
          <Card imgSrc={speechBubbleLogo} imgAlt="speech-bubble-icon" title={t('serviceSection.cards.custom.title')} text={t('serviceSection.cards.custom.desc')}></Card>
        </div>
      </section>
      <section class="py-20 px-4 bg-white">
        <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div class="w-full md:w-1/2 flex justify-center">
            <div class="w-full h-64 md:h-80 bg-gray-300 rounded-lg flex items-center justify-center text-gray-500 text-sm">
              <img src={contactLogo} alt="startup-logo" class="w-full h-full object-contain" />
            </div>
          </div>
          <div class="w-full md:w-1/2">
            <h2 class="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
              {t('whyChooseSection.title')}
            </h2>
            <p class="text-gray-600 mb-6">
              {t('whyChooseSection.description')}
            </p>

            <ul class="space-y-4 text-gray-800">
              <li class="flex items-start gap-3">
                <svg class="w-5 h-5 text-gray-900 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M16.707 5.293a1 1 0 00-1.414 0L9 11.586 6.707 9.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l7-7a1 1 0 000-1.414z"/>
                </svg>
                {t('whyChooseSection.points.team')}
              </li>
              <li class="flex items-start gap-3">
                <svg class="w-5 h-5 text-gray-900 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M16.707 5.293a1 1 0 00-1.414 0L9 11.586 6.707 9.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l7-7a1 1 0 000-1.414z"/>
                </svg>
                {t('whyChooseSection.points.solutions')}
              </li>
              <li class="flex items-start gap-3">
                <svg class="w-5 h-5 text-gray-900 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M16.707 5.293a1 1 0 00-1.414 0L9 11.586 6.707 9.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l7-7a1 1 0 000-1.414z"/>
                </svg>
                {t('whyChooseSection.points.support')}
              </li>
            </ul>
          </div>

        </div>
      </section>
      <section class="bg-gray-900 text-white py-16 text-center px-4">
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
    </div>
  );
}
export default Home;
