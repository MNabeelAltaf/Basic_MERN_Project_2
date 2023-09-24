import React from 'react';
import Register from './Register'
import Login from './Login'
import All_User from './All_User'
import User_Details from './User_Details';

import { Link, BrowserRouter, Route, Routes } from 'react-router-dom';

const NavBar = () => {
    return (
        <BrowserRouter>

            <header className='bg-indigo-400  text-white text-[1.2rem]' >
                <ul className='flex flex-row justify-evenly p-5' >
                    <li className='hover:underline' ><Link to="/register" >Signup</Link></li>
                    <li className='hover:underline'><Link to="/login">Login</Link></li>
                    <li className='hover:underline'><Link to="/users">All Users</Link></li>
                </ul>
            </header>



            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/users" element={<All_User />} />
                <Route path="/user-details" element={<User_Details />} />
            </Routes>
        </BrowserRouter>
    );
};

export default NavBar;