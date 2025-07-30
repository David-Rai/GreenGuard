import { useSocket } from '../socket/SocketContext';
import React, { useState, useEffect } from 'react';
import Nav from './Nav'
import { ToastContainer } from 'react-toastify';
import About from './About';
import Footer from './Footer'
import Feature from './Feature';
import { useNavigate } from 'react-router';

const Home = () => {
  const socket = useSocket()
  const navigate = useNavigate()

  //Socket connection
  useEffect(() => {
    if (!socket) return

    socket.on("connect", () => {
      console.log("connection established")
      console.log(socket.id)
    })
  }, [socket])

  return (

    <>
      <main className="bg-[#F9FAF8] min-h-screen">
        {/* NAV */}
        <Nav />

        {/* Hero section */}
        <section className="w-full px-6 py-24 flex flex-col items-center gap-4">
          {/* Left */}
          <div className="flex flex-col justify-center items-center text-(--dark-green)">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold leading-tight">
              Empowering Citizens for
            </h1>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold leading-tight">
              a Cleaner Tomorrow
            </h1>
          </div>

          <p className="text-[#1E293B] text-base sm:text-lg md:w-[50%]">
            A real-time platform to report, share, and take action on environmental issues — from waste mismanagement to natural disasters — because protecting the planet starts with us.
          </p>

          {/*Buttons */}
          <div className="flex gap-4 justify-center lg:justify-start ">
            <button className='btn2 w-[120px] h-[40px] rounded-3xl' onClick={() => navigate("/map")}>Get started</button>
            <button className='btn1 h-[40px] rounded-3xl'>Demo</button>
          </div>
        </section>
      </main>

      <Feature />
      <About />
      <Footer />
      <ToastContainer />
    </>
  );
};



export default Home;
