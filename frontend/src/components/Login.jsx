import React, { useState } from 'react';

const Login = () => {
    const [currentState, setCurrentState] = useState('login');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');

    const onSubmithandler = (e) => {
        e.preventDefault()
        if (currentState === 'signup') {
            console.log("Sign data" , {name , email,mobile , password})
        } else {
            console.log("login data" , {name , password})
        }
    }
    return (
        <>
            <div className="flex justify-center items-center h-screen">
                <form onSubmit={onSubmithandler} className="w-full max-w-sm p-6 space-y-4 rounded-lg shadow-lg bg-white">
                    <div>
                        <p className="text-xl font-bold text-center capitalize">{currentState}</p>
                    </div>
                    {
                        currentState==='login' ? '' 
                        :
                            <>
                                <input onChange={(e) => setEmail(e.target.value)} value={email} type='email' placeholder=' Enter Email' required className="w-full p-2 border rounded-md"/>
                                <input onChange={(e) => setMobile(e.target.value)} value={mobile} type='tel' placeholder='Enter Mobile No.' required className="w-full p-2 border rounded-md"/>
                            </>
                    }
                    <input onChange={(e) => setName(e.target.value)} value={name} type='text' placeholder='username' required className="w-full p-2 border rounded-md"/>
                    <input onChange={(e) => setPassword(e.target.value)} value={password} type='password' placeholder='Password' required className="w-full p-2 border rounded-md"/>
                    <div className="text-center">
                        {
                            currentState === 'login'
                            ? <p className="cursor-pointer text-blue-500 hover:underline" onClick={() =>setCurrentState('Signup')}>Create Account</p>
                            : <p className="cursor-pointer text-blue-500 hover:underline" onClick={() =>setCurrentState('login')}>Login Here</p>
                        }
                    </div>
                    <button type='submit' className="w-full p-2 mt-4 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-600">{currentState === 'login' ? 'Sign In' : 'Sign up' }</button>
                </form>
            </div>
        </>
    );
};

export default Login;
