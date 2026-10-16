import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";



function adminSection() {
    const navigate = useNavigate();
    const signOut = async ()=>{
        localStorage.removeItem("accessToken");
localStorage.removeItem("userId");

navigate("/");
    }
    // return (
        
    //          <div className="w-full h-20 py-5 flex justify-between px-7 shadow-[0_2px_4px_-1px_rgba(0,0,0,0.15)]">
    //                   <h1 className="text-2xl sm:text-[30px] lg:text-[35px] text-yellow-500 Medium-font font-bold ml-3 sm:ml-5">Blog Dashboard</h1>

                       
    //                 <div className="w-100 h-15 cursor-pointer pl-60 ml-100 flex  items-center ">
    //                     <img src="/logout.png" alt="" className="size-6 mr-2 " />
    //                     <p onClick={signOut} className="text-xl"> Sign out</p>
    //                 </div>
                
    //             </div> 
            
        
    // )

    return (
    <div className="w-full min-h-20 py-4 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0 px-4 sm:px-7 shadow-[0_2px_4px_-1px_rgba(0,0,0,0.15)]">

        <h1 className="text-2xl sm:text-[30px] lg:text-[35px] text-yellow-500 Medium-font font-bold ml-0 sm:ml-3 lg:ml-5">
            Blog Dashboard
        </h1>

        <div className="w-auto h-auto cursor-pointer flex items-center justify-center px-3 sm:px-0 sm:mr-3">
            <img src="/logout.png" alt="" className="size-5 sm:size-6 mr-2" />

            <p onClick={signOut} className="text-base sm:text-lg lg:text-xl whitespace-nowrap">
                Sign out
            </p>
        </div>

    </div>
)
};
export default adminSection;
