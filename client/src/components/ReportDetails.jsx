import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router'

const ReportDetails = () => {
    const location = useLocation()
    const [report, setReport] = useState(null)

    useEffect(() => {
        if (location.state?.report) {
            setReport(location.state.report)
        }
    }, [location.state])

    if (!report) {
        return (
            <main className="main bg-[#F9FAF8] p-6">
                <h1 className="text-xl font-semibold">No report data available.</h1>
            </main>
        )
    }

    //Handling save this reports
    const handleSave = () => {
        console.log('saving the report')

    }

    return (
        <main className="main bg-[#F9FAF8] min-h-screen p-6">
            <h1 className="text-3xl font-bold mb-6">Report Details</h1>
            <section className="bg-white p-6 rounded-lg shadow-lg space-y-4 max-w-2xl">
                <h2 className="text-2xl font-semibold text-green-700">{report.purpose}</h2>
                <p className="text-gray-700"><strong>Contact:</strong> {report.contact_number}</p>
                <p className="text-gray-700">{report.description}</p>
                {report.image && (
                    <img
                        src={report.image}
                        alt="Report Visual"
                        className="w-full h-auto rounded-md"
                    />
                )}
                <div className="flex space-x-4 mt-4">
                    <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
                        I Will Help
                    </button>
                    <button
                        onClick={handleSave}
                        className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition">
                        Save
                    </button>
                </div>
            </section>
        </main>
    )
}

export default ReportDetails
