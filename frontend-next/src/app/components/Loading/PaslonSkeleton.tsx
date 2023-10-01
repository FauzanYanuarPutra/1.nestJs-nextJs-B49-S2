export const SeketonCard = () => {
  return (
    <div className='bg-white shadow-xl rounded-lg overflow-hidden'>
      <div className='w-[100%] h-[200px] bg-[#8b8b8ba1] animate-pulse '></div>
      <div className='px-3 py-4 h-[150px] bg-gray-300 animate-pulse flex flex-col justify-between'>
        <div className='flex flex-col gap-2'>
          <h1 className='animate-pulse bg-[#8b8b8ba1] h-7 w-[80%] '></h1>
          <p className='animate-pulse bg-[#8b8b8ba1] h-4 w-[70%] '></p>
        </div>
        <div className='flex h-14 flex-col gap-1 w-[60%]'>
          <div className='bg-[#8b8b8ba1] h-1/3 w-[60%]'></div>
          <div className='bg-[#8b8b8ba1] h-1/3 w-[70%]'></div>
          <div className='bg-[#8b8b8ba1] h-1/3 w-[80%]'></div>
        </div>
      </div>
    </div>
  );
};