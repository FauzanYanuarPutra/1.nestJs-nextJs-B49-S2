"use client"
import axios from 'axios';
import { useEffect, useState } from 'react';
import TotalVoter from './components/Paslons/TotalVoter';
import { FormVoter } from './components/Voters/FormVoter';
import PaslonCard from './components/Paslons/PaslonCard';

interface IParty {
  id: number;
  name: string;
}
interface IPaslon {
  id: number;
  name: string;
  image: string;
  visi: string;
  parties: IParty[];
}
interface IVoter {
  name: string;
  paslon_id: number;
}

export default function Home() {
  const [paslon, setPaslon] = useState<IPaslon[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [voter, setVoter] = useState<IVoter>({
    name: '',
    paslon_id: 0,
  });

  const DataPaslon = () => {
    axios
      .get('http://localhost:7000/paslons')
      .then((res) => {
        setPaslon(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  useEffect(() => {
    DataPaslon();
  }, []);

  const submitVoter = (e: any) => {
    e.preventDefault();
    axios
      .post('http://localhost:7000/voters', voter)
      .then((res) => {
        DataPaslon();
        setVoter({ name: '', paslon_id: 0 });
        setMessage(`Anda berhasil memilih no ${voter.paslon_id}`);
        setTimeout(() => {
          setMessage('');
        }, 2500);
      })
      .catch((error) => {
        DataPaslon();
        console.error('Error:', error);
      });
  };

  return (
    <>
      {message && (
        <div className='fixed rounded-lg top-5 right-5 px-5 py-2  bg-green-500 z-20 text-white font-bold'>
          {message}
        </div>
      )}
      <div className='max-w-[1000px] w-[90%] mx-auto my-10 gap-4'>
        <div>
          <PaslonCard loading={loading} paslon={paslon} />
          <div className='mt-10 flex flex-col md:flex-row justify-between gap-6 md:gap-4 '>
            <TotalVoter loading={loading} paslon={paslon} />
            <div className='md:w-3/5 p-4 rounded-lg bg-white shadow-xl flex flex-col gap-2'>
              <FormVoter voter={voter} onSubmit={submitVoter} paslon={paslon} loading={loading} setVoter={setVoter} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}



