"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { generateOTP } from "@eternaljs/otp-generator";

export default function Register() {
  const router = useRouter();
  const [isLogged, setIsLogged] = useState(false);
  const [generatedOTP, setGenerateOtp] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    otp: "",
  });

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const sendOtp = async () => {
    const otp = generateOTP(6);
    if (formData.email.length > 0) {
      const response = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL + "/api/sendotp",
        {
          method: "POST",
          body: JSON.stringify({ ...formData, otp }),
        }
      );
      toast.success("Send OTP to your mail");
      console.log(response);
      setGenerateOtp(otp);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    console.log(generatedOTP, " ** ", formData.otp);
    if (generatedOTP !== formData.otp) {
      toast.error("Wrong OTP");
      return;
    }

    const toastId = toast.loading("Please wait...checking");

    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL + "/api/register",
        {
          method: "POST",
          body: JSON.stringify(formData),
        }
      );

      // console.log(response);
      if (!response.ok) {
        const errorJson = await response.json();
        throw errorJson?.message;
      }

      const result = await response.json();

      localStorage.setItem(
        "shortener-user",
        JSON.stringify({ ...formData, userId: result?.userId })
      );

      const res = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (res?.error) {
        toast.error(res?.error, { id: toastId });
        console.log("Error", res?.error);
      } else {
        toast.success("Logging in now...", { id: toastId });
        setIsLogged(true);
      }
    } catch (error) {
      toast.error(error || "Something went wrong", { id: toastId });
      console.log("signIn had an error", error);
    }
  };

  useEffect(() => {
    if (isLogged) {
      setTimeout(() => {
        router.push("/dashboard");
      }, 1400);
    }
  }, [isLogged]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-base-300 gap-10 relative">
      <h1 className="text-[#5a67ff] sm:text-7xl text-4xl font-bold flex">
        Anchorshub
      </h1>
      <form onSubmit={onSubmit} noValidate={false}>
        <div className="card bg-base-200 w-80">
          <div className="card-body gap-6">
            <div className="w-full text-center text-2xl font-medium">
              Register
            </div>
            <input
              placeholder="Name"
              required
              name="name"
              type="text"
              className="input input-bordered"
              onChange={handleChange}
              value={formData.name}
            />
            <input
              placeholder="Email"
              required
              name="email"
              type="email"
              className="input input-bordered"
              onChange={handleChange}
              value={formData.email}
            />
            <button
              type="submit"
              className={`btn btn-primary  min-h-fit h-fit w-fit p-2 text-white bg-[#4a58f1] border-none ${
                formData.email ? "block" : "hidden"
              }`}
              onClick={sendOtp}
            >
              Send OTP
            </button>
            <input
              placeholder="Password"
              required
              name="password"
              type="password"
              className="input input-bordered"
              onChange={handleChange}
              value={formData.password}
            />
            <input
              placeholder="Enter 6digit OTP"
              required
              name="otp"
              type="number"
              className="input input-bordered"
              onChange={handleChange}
              value={formData.otp}
            />
            <button
              type="submit"
              className="btn btn-primary mb-3 text-white bg-[#4a58f1] border-none"
            >
              Sign Up
            </button>
            <Link href={"/login"} className="badge badge-primary">
              Already have account?
            </Link>
          </div>
        </div>
      </form>
    </main>
  );
}
