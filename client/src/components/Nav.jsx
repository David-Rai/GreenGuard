import logo from '../../public/logo/gg.svg'
import React from 'react'
import { useNavigate } from 'react-router'

const Nav = () => {
  const navigate = useNavigate()

  return (
    <>

      {/* Navigation */}
      < nav className="w-full px-6 py-4 border-b  border-[#a3aca8] " >
        <div className="max-w-7xl mx-auto flex justify-between items-center h-[40px]">
          <div className='flex items-center justify-between gap-[100px]'>
            {/* Logo */}
            <div className="h-full w-auto flex items-center justify-center shrink-0">
              <img
                src={logo}
                alt="Logo"
                className="h-[100px] w-auto object-contain"
              />
            </div>



            {/* Navigation Links */}
            <ul className="hidden md:flex gap-6 text-[#807f7f] text-sm font-light cursor-pointer">
              <li>
                Features
              </li>
              <li>
                Map
              </li>
              <li>
                About
              </li>
            </ul>


          </div>

          {/* Auth Buttons */}
          <div className="flex gap-4">
            <button className='btn1' onClick={() => navigate('/signin')}>Login</button>
            <button className='btn2' onClick={() => navigate('/signup')}>Signup</button>
          </div>
        </div>
      </ nav>
    </>

  )
}

export default Nav