import React, { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { useSocket } from '../socket/SocketContext'
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router'

export default function Report() {
    const navigate = useNavigate()
    const socket = useSocket()
    const coordRef = useRef(null)
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    //Socket connection handling
    useEffect(() => {
        if (!socket) return

        //Handling successfully submitted the report
        socket.on("added-report", () => {
            toast.success("sucessfully submitted the report")
            navigate('/map')
        })
    }, [socket])

    //Sending the new report to the socket server
    const onSubmit = async (data) => {
        console.log('Form data:', data);

        await getCoordinates(); // wait for coordinates to be fetched

        if (coordRef.current) {
            const { lat, lng } = coordRef.current;

            // emitting the data
             socket.emit("new-report", { ...data, lat, lng  });
        } else {
            console.error("Coordinates not available");
        }
    };

    const getCoordinates = async () => {
        try {
            const position = await new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject);
            });

            const { latitude, longitude } = position.coords;

            console.log('User location:', latitude, longitude);

            coordRef.current = {
                lat: latitude,
                lng: longitude,
            };
        } catch (error) {
            console.error('Error getting location:', error);
        }
    };

    return (
        <main className="main flex flex-col items-center justify-center min-h-screen bg-green-50 p-4 gap-5">

            <div>LOGO</div>

            {/* FORM */}
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white rounded-2xl flex flex-col items-start p-8 max-w-lg w-full shadow-lg"
            >
                {/* Purpose */}
                <div className="w-full mb-6">
                    <label className="block text-green-900 font-semibold mb-1">Purpose</label>
                    <input
                        type="text"
                        {...register('purpose', { required: 'Purpose is required' })}
                        className="input input-bordered w-full px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                        placeholder="e.g., Waste Management"
                    />
                    {errors.purpose && (
                        <p className="text-red-600 mt-1">{errors.purpose.message}</p>
                    )}
                </div>

                {/* Contact Number */}
                <div className="w-full mb-6">
                    <label className="block text-green-900 font-semibold mb-1">Contact Number</label>
                    <input
                        type="text"
                        {...register('contact_number', { required: 'Contact number is required' })}
                        className="input input-bordered w-full px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                        placeholder="e.g., 234567890"
                    />
                    {errors.contact_number && (
                        <p className="text-red-600 mt-1">{errors.contact_number.message}</p>
                    )}
                </div>

                {/* Description */}
                <div className="w-full mb-6">
                    <label className="block text-green-900 font-semibold mb-1">Description</label>
                    <textarea
                        rows={4}
                        {...register('description', { required: 'Description is required' })}
                        className="input input-bordered w-full px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 resize-none"
                        placeholder="Describe the issue..."
                    />
                    {errors.description && (
                        <p className="text-red-600 mt-1">{errors.description.message}</p>
                    )}
                </div>

                {/* Upload Image */}
                <div className="w-full mb-6">
                    <label className="block text-green-900 font-semibold mb-1">Upload Image</label>
                    {/* <input
              type="file"
              accept="image/*"
              {...register('image', { required: false })}
              className="w-full"
            /> */}
                    {/* If you want to enforce required, change to true */}
                    {/* {errors.image && (
              <p className="text-red-600 mt-1">{errors.image.message}</p>
            )} */}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="btn1 bg-green-700 hover:bg-green-800 flex items-center justify-center text-white font-semibold py-3 rounded-lg w-full transition"
                >
                    REPORT
                </button>
            </form>

            <ToastContainer />
        </main>
    );
}
