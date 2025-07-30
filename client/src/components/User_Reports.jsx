import React, { useEffect, useState } from 'react'
import { FaRegThumbsUp, FaRegCommentDots, FaShare } from "react-icons/fa";
import { useUser } from '../socket/UserContext'
import axios from 'axios'

const User_Reports = () => {
  const [reports, setReports] = useState([])
  const user = useUser()
  console.log(user)

  useEffect(() => {
    const getReports = async () => {
      if (!user?.username) return; // Wait until user is available
  
      try {
        const res = await axios.post("http://localhost:1111/reports", {
          username: user.username
        });
  
        console.log("reports", res.data);
        setReports(res.data);
      } catch (err) {
        console.error("Error fetching reports", err);
      }
    };
  
    getReports();
  }, [user]); // Depend on user so it re-runs when user is ready
  

  return (
    <main className="flex flex-col items-center p-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">User Reports</h1>

      <section className="w-full max-w-2xl flex flex-col gap-6">
        {reports.length > 0 ? (
          reports.map((r, i) => (
            <div
              key={i}
              className="bg-white shadow-md rounded-xl p-4 border border-gray-300"
            >
              {/* Header */}
              <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                <p className="font-semibold text-black">{r.user_id}</p>
                <p className='hidden md:flex'>{new Date(r.created_at).toLocaleString()}</p>
              </div>

              {/* Content */}
              <div className="mb-3">
                <h2 className="text-lg font-bold text-gray-800">{r.purpose}</h2>
                <p className="text-gray-700 mt-1">{r.description}</p>
              </div>

              {/* Image Section */}
              {/* {r.image && ( */}
              <div className="mb-3">
                <img
                  // src={r.image}
                  src='https://thispersondoesnotexist.com'
                  alt="Report Image"
                  className="w-full rounded-lg max-h-[400px] object-cover"
                />
              </div>
              {/* )} */}

              {/* Location and Contact */}
              <div className="text-sm text-gray-500 space-y-1 mb-3">
                <p><span className="font-medium">Contact:</span> {r.contact_number}</p>
                {/* <p><span className="font-medium">Location:</span> {r.lat}, {r.lng}</p> */}
              </div>

              {/* Footer - Icons */}
              <div className="flex justify-around text-gray-600 border-t pt-3">
                <button className="flex items-center gap-2 hover:text-blue-600">
                  <FaRegThumbsUp /> <span>Like</span>
                </button>
                <button className="flex items-center gap-2 hover:text-blue-600">
                  <FaRegCommentDots /> <span>Comment</span>
                </button>
                <button className="flex items-center gap-2 hover:text-blue-600">
                  <FaShare /> <span>Share</span>
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600 text-center">No reports found.</p>
        )}
      </section>
    </main>
  )
}

export default User_Reports