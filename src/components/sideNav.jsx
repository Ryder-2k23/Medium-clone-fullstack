import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";



function sideNav() {
    // return (
        
    //         <div>
    //             <nav className="w-[20%] h-191 border-gray-300 border-r py-5 fixed">
    //             <h1 className="text-2xl sm:text-[30px] lg:text-[35px] Medium-font font-bold ml-3 sm:ml-5 mb-15 text-center text-yellow-500">Medium</h1>

    //             <Link to="/adminlog">
    //                 <div className="w-full h-15 cursor-pointer  mb-10 flex px-5 items-center hover:bg-gray-100 transition-color duration-1000">
    //                     <img src="/home.png" alt="" className="size-6 mr-2 " />
    //                     <p className="text-xl">Home</p>
    //                 </div>
    //             </Link>

    //             <Link to="/adminuserlog">
    //                 <div className="w-full h-15 cursor-pointer  flex px-5 items-center hover:bg-gray-100 transition-color duration-1000">
    //                     <img src="/users.png" alt="" className="size-6 mr-2 " />
    //                     <p className="text-xl"> Users</p>
    //                 </div>
    //             </Link>


    //             <Link to="/adminprofile">
    //                 <div className="w-full h-15 cursor-pointer mt-10  flex px-5 items-center hover:bg-gray-100 transition-color duration-1000">
    //                     <img src="/users.png" alt="" className="size-6 mr-2 " />
    //                     <p className="text-xl"> Profile</p>
    //                 </div>
    //             </Link>


                

                 
    //         </nav>
    //         </div>
            
        
    // )


    return (
    <div>
        <nav className="w-full min-h-auto lg:w-80 lg:h-screen lg:fixed lg:left-0 lg:top-0 lg:border-r border-gray-300 py-3 lg:py-5 bg-white lg:bg-white z-40 flex flex-col sm:flex-row lg:flex-col items-center lg:items-stretch">

            <h1 className="text-2xl sm:text-[30px] lg:text-[35px] Medium-font font-bold mx-3 lg:mx-5 lg:mb-15 mb-0 lg:text-center text-yellow-500">
                Medium
            </h1>

            <Link to="/adminlog" className="w-auto lg:w-full">
                <div className="min-h-12 lg:h-15 cursor-pointer lg:mb-10 flex px-3 lg:px-5 items-center hover:bg-gray-100 transition-colors duration-300">
                    <img src="/home.png" alt="" className="size-5 lg:size-6 mr-2" />
                    <p className="text-sm sm:text-base lg:text-xl">Home</p>
                </div>
            </Link>

            <Link to="/adminuserlog" className="w-auto lg:w-full">
                <div className="min-h-12 lg:h-15 cursor-pointer flex px-3 lg:px-5 items-center hover:bg-gray-100 transition-colors duration-300">
                    <img src="/users.png" alt="" className="size-5 lg:size-6 mr-2" />
                    <p className="text-sm sm:text-base lg:text-xl">Users</p>
                </div>
            </Link>

            <Link to="/adminprofile" className="w-auto lg:w-full">
                <div className="min-h-12 lg:h-15 cursor-pointer lg:mt-10 flex px-3 lg:px-5 items-center hover:bg-gray-100 transition-colors duration-300">
                    <img src="/users.png" alt="" className="size-5 lg:size-6 mr-2" />
                    <p className="text-sm sm:text-base lg:text-xl">Profile</p>
                </div>
            </Link>

        </nav>
    </div>
)
};
export default sideNav;
