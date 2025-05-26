// eslint-disable-next-line react/prop-types
const Card = ({ name, description, Icon }) => {
  return (
    <div className='flex gap-x-4 rounded-xl bg-white/5 p-6 ring-1 ring-white/10 ring-inset'>
      <Icon className='h-7 w-5 flex-none text-indigo-400' aria-hidden='true' />
      <div className='text-base/7'>
        <h3 className='font-semibold text-white'>{name}</h3>
        <p className='mt-2 text-gray-300'>{description}</p>
      </div>
    </div>
  );
};

export default Card;
