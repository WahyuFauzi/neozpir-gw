import Card from '../components/card/card';
import neozpirLogo from '../assets/working-remotely-amico.png';
import diagramLogo from '../assets/diagram.png';
import focusLogo from '../assets/focus.png';

function Home() {
  return(
    <div>
    <section class="bg-white py-8 px-4">
      <div class="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-12">
        <div class="text-center lg:text-left max-w-xl">
          <div class="flex flex-col items-center justify-center h-full text-start px-4">
            <h2 class="text-2xl md:text-3xl font-bold text-gray-800 mb-4">About Neozpir</h2>
            <p class="text-gray-600 mb-6 text-lg">
              Transforming businesses through innovative IT consulting solutions. 
              We bridge the gap between technology and business success.
            </p>
          </div>
        </div>
        <div class="w-full lg:w-1/2 flex justify-center">
          <img src={neozpirLogo} alt="startup-logo" class="w-full h-full object-contain" />
        </div>
      </div>
    </section>
      <section>
        <h3 class="my-12 text-center text-5xl"> What we want to do? </h3>
        <div class="flex flex-wrap my-16 w-full justify-center ">
          <Card imgSrc={diagramLogo} imgAlt="growth-icon" title="Accelerate Growth" text="We believe that your success is also our success" className="w-2xl h-[16rem]"></Card>
          <Card imgSrc={focusLogo} imgAlt="focus-icon" title="Focus on Whats Matter" text="Dont let any technological problems slow you down, Focus on solving your business problem first" className="w-2xl h-[16rem]"></Card>
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
export default Home;
