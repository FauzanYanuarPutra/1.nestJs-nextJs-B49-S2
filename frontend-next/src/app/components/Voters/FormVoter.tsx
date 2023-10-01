export const FormVoter = (props: any) => {
  const submitVoter = (e: any) => {
    e.preventDefault();
    props.onSubmit(e);
  };

  const handleRadioChange = (e: any) => {
    props.setVoter({ ...props.voter, paslon_id: parseInt(e.target.value) });
  };

  return (
    <>
      <h1 className='font-bold'>Masukkan Pilihan Suaramu</h1>
      <input
        type='text'
        className="w-full p-3 rounded-lg placeholder:text-gray-400"
        placeholder="Masukkan nama anda"
        name='paslon'
        value={props.voter.name}
        onChange={(e) => props.setVoter({ ...props.voter, name: e.target.value })}
      />
      <p className='text-sm text-red-600'>
        Pilih sesuai hati dan pikiranmu, jangan pernah dianggap serius.
      </p>
      <form className='flex flex-col gap-3' onSubmit={submitVoter}>
        <div className='flex flex-wrap gap-10'>
          {props.loading && <div className='flex w-full h-10 animate-pulse bg-[#8b8b8ba1]'></div>}
          {props.paslon &&
            props.paslon.map((p: any, index: number) => (
              <div key={p.id} className=''>
                <label className='flex flex-col gap-1'>
                  <p className='text-sm font-medium'>Paslon No.{index + 1}</p>
                  <input
                    type='radio'
                    id={p.id}
                    value={p.id} 
                    name='paslon'
                    checked={parseInt(p.id) === props.voter.paslon_id} 
                    onChange={handleRadioChange} 
                  />
                </label>
              </div>
            ))}
        </div>
        <button
          type='submit'
          className={` text-white px-4 py-2 rounded-lg ${
            props.voter.name && props.voter.paslon_id ? 'cursor-pointer bg-red-600' : 'cursor-not-allowed bg-gray-500'
          } `}
        >
          Submit
        </button>
      </form>
    </>
  );
};
