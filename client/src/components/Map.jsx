import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import Sidebar from './Sidebar'
import { verify } from '../utils/verify'
import { useUser } from '../socket/UserContext'
import 'leaflet/dist/leaflet.css'
import { useNavigate } from 'react-router'
import axios from 'axios'
import { useSocket } from '../socket/SocketContext'
import React from 'react'
import { useEffect, useState, useRef } from 'react'


const Map = () => {
    const navigate = useNavigate()
    const socket = useSocket()
    const [reports, setReports] = useState([])
    const user = useUser()

    
    // //Checking the user validation
    useEffect(() => {
        const check = async () => {
            const res = await verify()
            console.log(res)

            if (!res.success) {
                console.log("failed",res)
                navigate('/signin')
            }
        }

        check()
    }, [])

    //Socket connection
    useEffect(() => {

        getReports()

        if (!socket) return

        socket.on("connect", () => {
            console.log("connection established")
            // console.log(socket.id)
        })
    }, [socket])


    //Getting all the Report details
    const getReports = async () => {
        const res = await fetch('http://localhost:1111/report')
        const data = await res.json()
        // console.log("Reports got", data)
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
                            <div style={{ minWidth: '200px' }}>
                                <strong>{report.purpose}</strong>
                                <p style={{ margin: '0.25em 0' }}>{report.description}</p>
                                <p style={{ margin: '0.25em 0' }}>
                                    📞 <a href={`tel:${report.contact_number}`}>{report.contact_number}</a>
                                </p>
                                <p style={{ margin: '0.25em 0', fontSize: '0.85em', color: '#555' }}>
                                    🕒 {new Date(report.created_at).toLocaleString()}
                                </p>
                                <button
                                    onClick={() => handleReportDetails(report)}
                                    style={{
                                        marginTop: '0.5em',
                                        padding: '0.4em 0.75em',
                                        backgroundColor: '#2ecc71',
                                        border: 'none',
                                        color: 'white',
                                        cursor: 'pointer',
                                        borderRadius: '4px',
                                        width: '100%',
                                    }}
                                >
                                    View details
                                </button>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </main>
    )
}

export default Map