"use client";
import SignOut from "@/components/SignOut";
import { useEffect, useState } from "react";
import Loading from "@/components/Loading";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "/";

const fetchAllJobsAPI = async () => {
  const data = await fetch(`${BASE_URL}/api/getjobs`, {
    cache: "no-cache",
  });
  const res = await data.json();
  return res;
};

const fetchAppliedJobsAPI = async (userId) => {
  const data = await fetch(`${BASE_URL}/api/applied/${userId}`, {
    cache: "no-cache",
  });
  const res = await data.json();
  return res;
};

export default function Home() {
  const [list, setList] = useState(null);
  const [applied, setApplied] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (typeof localStorage !== "undefined") {
      const userRecord = localStorage.getItem("shortener-user");
      if (!userRecord) {
        router.push("/login");
        return;
      }
      const parsedRecord = JSON.parse(userRecord);
      setUser(parsedRecord);
      fetchAllJobsAPI()
        .then((res) => {
          setList(res?.list);
          fetchAppliedJobsAPI(parsedRecord?.userId)
            .then((res) => setApplied(res?.list))
            .catch((err) => console.log("Error ", err));
        })
        .catch((err) => console.log("Error ", err))
        .finally(() => setLoading(false));
    }
  }, []);

  if (loading) return <Loading isFullScreen={true} />;

  const fetchNewJob = async () => {
    const data = await fetch(`${BASE_URL}/api/fetchjobs`);
    setTimeout(() => window.location.reload(), 1000);
  };

  const applyJob = async (job) => {
    const data = await fetch(`${BASE_URL}/api/savejob`, {
      method: "POST",
      body: JSON.stringify({
        id: job.id,
        userId: user?.userId,
        email: user?.email,
        jobdetails: job,
      }),
    });
    const res = await data.json();
    if (!data.ok) {
      toast.error(res?.message);
      return;
    }
    toast.success("Applied Successfully");
    setTimeout(() => window.location.reload(), 1000);
  };


  return (
    <>
      <header className="absolute w-full z-10 flex justify-end sm:px-24 px-10 py-10">
        <div className="text-right flex items-center gap-3 sm:text-xl text-md">
          Hi, {user?.name}
          <SignOut />
        </div>
      </header>
      <main className="flex min-h-screen flex-col lg:p-24 sm:p-10 p-4 bg-base-300 gap-10 relative">
        <div className="text-2xl mt-[100px]">Applied Jobs</div>
        <div className="flex flex-wrap gap-6">
          {applied?.map((item, idx) => (
            <div
              key={idx}
              className="card h-[160px] w-[400px] bg-slate-800 p-4 flex flex-col justify-between"
            >
              <div>{item?.companyName}</div>
              <div>{item?.salary}</div>
              <div>{item?.title}</div>
            </div>
          ))}
        </div>
        <div className="text-2xl mt-[100px]">
          All Jobs
          <button className="btn btn-secondary ml-2" onClick={fetchNewJob}>
            Fetch New Jobs
          </button>
        </div>
        <div className="flex flex-wrap gap-6">
          {list?.map((item, idx) => (
            <div
              key={idx}
              className="card h-[200px] w-[400px] bg-slate-800 p-4 flex flex-col justify-between"
            >
              <div>{item?.companyName}</div>
              <div>{item?.salary}</div>
              <div>{item?.title}</div>
              <button
                className="btn btn-primary"
                onClick={() => applyJob(item)}
              >
                Apply
              </button>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
