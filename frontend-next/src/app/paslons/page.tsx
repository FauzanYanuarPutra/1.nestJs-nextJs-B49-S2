"use client"
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Blob, File } from "buffer";

interface Party {
  id: number;
  name: string;
}

interface PaslonData {
  name: string;
  image: any | null;
  visi: string;
  parties: number[];
}

export default function Paslon() {
  const [partys, setPartys] = useState<Party[]>([]);
  const [paslon, setPaslon] = useState<PaslonData>({
    name: "",
    image: null,
    visi: "",
    parties: [],
  });

  const onForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(paslon);
    await axios.post("http://localhost:7000/paslons", paslon, {
      headers: {
        "Content-Type": "multipart/form-data",
      }
    });
  };

  useEffect(() => {
    axios.get<Party[]>("http://localhost:7000/parties").then((res) => {
      setPartys(res.data);
    });
  }, []);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, partyId: number) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      setPaslon({ ...paslon, parties: [...paslon.parties, Number(partyId)] });
    } else {
      setPaslon({ ...paslon, parties: paslon.parties.filter((id) => id !== Number(partyId)) });
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPaslon({ ...paslon, image: file });
    }
  };
  

  return (
    <>
      <div className="flex justify-center my-12">
        <div className="w-[90%] max-w-[800px] ">
          <div className="mb-5 text-lg font-bold">Paslon Form</div>
          <form onSubmit={(e) => onForm(e)} className="flex flex-col gap-3">
            <div className="flex flex-col">
              <label htmlFor="name" className="mb-1">Name</label>
              <input type="text" id="name" onChange={(e) => setPaslon({ ...paslon, name: e.target.value })} />
            </div>
            <div  className="flex flex-col">
              <label htmlFor="visi" className="mb-1">Visi</label>
              <input type="text" id="visi" onChange={(e) => setPaslon({ ...paslon, visi: e.target.value })} />
            </div>
            <div className="flex flex-col">
              <label htmlFor="image" className="mb-1">Image</label>
              <input type="file" id="image" onChange={handleImageChange} />
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
                        onChange={(e) => handleCheckboxChange(e, Number(party.id))}
                      />
                      {party.name}
                    </label>
                  </div>
                ))}
            </div>
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
}

