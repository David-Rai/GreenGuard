import React from 'react';
import { useForm } from 'react-hook-form';

export default function Report() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log('Form data:', data);
    };

    return (
        <main className='main flex items-center justify-center'>
            <form onSubmit={handleSubmit(onSubmit)}
                className='bg-white rounded-2xl flex flex-col items-center p-5'
            >
                {/* Purpose */}
                <div className='inputContainer'>
                    <label>Purpose</label>
                    <input
                        type="text"
                        className='input'
                        {...register('purpose', { required: 'Purpose is required' })}
                        style={{ width: '100%', padding: 8, marginTop: 4 }}
                    />
                    {errors.purpose && <p style={{ color: 'red' }}>{errors.purpose.message}</p>}
                </div>

                {/* Contact Number */}
                <div className='inputContainer'>
                    <label>Contact Number</label>
                    <input
                        type="number"
                        className='input'

                        {...register('contactNumber', { required: 'Contact number is required' })}
                        style={{ width: '100%', padding: 8, marginTop: 4 }}
                    />
                    {errors.contactNumber && <p style={{ color: 'red' }}>{errors.contactNumber.message}</p>}
                </div>

                {/* Description */}
                <div className='inputContainer'>
                    <label>Description</label>
                    <textarea
                        className='input border-1'
                        {...register('description', { required: 'Description is required' })}
                        rows={4}
                        style={{ width: '100%', padding: 8, marginTop: 4 }}
                    />
                    {errors.description && <p style={{ color: 'red' }}>{errors.description.message}</p>}
                </div>

                {/* Upload Image */}
                <div style={{ marginTop: 16 }}>
                    <label>Upload Image</label>
                    {/* <input
                        type="file"
                        accept="image/*"
                        {...register('image', { required: 'Image upload is required' })}
                        style={{ width: '100%', marginTop: 4 }}
                    />
                    {errors.image && <p style={{ color: 'red' }}>{errors.image.message}</p>} */}
                </div>

                {/* Submit Button */}
                <button
                    className='btn1 bg-blue-700'
                    type="submit"
                >
                    REPORT
                </button>
            </form>
        </main>
    );
}
