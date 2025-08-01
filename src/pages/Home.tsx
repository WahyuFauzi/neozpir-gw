import Banner from '../components/banner/banner';
import Card from '../components/card/card';
import { CTASchedule } from '../components/cta/cta';
import shopifyLogo from '../assets/shopify.webp';
import softwareLogo from '../assets/software.webp';
import configurationLogo from '../assets/configuration.webp';
import speechBubbleLogo from '../assets/speech-bubble.webp';
import contactLogo from '../assets/contact-us-amico.webp'
import { useI18n } from '../i18n/I18nContext';

function Home() {
  const { t } = useI18n();
  return (
    <div>
      <Banner></Banner>
      <section class="w-full h-[12rem]"></section>
      <section class="px-24">
        <h3 class="my-12 text-center text-5xl" >{t('serviceSection.title')}</h3>
        <p class="text-gray text-center text-xl mb-8">
          {t('serviceSection.description')}
        </p>
        <div class="flex flex-wrap w-full justify-center gap-y-4">
          <Card href="/products/ecommerce" imgSrc={shopifyLogo} imgAlt="shopify-icon" title={t('serviceSection.cards.ecommerce.title')} text={t('serviceSection.cards.ecommerce.desc')} ></Card>
          <Card href="/products/enterprise" imgSrc={softwareLogo} imgAlt="software-icon" title={t('serviceSection.cards.enterprise.title')} text={t('serviceSection.cards.enterprise.desc')} ></Card>
          <Card href="/products/automation" imgSrc={configurationLogo} imgAlt="configuration-icon" title={t('serviceSection.cards.automation.title')} text={t('serviceSection.cards.automation.desc')}></Card>
          <Card href="/products/custom" imgSrc={speechBubbleLogo} imgAlt="speech-bubble-icon" title={t('serviceSection.cards.custom.title')} text={t('serviceSection.cards.custom.desc')}></Card>
        </div>
      </section>
      <section class="py-20 px-8 bg-white">
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
      <CTASchedule></CTASchedule>
    </div>
  );
}
export default Home;
