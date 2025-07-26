import { useSocket } from '../socket/SocketContext';
import React, { useState, useEffect } from 'react';
import Nav from './Nav'
import Feature from './Feature';

const Home = () => {
  const socket = useSocket()

  //Socket connection
  useEffect(() => {
    if(!socket) return
    
    socket.on("connect", () => {
      console.log("connection established")
      console.log(socket.id)
    })
  }, [socket])

  return (

    <>
      <main className="bg-[#09090B] text-white min-h-screen">
        {/* NAV */}
        <Nav />

        {/* Hero section */}
        <section className="w-full px-6 py-24">
          <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-16">
            {/* Left */}
            <div className="w-full lg:w-1/2 text-center lg:text-left flex flex-col gap-6">
              <div className="flex flex-col justify-center items-center lg:items-start">
                <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold leading-tight">
                  Build and Ship
                </h1>
                <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold leading-tight">
                  10x faster with NS
                </h1>
              </div>

              <p className="text-gray-400 text-base sm:text-lg max-w-md mx-auto lg:mx-0 ">
                TailwindCSS highly customizable components for building modern websites and applications that look and feel the way you mean it.
              </p>

              {/*Buttons */}
              <div className="flex gap-4 justify-center lg:justify-start">
                <button className='btn2 w-[120px] h-[40px] rounded-3xl border-none'>Get started</button>
                <button className='btn1 h-[40px] rounded-3xl'>Demo</button>
              </div>
            </div>

            {/* Right*/}
            <div className="w-full lg:w-1/2">
              <img
                src="https://images.unsplash.com/photo-1549924231-f129b911e442?auto=format&fit=crop&w=800&q=80"
                alt="Dashboard Preview"
                className="rounded-xl shadow-lg mx-auto max-w-full h-auto"
              />
            </div>
          </div>
        </section>
      </main>

      <Feature />
    </>
  );
};



export default Home;
