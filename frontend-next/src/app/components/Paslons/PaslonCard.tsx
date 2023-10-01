import Image from "next/image"
import { SeketonCard } from "../Loading/PaslonSkeleton"
import {motion} from "framer-motion"

const PaslonCard = (props: any) => {
  return (
    <>
      {props.loading && (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
          {Array.from({ length: 3 }).map((_, index) => (
            <SeketonCard key={index}></SeketonCard>
          ))}
        </div>
      )}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'
      >
        {props.paslon &&
          props.paslon.map((paslon: any, index: number) => (
            <div key={paslon.id} className='bg-white shadow-xl   rounded-lg overflow-hidden '>
              {paslon.image && (
                <div className='relative'>
                  <Image
                    src={paslon.image}
                    alt={paslon.name}
                    width={10000}
                    height={10000}
                    quality={100}
                    className='w-[100%] h-[200px] object-cover'
                  />
                  <div className=' absolute bottom-4 left-4 bg-white w-14 h-14 flex justify-center items-center  text-3xl rounded-full font-bold text-red-600'>
                    {index + 1}
                  </div>
                </div>
              )}
              <div className='px-3 py-4 h-[150px] flex flex-col justify-between'>
                <div>
                  <h1 className='text-lg font-bold line-clamp-1 break-words'>{paslon.name}</h1>
                  <p className='text-sm line-clamp-1 break-words'>{paslon.visi}</p>
                </div>
                <ul className='list-disc ml-4 mt-3 font-medium'>
                  {paslon.parties &&
                    paslon.parties.map((party: any) => (
                      <li key={party.id} className='text-sm  '>
                        {party.name}
                      </li>
                    ))}
                </ul>
                {!paslon.parties.length && (
                  <p className='text-sm text-red-600'>Belum ada partai pengusung !!</p>
                )}
              </div>
            </div>
          ))}
      </motion.div>
    </>
  )
}

export default PaslonCard