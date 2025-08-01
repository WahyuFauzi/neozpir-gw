import Card from '../components/card/card';
import neozpirLogo from '../assets/working-remotely-amico.webp';
import diagramLogo from '../assets/diagram.webp';
import focusLogo from '../assets/focus.webp';
import { useI18n } from '../i18n/I18nContext';
import { CTASchedule } from '../components/cta/cta';

function About() {
  const { t } = useI18n();
  return(
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
            <img src={neozpirLogo} alt="startup-logo" class="w-full h-full object-contain" />
          </div>
        </div>
      </section>
      <section>
        <h3 class="my-12 text-center text-5xl"> {t('about.whatWeDo.title')} </h3>
        <div class="flex flex-wrap my-16 w-full justify-center gap-y-4">
          <Card imgSrc={diagramLogo} imgAlt="growth-icon" title={t('about.whatWeDo.cards.growth.title')} text={t('about.whatWeDo.cards.growth.desc')} className="w-2xl h-[16rem]"></Card>
          <Card imgSrc={focusLogo} imgAlt="focus-icon" title={t('about.whatWeDo.cards.focus.title')} text={t('about.whatWeDo.cards.focus.desc')} className="w-2xl h-[16rem]"></Card>
        </div>
      </section>
      <CTASchedule></CTASchedule>
    </div>
  )
}
export default About;
