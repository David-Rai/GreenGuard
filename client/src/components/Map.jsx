import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { useNavigate } from 'react-router'
import { useSocket } from '../socket/SocketContext'
import React from 'react'
import { useEffect, useState, useRef } from 'react'

const Map = () => {
    const navigate = useNavigate()

    const socket = useSocket()

    //Socket connection
    useEffect(() => {
        if (!socket) return

        socket.on("connect", () => {
            console.log("connection established")
            console.log(socket.id)
        })
    }, [socket])


    //Getting lan and lng
    const getCoordinates = () => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                console.log('User location:', latitude, longitude);
            },
            (error) => {
                console.error('Error getting location:', error);
            }
        )
    }

    //Handle report
    const handleReport = () => {
        navigate('/report')

    }

    return (
        <main className='main flex'>

            {/* SIDE BAR */}
            <div className='w-[20%] bg-red-400 h-full flex flex-col items-center gap-5 py-5'>
                <h1 className='text-2xl'>LOGO</h1>
                <div className="options bg-amber-300 w-full h-[80%]">

                </div>

                <button className='btn1 border-none' onClick={handleReport}>REPORT</button>
            </div>

            {/* LEAFLET MAP */}
            <MapContainer center={[27.7172, 85.3240]} zoom={13} style={{ height: '100vh', width: '80%' }}>
                <TileLayer
                    url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                    attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                />

                <Marker position={[27.7172, 85.3240]}>
                    <Popup >
                        Welcome to Kathmandu! 🌏
                    </Popup>
                </Marker>
            </MapContainer>
        </main>
    )
}

export default Map