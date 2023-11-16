import React from 'react';
import { useState } from 'react';
import authServiceObj from '../appwrite/authService';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { login } from '../store/authSlice';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form'
import Input from './Input';



function SignUp() {
    const navigate = useNavigate()
    const [isError, setIsError] = useState(false)
    const [error, setError] = useState("")
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()
    const create = async (data) => {
        setIsError(false)
        setError("")
        try {
            const userData = await authServiceObj.createAccount(data);
            if (userData) {
                const currentUserData = authServiceObj.getCurrentUser();
                if (currentUserData) {
                    dispatch(login(userData));
                    navigate("/");
                }
            } 
        } catch (error) {
            console.log('error');
            console.log('sign in error : ', error);
            setIsError(true);
            setError(error.message);
        }
    }
    

    return (
        <section>
            <div class="grid grid-cols-1 lg:grid-cols-2">
                <div class="h-full w-full">
                    <img
                        class="mx-auto h-full w-auto rounded-md object-cover"
                        src="https://i.pinimg.com/originals/c6/b7/70/c6b7706b4b5c13d4a15e72dabaea2c8e.jpg"
                        alt=""
                    />
                </div>
                <div class="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
                    <div class="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
                        <h2 class="text-3xl font-bold leading-tight text-black sm:text-4xl">
                            Sign Up
                        </h2>
                        <p class="mt-2 text-sm text-gray-600">
                            Already Have Account ?
                            <Link
                                to="/login"
                                class="font-semibold text-black transition-all duration-200 hover:underline"
                            >
                                Log In
                            </Link>
                        </p>

                        {isError && <div className="bg-red-100 mb-5 border border-red-400 text-red-700 px-4 py-3 rounded relative" >
                            <strong className="font-bold">Holy smokes!</strong>
                            <span className="block sm:inline">{error}</span>
                        </div>}
                        <form onSubmit={handleSubmit(create)} method="POST" class="mt-8">
                            <div class="space-y-5">

                                <div class="flex items-center justify-between">
                                    <label for="" class="text-base font-medium text-gray-900">
                                        Full Name
                                    </label>

                                </div>
                                <div class="mt-2">
                                    <Input

                                        placeholder="Full Name"
                                        {...register("name")}
                                    />
                                </div>

                                <div>
                                    <div class="flex items-center justify-between">
                                        <label for="" class="text-base font-medium text-gray-900">
                                            Email
                                        </label>

                                    </div>
                                    <div class="mt-2">
                                        <Input
                                            type="email"
                                            placeholder="Email"
                                            {
                                            ...register("email", {
                                                required: true,
                                                validate: { matchpatern: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || "Please Enter Valid Email Address !" },
                                            })
                                            }
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div class="flex items-center justify-between">
                                        <label for="" class="text-base font-medium text-gray-900">
                                            Password
                                        </label>

                                    </div>
                                    <div class="mt-2">
                                        <Input
                                            type="password"
                                            placeholder="Password"
                                            {...register("password", {
                                                required: true
                                            })}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <button

                                        type="submit"
                                        class="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                                    >
                                        Get started
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            class="ml-2"
                                        >
                                            <line x1="5" y1="12" x2="19" y2="12"></line>
                                            <polyline points="12 5 19 12 12 19"></polyline>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </form>

                    </div>
                </div>

            </div>
        </section>

    );
}

export default SignUp;