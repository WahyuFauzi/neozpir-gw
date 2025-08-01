import Card from '../components/card/card';
import { CTASchedule } from '../components/cta/cta';
import serviceLogo from '../assets/contact-us-amico.webp'
import shopifyLogo from '../assets/shopify.webp';
import softwareLogo from '../assets/software.webp';
import configurationLogo from '../assets/configuration.webp';
import speechBubbleLogo from '../assets/speech-bubble.webp';
import { useI18n } from '../i18n/I18nContext';

function Service() {
  const { t } = useI18n();
  return (
    <div>
      <section class="bg-white py-8 px-4">
        <div class="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-12">
          <div class="text-center lg:text-left max-w-xl">
            <div class="flex flex-col items-center justify-center h-full text-start px-4">
              <h2 class="text-2xl md:text-3xl font-bold text-gray-800 mb-4">{t('about.title')}</h2>
              <p class="text-gray-600 mb-6 text-lg">
                {t('about.description')}
              </p>
            </div>
          </div>
          <div class="w-full lg:w-1/2 flex justify-center">
            <img src={serviceLogo} alt="startup-logo" class="w-full h-full object-contain" />
          </div>
        </div>
      </section>
      <section class="w-full my-[12rem]">
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
      <CTASchedule></CTASchedule>
    </div>
  )
}

export default Service;
