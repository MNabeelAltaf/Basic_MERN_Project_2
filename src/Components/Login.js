import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// import './Login.css';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPass, setShowPass] = useState(false);

    async function loginData(event) {
        event.preventDefault();

        const res = await fetch('http://localhost:3001/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email, password,
            })
        })

        const resp = await res.json();

        if (resp.status === 'ok' || resp.user === true) {
            console.log("Login sucessfully")
            alert("Login Sucessful")

            setEmail('');
            setPassword('');
        }
        else if (resp.status == 404) {
            alert("Invalid Credentials")
            return;
        }
        else if (resp.status === 'error' || resp.user === false) {
            alert("Failed to login")
            console.log("Error!!!");
        }


    }


    return (
        // <div className='mainContainer'>
        //     <h2>Login </h2>
        //     <div className="container1">

        //         <form onSubmit={loginData}>
        //             <input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required />
        //             <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required />
        //             <input type='Submit' value="Submit" />
        //         </form>

        //     </div>
        // </div>

        // =====================
        // using tailwind css [pre-build template [component]]]

        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">

                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Login
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={loginData} className="space-y-6" action="#" method="POST">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                Password
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                type={showPass ? 'text' : 'password'} placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    
                    <div>
                    <button type='button' onClick={()=>setShowPass(!showPass)} >
                        <span className='text-[13px] hover:text-slate-500' >{showPass?'Hide Password':'Show Password'}</span>
                    </button>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Login in
                        </button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm text-gray-500">
                    Not have an Account?{' '}
                    <Link to='/register' className='font-semibold leading-6 text-indigo-600 hover:text-indigo-500' >
                        Registeration
                    </Link>
                </p>
            </div>
        </div>


    );
};

export default Login;