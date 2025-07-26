import React from 'react'

const Nav = () => {
  return (
    <>

      {/* Navigation */}
      < nav className="w-full px-6 py-4 border-b border-[#113326] " >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className='flex items-center justify-between gap-[100px]'>
            {/* Logo */}
            <div className="text-2xl font-extrabold">LOGO</div>

            {/* Navigation Links */}
            <ul className="hidden md:flex gap-6 text-[#807f7f] text-sm font-light cursor-pointer">
              <li>
                Features
              </li>
              <li>
                Pricing
              </li>
              <li>
                About
              </li>
            </ul>


          </div>

          {/* Auth Buttons */}
          <div className="flex gap-4">
            <button className='btn1'>Login</button>
            <button className='btn2'>Signup</button>
          </div>
        </div>
      </ nav>
    </>

  )
}

export default Nav