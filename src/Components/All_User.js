import React, { useState } from 'react';
import "./All_User.css";

import { Link } from "react-router-dom";
import User_Details from './User_Details';



const All_User = () => {

    const [r_data, setR_Data] = useState([]);

    const [delete_status, setDelete_status] = useState();

    async function getData() {
        try {
            const registeration_data = await fetch('http://localhost:3001/api/getusers', {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            const reg_data = await registeration_data.json();
            setR_Data(reg_data)
            // console.log(reg_data);

            // for (const [key, value] of Object.entries(reg_data)) {
            //     r_data.push(value)
            // }



        } catch (error) {
            console.log("Error in Showing data");
        }
    }

    async function deleteUser(id) {
        const delete_user = await fetch('http://localhost:3001/api/delete', {
            method: "DELETE",
            headers: {
                'Content-Type': "application/json",
            },
            body: JSON.stringify({
                id
            })

        })

        let delete_resp = await delete_user.json();
        if (delete_resp.status == 200) {

            // If the delete operation was successful, update the r_data state
            setR_Data(r_data.filter(record => record._id !== id));

            setDelete_status(true);
        } else if (delete_resp.status == 404) {
            setDelete_status(false);
        }
    }



    return (
        // <div className='mainContainer'>
        //     <h2>All Users</h2>

        //     <button type='button' onClick={getData}>Get Users</button>

        //     <ul>
        //         {r_data.map((user, index) => (
        //             <li key={index}>{user.name} - {user.email}</li>
        //         ))}
        //     </ul>

        // </div>
        // =========================
        // using tailwind css [pre-build [template/component]]


        <div className='m-2'>
            <h2 className='font-bold text-center text-[2rem] my-5 text-[#37687f]' >All Registered Users</h2>

            <p className='text-center '>
                <button type='button' onClick={getData} className=" rounded-full bg-blue-500 px-5 py-3 text-base font-medium text-white transition duration-200 hover:bg-blue-600 active:bg-blue-700 dark:bg-blue-400 dark:text-white dark:hover:bg-blue-300 dark:active:bg-blue-200">
                    Get All Users
                </button>
            </p>
            <hr className='m-10' />

            <div>
                {delete_status === true ? (

                    <div className="bg-blue-100 border-t border-b text-center m-5 border-green-500 text-green font-[148px] px-4 py-3" role="alert">
                        <p className="font-bold">Delete Successfully</p>
                    </div>

                ) :
                    delete_status === false ? (
                        <div>
                            <h3>Failed to Delete</h3>
                        </div>
                    )
                        : null}
            </div>

            <ul role="list" className="divide-y divide-gray-100 m-10">
                {r_data.map((user, index) => (
                    <li key={user.email} className=" gap-x-6 py-5">
                        <div className='w-[100%] grid grid-cols-2 bg-[#e2e7ea] max-sm:grid-cols-1 text-center'>
                            <div className=" min-w-0 px-1 ">
                                <div className="min-w-0 max-sm:py-3">
                                    <p className="text-sm font-semibold leading-6 text-gray-900">Name:{' '} {user.name}</p>
                                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">Email:{' '}{user.email}</p>
                                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">Password:{' '}{user.password}</p>
                                </div>
                            </div>
                            <div className='flex justify-center items-center '>

                                <Link                           
                                    to="/user-details"
                                    state={{user_data: user }}
                                >
                                
                                    <button className="focus:outline-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:blue-red-600 dark:hover:blue-red-700 dark:focus:ring-blue-900">
                                        View
                                    </button>
                                </Link>

                                <button onClick={() => deleteUser(user._id)} type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                                    Delete
                                </button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div >


    );
};

export default All_User;