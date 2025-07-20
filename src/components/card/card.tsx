const Card = (props: any) => {
  return (
    <div 
      class={`rounded-xl border border-gray-200 p-8 shadow-sm bg-white m-2 transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-105 ${props.className || 'w-sm'}`}
    >
      <div class="mb-6 flex items-center justify-center h-24 w-24 rounded-full bg-gray-100">
        <img 
          src={props.imgSrc} 
          alt={props.imgAlt} 
          class="w-16 h-16 object-contain"
        /> 
      </div>
      <h5 class="mb-3 text-2xl font-bold text-gray-900">{props.title}</h5>
      <p class="text-gray-700 text-base">{props.text}</p>
    </div>
  )
}

export default Card
