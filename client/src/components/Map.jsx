import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import Sidebar from './Sidebar'
import 'leaflet/dist/leaflet.css'
import { useNavigate } from 'react-router'
import { useSocket } from '../socket/SocketContext'
import React from 'react'
import { useEffect, useState, useRef } from 'react'

const Map = () => {
    const navigate = useNavigate()
    const socket = useSocket()
    const [reports, setReports] = useState([])


    //Socket connection
    useEffect(() => {
        if (!socket) return

        socket.on("connect", () => {
            console.log("connection established")
            console.log(socket.id)
            getReports()
        })

        //Receiving all the data
        socket.on("all-reports", (data) => {
            console.log("All the reports", data)
            setReports(data)
        })

    }, [socket])

    //Getting all the Report details
    const getReports = async () => {
        socket.emit("get-reports")
    }

    //Handle report
    const handleReport = () => {
        navigate('/report')

    }

    return (
        <main className='main flex'>

            {/* SIDE BAR */}
            <Sidebar handleReport={handleReport}/>


            {/* LEAFLET MAP */}
            <MapContainer center={[27.7172, 85.3240]} zoom={13} className='h-screen w-full md:w-[80%]'>
                <TileLayer
                    url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                    attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                />

                <Marker position={[27.7172, 85.3240]}>
                    <Popup >
                        Welcome to Kathmandu! 🌏
                    </Popup>
                </Marker>

                {reports.map((report) => (
                    <Marker
                        key={report.id}
                        position={[parseFloat(report.lat), parseFloat(report.lng)]}
                    >
                        <Popup>
                            <strong>{report.purpose}</strong><br />
                            {report.description}<br />
                            📞 {report.contact_number}<br />
                            🕒 {new Date(report.created_at).toLocaleString()}
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </main>
    )
}

export default Map