import { Show } from 'solid-js';
import { useNavigate } from '@solidjs/router';

const Card = (props: any) => {
  const navigate = useNavigate();
  return (
    <div class="block">
      <div
        class={`rounded-xl border border-gray-200 p-8 shadow-sm bg-white m-2 transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-105 ${props.className || 'w-sm'} h-full flex flex-col`}
      >
        <div class="mb-6 flex items-center justify-center h-24 w-24 rounded-full bg-gray-100 mx-auto">
          <img src={props.imgSrc} alt={props.imgAlt} class="w-16 h-16 object-contain" />
        </div>
        <h5 class="mb-3 text-2xl font-bold text-gray-900">{props.title}</h5>
        <p class="text-gray-700 text-base flex-grow">{props.text}</p>
        <Show when={props.cardCTA != undefined}>
          <div class="w-fit flex flex-col sm:flex-row justify-center lg:justify-center gap-4 mx-auto">
            <button
              class="w-full h-full bg-[#3DDC97] text-[#2C2C2C] px-6 py-3 rounded hover:bg-gray-700 transition cursor-pointer"
              onClick={() => {
                navigate(props.href);
              }}
            >
              {props.cardCTA}
            </button>
          </div>
        </Show>
      </div>
    </div>
  );
};

export default Card;
