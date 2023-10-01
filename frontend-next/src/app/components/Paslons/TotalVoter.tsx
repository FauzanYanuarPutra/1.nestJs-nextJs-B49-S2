const TotalVoter = (props: any) => {
  return (
    <>
      <div className='md:w-2/5 p-4 rounded-lg bg-white shadow-xl flex flex-col justify-center gap-2'>
        <h1 className="mb-2 text-lg font-bold">Suara Saat Ini : </h1>
          {props.loading &&
            Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className='flex w-full h-5 animate-pulse bg-[#8b8b8ba1]'></div>
            ))}
          {props.paslon.map((p: any, index: number) => (
            <div key={p.id} className='flex items-center gap-3'>
              {index + 1}.<p>{p.name}</p>
              <div className='bg-gray-300 text-sm px-4 py-[2px] font-medium rounded-lg flex justify-center items-center'>
                {p.voters.length || 0}
              </div>
            </div>
          ))}
        </div>
    </>
  )
}

export default TotalVoter

