import React from 'react';
import { useState } from 'react';
import { Link, Navigate, useLocation } from 'react-router';
import { login, register } from '../utils/api';
import useAsyncFunction from '../hooks/useAsyncFunction';
import { useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { FaUser, FaEnvelope, FaLock, FaGoogle, FaFacebookF, FaApple } from 'react-icons/fa';

const Auth = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const location = useLocation();
    const currentRoute = location.pathname.substring(1); // Removes leading "/"
    const { execute: handleRegister, loading, error, success } = useAsyncFunction(currentRoute === "signUp" ? register : login);
    const { isAuthenticated, login: setLogin } = useAuth();

    useEffect(() => {
        if (success && currentRoute === "signIn") {
            setLogin();
        }
    }, [success]);

    useEffect(() => {
        setErrorMsg(error)
    }, [error])

    const onSubmit = async (e) => {
        e.preventDefault();
        const data = await handleRegister({ username: name, email, password });
        console.log({ data });
        return <Navigate to="/taches/" replace />
    };

    if (success) {
        return <Navigate to={"/taches/"} replace />;
    }

    if (isAuthenticated) {
        return <Navigate to={"/taches/"} replace />;
    }

    if (loading) {
        return <h1>Loading ...</h1>;
    }

    return (
        <section className='flex justify-center mx-auto  w-[80%] gap-10 items-center flex-col xl:flex-row'>
            <h1 className='text-red-500 text-lg font-bold text-center'>{errorMsg}</h1>

            <div className='w-[400px] bg-white shadow-lg rounded-lg p-8'>
                <h1 className='text-3xl font-bold text-gray-800 py-4'>Welcome to StudyFlow</h1>
                <form onSubmit={onSubmit} className='flex flex-col gap-6'>
                    {currentRoute === "signUp" && (
                        <div className='flex items-center px-3 py-2 bg-gray-100 rounded-md'>
                            <FaUser className='text-gray-500' />
                            <input
                                required
                                onChange={(e) => setName(e.target.value)}
                                name='name'
                                className='flex-1 outline-none bg-transparent px-3'
                                placeholder='Name'
                            />
                        </div>
                    )}
                    <div className='flex items-center px-3 py-2 bg-gray-100 rounded-md'>
                        <FaEnvelope className='text-gray-500' />
                        <input
                            type='email'
                            required
                            onChange={(e) => setEmail(e.target.value)}
                            name='email'
                            className='flex-1 outline-none bg-transparent px-3'
                            placeholder='Email'
                        />
                    </div>
                    <div className='flex items-center px-3 py-2 bg-gray-100 rounded-md'>
                        <FaLock className='text-gray-500' />
                        <input
                            required
                            type='password'
                            onChange={(e) => setPassword(e.target.value)}
                            name='password'
                            className='flex-1 outline-none bg-transparent px-3'
                            placeholder='Password'
                        />
                    </div>
                    <button className='py-3 mt-5 w-full font-bold text-white bg-purple-500 rounded-md hover:bg-purple-600'>
                        {currentRoute === "signUp" ? "Create account" : "Sign in"}
                    </button>
                </form>
                <div className='flex flex-row gap-2 items-center mt-6'>
                    <div className='flex-1 bg-gray-300 h-[2px]' />
                    <h5 className='text-gray-500'>or sign up with</h5>
                    <div className='flex-1 h-[2px] bg-gray-300' />
                </div>
                <div className='flex items-center justify-between mt-4'>
                    <button className='py-2 px-4 border rounded-md flex items-center gap-2'>
                        <FaGoogle className='text-red-500' /> Google
                    </button>
                    <button className='py-2 px-4 border rounded-md flex items-center gap-2'>
                        <FaFacebookF className='text-blue-500' /> Facebook
                    </button>
                    <button className='py-2 px-4 border rounded-md flex items-center gap-2'>
                        <FaApple className='text-black' /> Apple
                    </button>
                </div>
                {currentRoute === "signUp" ? (
                    <h4 className='text-gray-500 mt-3'>
                        Already have an account? <Link to="/signIn" className='text-purple-400'>Sign in</Link>
                    </h4>
                ) : (
                    <h4 className='text-gray-500 mt-3'>
                        Not a member? <Link to="/signUp" className='text-purple-400'>Sign up</Link>
                    </h4>
                )}
            </div>
            <img src='/signin.svg' alt='Auth Illustration' className='w-[400px] hidden xl:block' />
        </section>
    );
};

export default Auth;
