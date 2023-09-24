import React, { useState } from 'react';
import './Register.css';
import { Link } from 'react-router-dom';


const Register = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [c_password, setC_Password] = useState('');
    const [showPassword, setShowPassword] = useState(false);


    async function registerData(event) {
        event.preventDefault();

        if (password != c_password) {
            alert("Password are not match")
            return
        }

        // sending data to NodeJs on Port 3000 (nodejs running on port 3000)
        const response = await fetch("http://localhost:3001/api/register", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name, email, password,
            })

        })

        const data = await response.json();

        // HTTP code  -> 200 = response  ok
        if (data.status === 200) {
            alert("Submit Sucessfully!")
            console.log("Submit Sucessfully");
            setName('');
            setEmail('');
            setPassword('');
            setC_Password('');
        } else if (data.status == 500) {
            alert("Email already exist")
            return;
        }
        else if (data.status === 402) {
            alert("Submission Error");
            console.log("Error on Registeration Submission");

        }
    }

    function show_hide() {

        setShowPassword(!showPassword)

    }

    return (
        // <div className="mainContainer" >
        //     <h2>Register</h2>
        //     <p>

        //     </p>
        //     <div className='container1' >
        //         <form onSubmit={registerData}>
        //             <input type='text' name="name" placeholder='Enter Name' value={name} onChange={(e) => setName(e.target.value)} required />
        //             <input type='email' name="email" placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)} required />
        //             <input type='password' name="password" placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)} required />
        //             <input type="submit" value="Submit" />
        //         </form>
        //     </div>
        // </div>

        // ===================
        // using tailwind css [pre-build template [component]]


        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-1 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">

                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Registeration
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={registerData} className="space-y-3" action="#" method="POST">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                            Name
                        </label>
                        <div className="mt-2">
                            <input
                                type='text' name="name" placeholder='Enter Name' value={name} onChange={(e) => setName(e.target.value)} required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                type='email' name="email" placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)} required
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
                                type={showPassword ? 'text' : 'password'} name="password" placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)} required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                Confirm Password
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                type={showPassword ? 'text' : 'password'} name="c_password" placeholder='Confirm Password' value={c_password} onChange={(e) => setC_Password(e.target.value)} required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <button type='button' onClick={() => show_hide()} >
                            <span className='text-[13px] hover:text-slate-500'>{showPassword ? 'Hide Passord' : 'Show Passord'}</span>
                        </button>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Sign in
                        </button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm text-gray-500">
                    Have an Account?{' '}
                    <Link to='/login' className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                        Login
                    </Link>
                </p>
            </div>
        </div>

    );
};



export default Register;