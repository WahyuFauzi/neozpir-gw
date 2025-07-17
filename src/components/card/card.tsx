import { JSX } from 'solid-js';

const Card= (props: any): JSX.Element => {
  return (
    <div 
      class={`rounded-lg border border-gray-200 p-6 shadow-sm bg-white m-1 transition hover:shadow-md ${props.className || 'w-sm'}`}
    >
      <div class="mb-4 flex items-center justify-start">
        <div class="inline-flex items-center justify-center rounded-md p-3 text-white w-20 h-20">
          <img 
            src={props.imgSrc} 
            alt={props.imgAlt} 
            class="w-full h-full object-contain"
          /> 
        </div>
      </div>
      <h5 class="mb-2 text-xl font-semibold text-gray-900">{props.title}</h5>
      <p class="text-gray-600 text-sm">{props.text}</p>
    </div>
  )
}

export default Card
