"use client"
import axios from 'axios'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { IconLoader2 } from '@tabler/icons-react';
import { motion } from 'framer-motion'
import Link from 'next/link';

export default function Home() {
  const [paslon, setPaslon] = useState([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    axios.get('http://localhost:7000/paslons').then(res => {
      setPaslon(res.data)
      setLoading(false)
    })
  }, [])

  return (
    <>
      <div className='max-w-[1000px] w-[90%] mx-auto my-10 gap-4'>
        <div>
          {loading && (
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
              {Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className='bg-white shadow-xl rounded-lg overflow-hidden'>
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
                ))}
              </div>
            )}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{  opacity: 1 }}
              transition={{ duration: 1 }}
              className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'
            >
              {paslon && paslon.map((paslon: any) => (
                <div key={paslon.id} className='bg-white shadow-xl   rounded-lg overflow-hidden '>
                  <Image
                      src={paslon.image} 
                      alt={paslon.name}
                      width={10000} 
                      height={10000}
                      quality={100}
                      className='w-[100%] h-[200px] object-cover'
                  />
                  <div className='px-3 py-4 h-[150px] flex flex-col justify-between'>
                    <div>
                      <h1 className='text-lg font-bold'>{paslon.name}</h1>
                      <p className='text-sm '>{paslon.visi}</p>
                    </div>
                    <ul className='list-disc ml-4 mt-3 font-medium'>
                      {paslon.parties && paslon.parties.map((party: any) => (
                        <li key={party.id} className='text-sm  '>{party.name}</li>
                      ))}
               
                    </ul>
                    {!paslon.parties.length && (
                        <p className='text-sm text-red-600'>Belum ada partai pengusung !!</p>
                      )}
                  </div>
                </div>
              ))}
            </motion.div>
        </div>
      </div>
    </>
  )
}
