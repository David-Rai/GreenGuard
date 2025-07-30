import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import Sidebar from './Sidebar'
// import { verify } from '../utils/verify'
import { useUser } from '../socket/UserContext'
import 'leaflet/dist/leaflet.css'
import { useNavigate } from 'react-router'
import { useSocket } from '../socket/SocketContext'
import React from 'react'
import { useEffect, useState, useRef } from 'react'

const Map = () => {
    const navigate = useNavigate()
    const socket = useSocket()
    const [reports, setReports] = useState([])
    const user=useUser()

    //Socket connection
    useEffect(() => {

        getReports()

        if (!socket) return

        socket.on("connect", () => {
            console.log("connection established")
            // console.log(socket.id)
        })
    }, [socket])

    // //Checking the user validation
    // useEffect(() => {
    //    const verrification=async ()=>{
    //     const data = await verify()
    //     console.log("This user data",data.user)
    //     setUser(data.user)
    //    }
    //    verrification()
    // }, [])


    //Getting all the Report details
    const getReports = async () => {
        const res = await fetch('http://localhost:1111/report')
        const data = await res.json()
        console.log("Reports got", data)
        setReports(data)

    }

    //Handle report
    const handleReport = () => {
        navigate('/report')

    }

    //Handling the report deatils
    const handleReportDetails = (report) => {
        // console.log(report)
        navigate('/report-details', { state: { report } });
    }

    return (
        <main className='main flex flex-row'>

            {/* SIDE BAR */}
            <Sidebar handleReport={handleReport} user={user} />


            {/* LEAFLET MAP */}
            <MapContainer center={[27.7172, 85.3240]} zoom={7} className='w-full md:w-[80%]  md:h-screen h-[calc(100%-60px)]'>
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
                            <button onClick={() => handleReportDetails(report)} className='btn1'>View deatails</button>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </main>
    )
}

export default Map