import { useI18n } from '../i18n/I18nContext';

const Partnership = () => {
  const { t } = useI18n();

  return (
    <>
      <div class="w-full p-3 lg:w-8/12 lg:mx-auto">
        <div class="p-10 text-center">
          <h1 class="text-4xl font-bold tracking-wider text-primary-focus">
            {t('partnershipTitle')}
          </h1>
          <p class="py-5 text-lg">{t('partnershipSubtitle')}</p>
        </div>
        <div class="flex flex-col items-center justify-center">
          <div class="w-full md:w-1/2">
            <img
              src="/src/assets/team-amico.webp"
              alt="Partnership"
              class="w-full h-auto"
            />
          </div>
          <div class="w-full md:w-1/2 mt-8">
            <h2 class="text-2xl font-bold text-primary-focus">
              {t('whyPartner')}
            </h2>
            <p class="w-full mt-4 text-lg text-justify">{t('partnerBenefit')}</p>
          </div>
          <div class="w-full flex md:w-1/2 my-4">
            <a
              href={`https://wa.me/6289670377077?text=${encodeURIComponent(
                t('whatsapp.partnershipMessage')
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              class="bg-[#3DDC97] text-[#2C2C2C] font-medium px-6 py-3 mx-auto rounded hover:bg-gray-200 transition mt-6"
            >
              {t('becomePartner')}
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Partnership;
