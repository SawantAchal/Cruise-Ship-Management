import React, { useContext, useState } from 'react';
import { StoreContext } from '../context/StoreContext';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
    const [currentState, setCurrentState] = useState('login');
    const {url , token , setToken} = useContext(StoreContext)
    const [data , setData] = useState({
        name:'',
        email:'',
        mobile:'',
        password:''
    })
    const navigate = useNavigate()

    const onChangeHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setData(data=>({...data,[name]:value}))
    }

    const onSubmitHandler = async(e) => {
        e.preventDefault();
        let newUrl = url;
        if (currentState === 'login') {
            newUrl += '/api/user/login'
            // console.log("Login data", { name, password });
        } else {
            newUrl += '/api/user/register'
            // console.log("Sign data", { name, email, mobile, password });
        }
        const response = await axios.post(newUrl , data);
        if (response.data.success) {
            localStorage.setItem("cruise token" , response.data.token)
            setToken(response.data.token)
            navigate('/home-page')
        }else{
            toast.error(response.data.message)
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form onSubmit={onSubmitHandler} className="w-full max-w-sm p-8 space-y-6 rounded-lg shadow-lg bg-white">
                <h2 className="text-2xl font-bold text-center capitalize">{currentState}</h2>
                {
                    currentState === 'login' ? null :
                        <>
                            <input  onChange={onChangeHandler}  value={data.email}  type='email'  name='email' placeholder='Enter Email'  required  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"/>
                            <input  onChange={onChangeHandler}   value={data.mobile}  type='tel'  name='mobile' placeholder='Enter Mobile No.'  required  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"/>
                        </>
                }
                <input name='name' onChange={onChangeHandler}   value={data.name}  type='text'  placeholder='Username'  required  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"/>
                <input  onChange={onChangeHandler}   value={data.password}  type='password'  name='password' placeholder='Password'  required  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"/>
                <div className="text-center">
                    {
                        currentState === 'login'
                            ? <p className="cursor-pointer text-blue-500 hover:underline" onClick={() => setCurrentState('signup')}>Create Account</p>
                            : <p className="cursor-pointer text-blue-500 hover:underline" onClick={() => setCurrentState('login')}>Login Here</p>
                    }
                </div>
                <button  type='submit'  className="w-full p-3 mt-4 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-600 transition duration-200 ease-in-out">
                    {currentState === 'login' ? 'Sign In' : 'Sign Up'}
                </button>
            </form>
        </div>
    );
};

export default Login;
