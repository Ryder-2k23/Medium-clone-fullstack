import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";



function notFound() {
    
    return (
        <div>
            <div className="w-full h-17 bg-white ">
                <nav className="w-full h-17 border-b border-gray-300 flex fixed bg-white  items-center px-6">
                    <img src="/menu.png" alt="" className="size-10 cursor-pointer" />
                    <Link to='/'><h1 className="text-[35px] Medium-font font-bold ml-5">Medium</h1></Link>

                    <div className="px-4 w-60 h-10 rounded-3xl bg-gray-50 flex items-center ml-7">
                        <img src="/search.png" alt="" className="size-7" />
                        <input type="text" placeholder="Search" className="w-full ml-2 outline-none h-6" />
                    </div>

                    <button className="min-w-20 px-3 h-9 ml-185 bg-black cursor-pointer flex rounded-3xl items-center">
                        <img src="/grid.png" alt="" className="size-6 mr-1" />
                        <p className="text-white text-[14px]">Get app</p>
                    </button>

                    <div className="flex cursor-pointer ml-5 ">
                        <img src="/edit.png" alt="" className="size-5" />
                        <p className="text-[15px] ml-3 hover:text-gray-600">Write</p>
                    </div>

                    <img src="/bell.png" alt="" className="size-6 ml-5" />

                    <div className="rounded-[50%] border size-8 ml-5"></div>
                </nav>
            </div>

            <div className="w-full min-h-[91vh] flex">
                {/* left */}
                <div className="w-[15%] h-[91vh] left-0 top-0 bg-white">
                    <div className="w-[15%] bg-white h-[91vh] border-r border-gray-200 fixed">
                        <div className="w-full h-10 flex px-6 mt-13 hover:bg-gray-50 items-center cursor-pointer">
                            <img src="/home.png" alt="" className="size-5" />
                            <p className="ml-1">Home</p>
                        </div>


                        <div className="w-full h-10 flex px-6 mt-3 items-center hover:bg-gray-50 cursor-pointer">
                            <img src="/bookmark.png" alt="" className="size-5" />
                            <p className="ml-1">Library</p>
                        </div>


                        <div className="w-full h-10 flex px-6 mt-3 items-center hover:bg-gray-50 cursor-pointer">
                            <img src="/people.png" alt="" className="size-5" />
                            <p className="ml-1">Profile</p>
                        </div>


                        <div className="w-full h-10 flex px-6 mt-3 items-center hover:bg-gray-50 cursor-pointer">
                            <img src="/file.png" alt="" className="size-5" />
                            <p className="ml-1">Stories</p>
                        </div>


                        <div className="w-full h-10 flex px-6 mt-3  items-center hover:bg-gray-50 cursor-pointer">
                            <img src="/stats.png" alt="" className="size-5" />
                            <p className="ml-1">Stats</p>
                        </div>


                        <div className="w-full h-20 flex px-6 border-t border-b border-gray-300 mt-3  items-center hover:bg-gray-50 cursor-pointer">
                            <img src="/tic-tac-toe.png" alt="" className="size-5" />
                            <p className="ml-1">Games</p>
                        </div>


                        <div className="w-full h-10 flex px-6 mt-5  items-center hover:bg-gray-50 cursor-pointer">
                            <img src="/users.png" alt="" className="size-5" />
                            <p className="ml-1">Following</p>
                        </div>


                        <div className="w-full h-10 flex px-6 mt-5 items-center hover:bg-gray-50 cursor-pointer">
                            <img src="/plus.png" alt="" className="size-4" />
                            <p className="ml-1 text-gray-500">Find writers and publications to follow.</p>
                        </div>

                        <p className="text-center underline text-gray-600 cursor-pointer mt-1">See suggestiions</p>

                    </div>
                </div>

                <div className="w-[85.5%] min-h-[91vh] ">
                    <p className="text-center mt-25 page_not_found">Page not found</p>
                    <p className="text-center  page_not_found_code text-gray-500">404</p>
                    <p className="text-center text-3xl font-semibold">Out of nothing, something.</p>
                    <p className="text-center mt-2 text-xl text-gray-500">You can find (just about) anything on Medium — apparently even a page that doesn’t <br /> exist. Maybe these stories will take you somewhere new?</p>
                    <Link to="/landingpage"><p className="text-center underline capitalize text-lg mt-3 text-gray-500">home</p></Link>
                    
                </div>
            </div>
        </div>
    )
};
export default notFound;
