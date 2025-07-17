import { JSX } from 'solid-js';
import startUpLogo from '../../assets/startup-life-amico.png';
import { A } from "@solidjs/router";

const Banner = (): JSX.Element => {
  return(
    <section class="bg-white mt-12 py-20 px-4">
      <div class="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-12">
        <div class="text-center lg:text-left max-w-xl">
          <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Transform Your Business<br />
            with Expert IT Consulting
          </h1>
          <p class="text-gray-600 mb-6">
            We help organizations leverage technology to drive growth,
            improve efficiency, and stay ahead of the competition.
          </p>
          <div class="w-fit flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
            <A
              href="/services"
              class="w-full h-full bg-[#3DDC97] text-[#2C2C2C] px-6 py-3 rounded hover:bg-gray-700 transition"
            >
              Start Your Engine
            </A>
          </div>
        </div>
        <div class="w-full lg:w-1/2 flex justify-center">
          <img src={startUpLogo} alt="startup-logo" class="w-full h-full object-contain" />
        </div>
      </div>
    </section>
  )
}

export default Banner;
