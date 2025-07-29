import React, { useEffect } from 'react'
import { useParams } from 'react-router'
import axios from 'axios'

const Profile = () => {
  const { username } = useParams()

  //Getting user data from backend
  useEffect(() => {
    const fetchUserData = async () => {
      const res = await axios(`http://localhost:1111/profile/${username}`)
      console.log(res.data)
    }

    fetchUserData()

  })

  return (
    <div>{username}</div>
  )
}

export default Profile