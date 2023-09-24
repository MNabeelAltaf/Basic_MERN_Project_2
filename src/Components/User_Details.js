import React from 'react';
import { useLocation } from 'react-router-dom';


const User_Details = () => {

    const { state } = useLocation()

    // console.log(state);

    return (
        <div>
            <h2 className='font-bold text-center text-[2rem] my-5 text-[#37687f]' >User's Details</h2>
            <hr />
            <div className='text-center'>



                <div className="flex items-center justify-center h-screen  bg-gray-100">
                    <div className="bg-white shadow-lg rounded-lg p-4 md:p-8  md:w-100 flex flex-col items-center space-y-4">
                        
                            <h2 className="text-xl md:text-2xl font-semibold">User Information</h2>
                            <div className="text-gray-700">
                                <div className="flex items-center mb-2">
                                    <label className="block text-sm  md:w-16 mr-2">Name:</label>
                                    <p className="text-sm max-sm:text-[1.0rem] md:text-lg">{state.user_data.name }</p>
                                </div>
                                <div className="flex items-center mb-2">
                                    <label className="block text-sm md:w-16 mr-2">Email:</label>
                                    <p className="text-sm max-sm:text-[1.0rem] md:text-lg">{ state.user_data.email }</p>
                                </div>
                                <div className="flex items-center mb-2">
                                    <label className="block text-sm md:w-16 mr-2">Password:</label>
                                    <br/>
                                    <p className="text-sm max-[550px]:text-[3px]  md:text-lg">{ state.user_data.password }</p>
                                </div>
                            </div>
                    </div>
                </div>


            </div>

        </div>
    );
};

export default User_Details;