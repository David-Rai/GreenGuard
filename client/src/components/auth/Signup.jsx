import React from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios'
import { verify } from '../../utils/verify';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

export default function Signup() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm();


  // //Checking the user validation
  useEffect(() => {
    const check = async () => {
      const res = await verify()
      console.log(res)

      if (res?.user) {
        console.log("failed", res)
        navigate('/map')
      }
    }

    check()
  }, [])

  const onSubmit = async (data) => {
    console.log('Signup Data:', data);

    // Simulate API call
    try {
      const res = await axios.post('http://localhost:1111/signup', {
        ...data
      }, {
        withCredentials: true
      })
      console.log(res)
      if (res.data.status) {
        navigate('/map')
      }
    } catch (error) {
      console.error('Signup failed:', error);
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-[#F9FAF8] px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8 mt-10">
        <h2 className="text-3xl font-bold mb-8 text-center text-[#2ecc71]">Sign Up</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>

          {/* Username */}
          <div>
            <label htmlFor="username" className="block mb-2 text-sm font-semibold text-gray-700">
              Username
            </label>
            <input
              id="username"
              type="text"
              placeholder="Your username"
              className={`w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2ecc71] ${errors.username ? 'border-red-500' : 'border-gray-300'
                }`}
              {...register('username', {
                required: 'Username is required',
                minLength: {
                  value: 3,
                  message: 'Username must be at least 3 characters',
                },
              })}
            />
            {errors.username && (
              <p className="mt-1 text-sm text-red-600">{errors.username.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-semibold text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              className={`w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2ecc71] ${errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Invalid email format',
                },
              })}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-semibold text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Create a password"
              className={`w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2ecc71] ${errors.password ? 'border-red-500' : 'border-gray-300'
                }`}
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              })}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-[#2ecc71] text-white py-3 rounded-lg font-semibold hover:bg-[#27ae60] transition-colors ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
              }`}
          >
            {isSubmitting ? 'Signing up...' : 'Sign Up'}
          </button>

          {/* Login prompt */}
          <p className="mt-6 text-center text-gray-600">
            Already have an account?{' '}
            <button
              type="button"
              onClick={() => navigate('/signin')}
              className="text-[#2ecc71] font-semibold hover:underline"
            >
              Login
            </button>
          </p>
        </form>
      </div>
    </main>
  );
}
