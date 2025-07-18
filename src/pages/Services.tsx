import Card from '../components/card/card';
import serviceLogo from '../assets/contact-us-amico.png'
import shopifyLogo from '../assets/shopify.png';
import softwareLogo from '../assets/software.png';
import configurationLogo from '../assets/configuration.png';
import speechBubbleLogo from '../assets/speech-bubble.png';

function Service() {
  return (
    <div>
      <section class="bg-white py-8 px-4">
        <div class="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-12">
          <div class="text-center lg:text-left max-w-xl">
            <div class="flex flex-col items-center justify-center h-full text-start px-4">
              <h2 class="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                Transform Your Business <br class="hidden sm:block" />
                with Smart IT Solutions
              </h2>
              <p class="text-gray-600 mb-6 text-lg">
                We help organizations leverage technology to drive growth, improve efficiency,
                and stay ahead of the competition.
              </p>
            </div>
          </div>
          <div class="w-full lg:w-1/2 flex justify-center">
            <img src={serviceLogo} alt="startup-logo" class="w-full h-full object-contain" />
          </div>
        </div>
      </section>
      <section class="w-full my-[12rem]">
        <h3 class="my-12 text-center text-5xl" > Our Services </h3>
        <p class="text-gray text-center text-xl mb-8">
          We offer comprehensive technological solution for your business to thrive and growth in digital era 
        </p>
        <div class="flex flex-wrap w-full justify-center">
          <Card imgSrc={shopifyLogo} imgAlt="shopify-icon" title="eCommerce" text="Don't let platform controls you, Be free with your own ecommerce website"></Card>
          <Card imgSrc={softwareLogo} imgAlt="software-icon" title="Enterprise Software" text="Using CRM, ERP or any other Enterprise Software to Streamline your Business Process"></Card>
          <Card imgSrc={configurationLogo} imgAlt="configuration-icon" title="Automation" text="Use tools to automate task like sending SMS to customer"></Card>
          <Card imgSrc={speechBubbleLogo} imgAlt="speech-bubble-icon" title="Custom Service" text="Any request, just contact us!"></Card>
        </div>
      </section>
      <section class="bg-gray-900 text-white py-16 text-center px-4">
        <h2 class="text-2xl md:text-3xl font-semibold mb-4">
          Ready to Transform Your Business?
        </h2>
        <p class="text-gray-300 mb-8 max-w-xl mx-auto">
          Let’s discuss how we can help you achieve your technology goals.
        </p>
        <div class="flex flex-col sm:flex-row justify-center items-center gap-4">
          <a
            href="https://wa.me/6289670377077"
            class="bg-[#3DDC97] text-[#2C2C2C] font-medium px-6 py-3 rounded hover:bg-gray-200 transition"
          >
            Schedule Consultation
          </a>
         </div>
      </section>
    </div>

  )
}

export default Service;
