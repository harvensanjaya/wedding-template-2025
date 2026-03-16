/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import WeddingRingIcon from "../assets/wedding-ring.png";
import Button from "../components/Elements/Button";
import api from "../services/api";

export default function LoginPage() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/admin");
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const result = await api.post("/login", {
        identifier,
        password,
      });

      if (result.data.token) {
        localStorage.setItem("token", result.data.token);
        navigate("/admin");
      }
    } catch (error: any) {
      console.log("error : ", error.response.data.message);
      alert(error.response.data.message);
    }
  };
  return (
    <div className='h-screen flex items-center justify-center'>
      <div className='relative'>
        <div className='w-20 aspect-square rounded-b-full bg-[#d9d9d9] flex justify-center items-center absolute left-1/2 -translate-1/2 top-0 transition-all duration-300'>
          <img
            src={WeddingRingIcon}
            alt=''
            className='opacity-40 w-10 transition-all duration-300 scale-x-[-1]'
          />
        </div>
        <div className='flex flex-col items-center justify-center bg-white shadow-[0px_4px_22px_3px_rgba(0,0,0,0.1)] rounded-lg p-10 font-google-sans w-100'>
          <div className='flex flex-col justify-center items-center p-5'>
            <p className='font-italiana text-4xl'>Nico & Devi</p>
            <p className='font-italiana text-4xl'>Wedding</p>
          </div>
          <h1 className='text-xl mb-2'>Admin Login</h1>
          <div className='w-full'>
            <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
              <div className='flex flex-col'>
                <label htmlFor='username' className='text-lg'>
                  username
                </label>
                <input
                  type='text'
                  name='username'
                  id='username'
                  onChange={(e) => {
                    setIdentifier(e.target.value);
                  }}
                  className='border-black/30 border-2 p-2 '
                  placeholder='type your username'
                />
              </div>
              <div className='flex flex-col'>
                <label htmlFor='password' className='text-lg'>
                  password
                </label>
                <input
                  type='password'
                  name='password'
                  id='password'
                  onChange={(e) => setPassword(e.target.value)}
                  className='border-black/30 border-2 p-2'
                  placeholder='type your password'
                />
              </div>
              <Button
                className='w-full bg-black text-white rounded-none'
                type='submit'
              >
                Login
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
