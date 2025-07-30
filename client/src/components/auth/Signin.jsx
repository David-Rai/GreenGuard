import React from 'react';
import axios from 'axios'
import { verify } from '../../utils/verify';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';

const Signin = () => {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
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
    console.log('Signin data:', data);
    // You can send this to your backend
    try {
      const res = await axios.post('http://localhost:1111/signin', {
        ...data
      }, {
        withCredentials: true
      })
      console.log(res)

      if (res.data.success) {
        navigate('/map')
      }
    }
    catch (err) {
      console.log(err)
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-[#F9FAF8] px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md"
        noValidate
      >
        <h2 className="text-3xl font-bold text-center text-[#2ecc71] mb-8">
          Sign In
        </h2>

        {/* Email */}
        <div className="mb-6">
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
                value: /\S+@\S+\.\S+/,
                message: 'Invalid email format',
              },
            })}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="mb-8">
          <label htmlFor="password" className="block mb-2 text-sm font-semibold text-gray-700">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Your password"
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
          className="w-full bg-[#2ecc71] text-white py-3 rounded-lg font-semibold hover:bg-[#27ae60] transition-colors"
        >
          Sign In
        </button>

        {/* Signup prompt */}
        <p className="mt-6 text-center text-gray-600">
          Don&apos;t have an account?{' '}
          <button
            type="button"
            onClick={() => navigate('/signup')}
            className="text-[#2ecc71] font-semibold hover:underline"
          >
            Sign up
          </button>
        </p>
      </form>
    </main>

  );
};

export default Signin;
