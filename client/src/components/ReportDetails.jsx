import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import { useSocket } from '../socket/SocketContext'
import { toast } from 'react-toastify'

const ReportDetails = () => {
  const location = useLocation()
  const [report, setReport] = useState(null)
  const socket = useSocket()

  // Set report from location state
  useEffect(() => {
    if (location.state?.report) {
      setReport(location.state.report)
    }
  }, [location.state])

  // Handle socket "saved-report" event
  useEffect(() => {
    if (!socket) return

    const handleSavedReport = () => {
      console.log("Report saved event received")
      toast.success("Report saved successfully!")
    }

    socket.on("saved-report", handleSavedReport)

    // Cleanup listener on unmount or socket change
    return () => {
      socket.off("saved-report", handleSavedReport)
    }
  }, [socket])

  // Save report handler
  const handleSave = () => {
    if (!socket) {
      toast.error("Socket connection not established")
      return
    }
    if (!report?.id) {
      toast.error("No report selected to save")
      return
    }

    socket.emit("save-report", { report_id: report.id })
    toast.info("Saving report...")
  }

  return (
    <main className="main bg-[#F9FAF8] min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6">Report Details</h1>

      <section className="bg-white p-6 rounded-lg shadow-lg space-y-4 max-w-2xl mx-auto">
        {/* User ID and Created Date */}
        <div className="text-sm text-gray-600 flex justify-between items-center">
          <span><strong>User:</strong> {report?.user_id}</span>
          <span>
            <strong>Posted:</strong> {report?.created_at ? new Date(report?.created_at).toLocaleString() : "Unknown"}
          </span>
        </div>

        {/* Title / Purpose */}
        <h2 className="text-2xl font-semibold text-green-700">{report?.purpose}</h2>

        {/* Optional image */}
        <img
          src={report?.image || "https://thispersondoesnotexist.com"}
          alt="Report Visual"
          className="w-full rounded-lg max-h-[400px] object-cover"
        />

        {/* Description */}
        {report?.description && (
          <p className="text-gray-700 whitespace-pre-line">{report.description}</p>
        )}

        {/* Contact Info */}
        {report?.contact_number && (
          <p className="text-gray-700"><strong>Contact:</strong> {report.contact_number}</p>
        )}

        {/* Map or Location */}
        {report?.lat && report?.lng && (
          <p className="text-gray-600 text-sm">
            📍 Location: ({report?.lat}, {report?.lng})
          </p>
        )}

        {/* Buttons */}
        <div className="flex space-x-4 mt-4">
          <button
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
            aria-label="I will help with this report"
          >
            I Will Help
          </button>
          <button
            onClick={handleSave}
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition"
            aria-label="Save this report"
          >
            Save
          </button>
        </div>
      </section>
    </main>
  )
}

export default ReportDetails
