import startUpLogo from '../../assets/startup-life-amico.webp';
import { useI18n } from '../../i18n/I18nContext';

const Banner = () => {
  const { t } = useI18n();
  return (
    <section class="bg-white mt-12 py-20 px-4 sm:mx-12 lg:mx-16 sm:px-20 lg:mx-32">
      <div class="w-full mx-auto flex flex-col-reverse lg:flex-row items-center gap-12">
        <div class="w-full lg:w-1/2 text-center lg:text-left ">
          <h1
            class="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4"
            innerHTML={t('banner.mainText')}
          ></h1>
          <p class="text-gray-600 mb-6" innerHTML={t('banner.secondaryText')}></p>
          <div class="w-fit flex flex-col sm:flex-row justify-center lg:justify-start gap-4 max-lg:mx-auto">
            <a
              href="/products"
              class="w-full h-full bg-[#3DDC97] text-[#2C2C2C] px-6 py-3 rounded hover:bg-gray-700 transition"
            >
              {t('banner.CTAText')}
            </a>
          </div>
        </div>
        <div class="w-full lg:w-1/2 flex justify-center">
          <img src={startUpLogo} alt="startup-logo" class="w-full h-full object-contain" />
        </div>
      </div>
    </section>
  );
};

export default Banner;
