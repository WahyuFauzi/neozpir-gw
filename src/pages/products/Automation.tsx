import { createSignal, createResource, For, createEffect, Show } from 'solid-js';
import { CTASchedule } from '../../components/cta/cta';
import automationLogo from '../../assets/configuration.webp';
import { useI18n } from '../../i18n/I18nContext';
import { getAutomationPlans } from '../../service/product.service';

const AutomationService = () => {
  const { t }  = useI18n();
  const [isYearly, setIsYearly] = createSignal(false);
  const [productList] = createResource(() => t('selectedLanguage'), getAutomationPlans);

  // Optional: Effect to log language changes, without causing re-fetch loop
  createEffect(() => {
    const currentLanguage = t('selectedLanguage');
    console.log('Current language:', currentLanguage);
  });

  const formatPrice = (price: { monthly: number; original_monthly?: number; } | string) => {
    if (typeof price === 'string') return price;
    const selectedPrice = isYearly() ? price.monthly * 9 : price.monthly;
    const priceInK =  selectedPrice;
    const formattedPrice = isYearly() ? Math.ceil(priceInK) : priceInK;
    return (t('selectedLanguage') == "id-ID") ? `Rp.${formattedPrice.toLocaleString('id-ID')}k` : `$${formattedPrice}`;
  };

  return (
    <div>
      <section class="bg-white py-12 px-4">
        <div class="max-w-7xl h-[48rem] mx-auto flex flex-col lg:flex-row items-center gap-12">
          <div class="w-full lg:w-1/2 flex justify-center">
            <img src={automationLogo} alt="Automation Logo" class="w-[24rem] h-[24rem] object-contain" />
          </div>
          <div class="text-center lg:text-left max-w-xl">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{t('automation.title')}</h2>
            <p class="text-gray-600 mb-6 text-lg">
              {t('automation.description')}
            </p>
          </div>
        </div>
      </section>
      <section class="bg-gray-50 py-12 px-4">
        <div class="max-w-7xl mx-auto">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">{t('automation.services.title')}</h2>
          <div class="grid md:grid-cols-2 gap-8">
            <div class="bg-white p-8 rounded-lg shadow-sm">
              <h3 class="text-2xl font-semibold mb-4">{t('automation.services.process.title')}</h3>
              <p>{t('automation.services.process.description')}</p>
            </div>
            <div class="bg-white p-8 rounded-lg shadow-sm">
              <h3 class="text-2xl font-semibold mb-4">{t('automation.services.integration.title')}</h3>
              <p>{t('automation.services.integration.description')}</p>
            </div>
          </div>
        </div>
      </section>

      <section class="py-12 px-4">
        <div class="max-w-7xl mx-auto">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">{t('automation.pricingTitle')}</h2>
          <div class="flex justify-center items-center space-x-4 mb-8">
            <span>{t('enterprise.monthly')}</span>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" checked={isYearly()} onChange={() => setIsYearly(!isYearly())} class="sr-only peer" />
              <div class="w-14 h-8 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
            <span>{t('enterprise.yearly')}</span>
          </div>
          <div id="automation-pricingplan" class="relative">
            <div class="flex flex-wrap justify-center gap-8">
              <For each={productList()}>
                {(plan) => (
                  <div class="bg-white p-8 rounded-lg shadow-md text-center flex flex-col h-full w-full md:w-1/2 lg:w-1/4">
                    <h3 class="text-2xl font-bold mb-4">{plan.name}</h3>
                    <div class="h-24">
                      <p class="mb-4">{formatPrice(plan.price)}<span class="text-lg font-normal">/{t('enterprise.monthlyShort')}</span></p>
                      <Show when={plan.price.original_monthly}>
                        <p class="text-gray-500 line-through">{isYearly() ? formatPrice({monthly: plan.price.original_monthly * 9}) : formatPrice({monthly: plan.price.original_monthly}) }<span class="text-lg font-normal">/{t('enterprise.monthlyShort')}</span></p>
                      </Show>
                    </div>
                    <ul class="text-left space-y-2 mb-8 flex-grow">
                      <For each={plan.features}>
                        {(feature) => (
                          <li class="flex items-center gap-2">
                            <svg class="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 00-1.414 0L9 11.586 6.707 9.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l7-7a1 1 0 000-1.414z"/></svg>
                            {feature}
                          </li>
                        )}
                      </For>
                    </ul>
                    <a href="/about" class="bg-[#3DDC97] text-[#2C2C2C] px-6 py-3 rounded hover:bg-gray-700 transition mt-auto">
                      {t('automation.getStarted')}
                    </a>
                  </div>
                )}
              </For>
            </div>
          </div>
        </div>
      </section>

      <CTASchedule />
    </div>
  );
};

export default AutomationService;
