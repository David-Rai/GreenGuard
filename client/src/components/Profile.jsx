import React, { useEffect, useState } from 'react';
import { useParams, Outlet, NavLink } from 'react-router';
import axios from 'axios';

const Profile = () => {
  const { username } = useParams();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const res = await axios(`http://localhost:1111/profile/${username}`);
      // console.log(res.data);
      setUserData(res.data);
    };

    fetchUserData();
  }, [username]);

  return (
    <main className="p-4 md:p-6 space-y-6" style={{ backgroundColor: '#F9FAF8' }}>
    {/* User Info and Banner Section */}
    <div
      className="rounded-xl flex flex-col md:flex-row items-start justify-between gap-6 p-6 md:p-8 shadow-md border"
      style={{ borderColor: '#E5E7EB', backgroundColor: '#ffffff' }}
    >
      {/* Left Side: Profile Image + User Info */}
      <div className="flex flex-col items-center md:items-start gap-4 w-full md:w-[30%]">
        {/* Profile Image */}
        <div
          className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4"
          style={{ backgroundColor: '#ffffff', borderColor: '#2ecc71' }}
        >
          <img
            src="https://thispersondoesnotexist.com"
            alt="User Avatar"
            className="w-full h-full object-cover"
          />
        </div>
  
        {/* User Info Text */}
        <div className="text-center md:text-left space-y-1" style={{ color: '#1E293B' }}>
          <h2 className="text-xl md:text-lg font-bold">{username}</h2>
          <p className="text-sm">Bio: [Add user bio here]</p>
          <p className="text-sm">{userData?.result?.[0]?.email}</p>
        </div>
      </div>
  
      {/* Right Side: Banner Section */}
      <div className="relative w-full md:w-[70%] aspect-[3/1] rounded-lg overflow-hidden shadow-md">
        <img
          src="https://img.pikbest.com/backgrounds/20200522/world-environment-day-banner-background_1910636.jpg!sw800"
          alt="Banner"
          className="w-full h-full object-cover"
        />
        <button
          className="absolute bottom-4 right-4 px-4 py-2 rounded-md font-semibold shadow"
          style={{
            backgroundColor: '#ffffff',
            color: '#38BDF8',
          }}
        >
          Add Banner
        </button>
      </div>
    </div>
  
    {/* Tabs & Nested Content */}
    <div
      className="rounded-xl shadow-md p-4 md:p-6 space-y-4 border"
      style={{ backgroundColor: '#ffffff', borderColor: '#E5E7EB' }}
    >
      <nav className="flex gap-4 justify-center md:justify-start border-b pb-2" style={{ borderColor: '#E5E7EB' }}>
        <NavLink
          to="user_reports"
          className={({ isActive }) =>
            `px-3 py-1 rounded-md font-medium ${
              isActive
                ? 'text-white'
                : 'hover:bg-[#A3E635] hover:text-[#1E293B]'
            }`
          }
          style={({ isActive }) => ({
            backgroundColor: isActive ? '#2ecc71' : '',
            color: isActive ? '#ffffff' : '#1E293B',
          })}
        >
          Reports
        </NavLink>
        <NavLink
          to="saved_reports"
          className={({ isActive }) =>
            `px-3 py-1 rounded-md font-medium ${
              isActive
                ? 'text-white'
                : 'hover:bg-[#A3E635] hover:text-[#1E293B]'
            }`
          }
          style={({ isActive }) => ({
            backgroundColor: isActive ? '#2ecc71' : '',
            color: isActive ? '#ffffff' : '#1E293B',
          })}
        >
          Saved
        </NavLink>
      </nav>
  
      {/* Outlet for nested routes */}
      <div className="mt-4" style={{ color: '#1E293B' }}>
        <Outlet />
      </div>
    </div>
  </main>
  
  );
};

export default Profile;
