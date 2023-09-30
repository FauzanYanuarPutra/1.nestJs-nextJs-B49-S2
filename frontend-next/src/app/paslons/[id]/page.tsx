"use client"
import axios from 'axios';
import React, { useEffect, useState } from 'react';

interface Party {
  id: number;
  name: string;
}

interface PaslonData {
  name: string;
  image: string;
  visi: string;
  parties: number[];
}

const DetailProject = ({ params }: { params: { id: number } }) => {
  const [paslon, setPaslon] = useState<PaslonData>({
    name: "",
    image: "",
    visi: "",
    parties: [],
  });
  const [partys, setPartys] = useState<Party[]>([]);

  useEffect(() => {
    axios.get<PaslonData>(`http://localhost:7000/paslons/${params.id}`)
      .then((res) => {
        setPaslon(res.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    axios.get<Party[]>(`http://localhost:7000/parties`)
      .then((res) => {
        setPartys(res.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [params.id]);

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    axios.put(`http://localhost:7000/paslons/${params.id}`, paslon)
      .then((res) => {
        console.log("Data Paslon berhasil diupdate:", res.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, partyId: number) => {
    const isChecked = e.target.checked;
    let updatedParties: number[];
  
    if (isChecked) {
      updatedParties = [...paslon.parties, partyId];
    } else {
      updatedParties = paslon.parties.filter((id) => id !== partyId);
    }
  
    setPaslon({ ...paslon, parties: updatedParties });
  };
  

  return (
    <>
      <div className="flex justify-center my-12">
        <div className="w-[90%] max-w-[800px] ">
          <div className="mb-5 text-lg font-bold">Paslon Form</div>
          <form onSubmit={onFormSubmit} className="flex flex-col gap-3">
            <div className="flex flex-col">
              <label htmlFor="name" className="mb-1">Name</label>
              <input type="text" id="name" value={paslon.name} onChange={(e) => setPaslon({ ...paslon, name: e.target.value })} />
            </div>
            <div className="flex flex-col">
              <label htmlFor="image" className="mb-1">Image</label>
              <input type="text" id="image" value={paslon.image} onChange={(e) => setPaslon({ ...paslon, image: e.target.value })} />
            </div>
            <div className="flex flex-col">
              <label htmlFor="visi" className="mb-1">Visi</label>
              <input type="text" id="visi" value={paslon.visi} onChange={(e) => setPaslon({ ...paslon, visi: e.target.value })} />
            </div>
            <div className="flex gap-4 my-4">
              {partys &&
                partys.map((party) => (
                  <div key={party.id}>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        value={party.id}
                        checked={paslon.parties.includes(party.id)}
                        onChange={(e) => handleCheckboxChange(e, party.id)}
                      />
                      {party.name}
                    </label>
                  </div>
                ))}
            </div>
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Update</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default DetailProject;
