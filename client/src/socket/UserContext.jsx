import React from 'react'
import { createContext, useEffect, useContext, useState } from 'react'
import { verify } from '../utils/verify.js'

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null)

    //Checking the user validation
    useEffect(() => {
        const verification = async () => {
            const data = await verify()
            // console.log("This user data", data.user)
            setUser(data.user)
        }
        verification()
    }, [])

    return (
        <UserContext.Provider value={user}>
            {
                children
            }
        </UserContext.Provider>
    )
}

export const useUser=()=>{
    const user=useContext(UserContext)
    return user
}

