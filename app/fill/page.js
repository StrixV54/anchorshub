"use client";

import {
  fieldSectionData,
  keyCoinMap,
  singleDetailObject,
} from "@/lib/formConstants";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Fill() {
  const [coins, setCoins] = useState(0);
  const [formData, setFormData] = useState(singleDetailObject);
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (coins > 0) toast("New Total Coin : " + coins);
  }, [coins]);

  useEffect(() => {
    if (typeof localStorage !== "undefined") {
      const userRecord = localStorage.getItem("shortener-user");
      if (!userRecord) {
        router.push("/login");
        return;
      }
      const parsedRecord = JSON.parse(userRecord);
      setUser(parsedRecord);
    }
  }, []);

  const findTotalCoins = () => {
    let total = 0;
    Object.keys(formData).forEach((key) => {
      if (formData[key] && keyCoinMap.has(key)) total += keyCoinMap.get(key);
    });
    return total;
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    if (value.length > 0) setCoins(findTotalCoins());
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = async () => {
    try {
      await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/api/coin", {
        method: "POST",
        body: JSON.stringify({ coins: coins, email: user?.email }),
      });
    } catch (error) {
      console.log(error);
    }
    toast.success("Successfully added details.");
    setTimeout(() => router.push("/dashboard"), 800);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-start lg:p-24 sm:p-10 p-4 bg-base-300 gap-10 relative">
      <div className="flex justify-between w-full">
        <h1 className="text-2xl font-bold">Anchorshub</h1>
        <div className="btn bg-slate-700">
          Coins:
          <div className="badge badge-primary">{coins}</div>
        </div>
      </div>
      <div>Fill the below fields to start looking for jobs :</div>
      <form className="flex flex-col gap-6" onSubmit={onSubmit}>
        <div className="flex flex-col gap-8">
          {Object.keys(fieldSectionData).map((key, idx) => (
            <div key={idx}>
              <div className="uppercase mb-2">{key}</div>
              <div className="flex flex-row flex-wrap gap-4">
                {fieldSectionData[key].map((item, idx) => (
                  <input
                    key={idx}
                    required
                    placeholder={item.name}
                    name={item.id}
                    type="text"
                    className="input input-bordered"
                    onChange={handleChange}
                    value={formData[item.id]}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
        <button
          type="submit"
          className="btn btn-primary my-6 text-white bg-[#4a58f1] border-none max-w-[400px]"
        >
          Save Info
        </button>
      </form>
    </main>
  );
}
