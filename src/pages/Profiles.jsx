 import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

 function Profiles(){
    const [openModal, setOpenModal] = useState(false);
    
    function borderIn(){
        let input = document.getElementById("input");
        input.style.border="1px solid black";
    };

    const [activeNav, setActiveNav] = useState(1);
    return(
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
                        <Link to='/landingpage'>
                                <div onClick={()=>setActiveNav(2)}  className="w-full h-10 flex px-6 mt-13 items-center cursor-pointer hover:text-black text-gray-600">
                                    <img src={activeNav===1? `/home.png` : `/clicked-home.png`} alt="" className="size-5" />
                                    <p className="ml-1">Home</p>
                                </div>
                        </Link>


                        <div className="w-full h-10 flex px-6 mt-3 items-center hover:bg-gray-50 cursor-pointer">
                            <img src="/bookmark.png" alt="" className="size-5" />
                            <p className="ml-1">Library</p>
                        </div>


                        <Link to='/profiles'>
                                <div onClick={()=>setActiveNav(1)} className="w-full h-10 flex px-6 mt-3 items-center cursor-pointer hover:text-black text-gray-600">
                                    <img src={activeNav ===2? `/clicked--user.png` : `/people.png`} alt="" className="size-5" />
                                    <p className="ml-1">Profile</p>
                                </div>
                        </Link>


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
                    <div className="w-full h-13 bg-yellow-400 border-b border-t flex items-center justify-center">
                        <div className="min-w-30 h-8 bg-white rounded-lg flex items-center px-2 mr-3">Welcome Offer</div>
                        <p>Access to everything. Now 30% off. <span className="font-bold underline">Upgrade Now</span></p>
                    </div>

                    {/* midlle */}
                    <div className="w-full min-h-[85vh]  flex">
                        <div className="w-[70%] h-160 border-r border-gray-200 flex justify-center">
                            <div className="w-[65%] min-h-50">
                                <div className="w-full min-h-10  flex justify-between py-10">
                                    <p className="text-[40px] font-semibold">Onuegbusuccess </p>
                                    <img src="/menu-dots.png" alt="" className="size-8 mt-5 cursor-pointer" />
                                </div>

                                <div className="w-full h-9 border-b border-gray-200 flex">
                                        <div className="cursor-pointer hover:border-b size-9 mr-10 text-[15px] text-gray-500 hover:text-black"><p>Home</p></div>
                                        <div className="cursor-pointer hover:border-b size-9 mr-10 text-[15px] text-gray-500 hover:text-black"><p>Reposts</p></div>
                                        <div className="cursor-pointer hover:border-b size-9 mr-10 text-[15px] text-gray-500 hover:text-black"><p>Activity</p></div>
                                        <div className="cursor-pointer hover:border-b size-9 mr-10 text-[15px] text-gray-500 hover:text-black"><p>About</p></div>
                                </div>

                                <div className="w-full h-39 pb-3 border flex bg-gray-100 rounded-sm mt-10 border-gray-300">
                                    <div className="w-[65%] min-h-39">

                                        <div className="flex w-full min-h-5 pl-5 pt-5">
                                            <div className="rounded-[50%] border mr-2 size-6"></div>
                                            <p className="text-[15px] text-gray-800">Onuegbusuccess</p>
                                        </div>

                                        <p className="reading_list pl-5 pt-5">Reading list</p>

                                        <div className="w-full h-5 mt-7  flex justify-between">
                                            <div className="flex pl-5 ">
                                                <p className="text-gray-500">No stories</p>
                                                <img src="/padlock.png" className="ml-2 size-3 mt-2" alt="" />
                                            </div>

                                            <img src="menu-dots.png" alt=""  className="size-6 cursor-pointer mt-1 mr-5"/>
                                        </div>
                                    </div>

                                    <div className="w-[35%] h-38.5 bg-white flex justify-between border-b border-gray-100">
                                        <div className="w-[50%] h-full bg-gray-200"></div>
                                        <div className="w-[20%] h-full bg-gray-200"></div>
                                        <div className="w-[25%] h-full bg-gray-200"></div>
                                    </div>
                                </div>
                            </div>

                           
                        </div>

                         <div className="w-[35%] min-h-50 py-5 p-10">
                            <div className="rounded-[50%] border size-25"></div>

                            <p className="font-semibold text-xl mt-5">Onuegbusuccess</p>

                            <p onClick={()=> setOpenModal(true)} className="text-green-700 text-[13px] cursor-pointer mt-5 ">Edit profile</p>
                         </div>
                    </div>
                </div>
            </div>


            {openModal && (
                <div className={`fixed inset-0 z-50 flex items-center justify-center py-10 overflow-y-auto  bg-black/50 backdrop-blur-xs transition-opacity duration-3000 ${openModal? "opacity-100":"opacity-0"} `}>
                    
                    <div className='w-[33%] min-h-[80vh] bg-white rounded-sm pb-5 mt-50'>
                        <img src="/cross.png" alt="" onClick={() => setOpenModal(false)} className="ml-110 mt-3 text-gray-400 hover:text-gray-700 size-14 font-bold cursor-pointer p-2"  />
                        <p className="font-semibold text-center text-2xl">Profile information</p>

                        <div className="w-full min-h-100  px-8">
                            <p className="text-md">Photo</p>

                            <div className="full min-h-10  flex">
                                <div className="rounded-[50%] border h-23 w-25"></div>
                                <div>
                                    <div className="flex text-md"><p className="mr-3 text-green-700 cursor-pointer ml-2">Update</p> <p className="text-red-700 cursor-pointer">Remove</p></div>
                                    <div className="pl-2"><p className="text-[14px] text-gray-500 mt-5">Recommended: Square JPG, PNG, or GIF, at least 1,000 pixels per side.</p></div>
                                </div>

                            </div>

                             <div className="w-full min-h-10 mt-10 ">
                                <p className="text-[15px]">Name*</p>
                                <input type="text" className="w-full min-h-7 rounded-sm bg-gray-100 px-5 outline-none  py-1 border-0 focus:border-1" />
                                <div className="w-full min-h-5  flex justify-end pt-1"><span>0</span>/50</div>
                             </div>

                             <div className="w-full min-h-10 mt-10 ">
                                <p className="text-[15px]">Pronoun</p>
                                <input type="text" placeholder="Add..." className="w-full min-h-7 rounded-sm bg-gray-100 px-5 outline-none  py-1 border-0 focus:border-1" />
                                <div className="w-full min-h-5  flex justify-end pt-1"><span>0</span>/4</div>
                             </div>


                             <div className="w-full min-h-10 mt-10 ">
                                <p className="text-[15px]" >Short bio</p>
                                <textarea name="" id="" className="w-full min-h-20 rounded-sm bg-gray-100 px-5 outline-none  py-1 border-0 focus:border-1"></textarea>
                                {/* <input type="text" placeholder="Add..."  /> */}
                                <div className="w-full min-h-5  flex justify-end pt-1"><span>0</span>/100</div>
                             </div>


                             <div className="w-full h-20 mt-15">
                                <p className="text-[16px]">About Page</p>
                                <p className="text-gray-500">Personalize with images and more to paint more of yourself than 'Short bio'.</p>
                             </div>

                             <div className="flex w-full h-10 justify-end mt-5"> 
                                <button className="h-10 w-20 cursor-pointer rounded-3xl border mr-3">Cancel</button>
                                <button className="h-10 w-20 cursor-pointer rounded-3xl border bg-black text-white">Save</button>
                             </div>
                        </div>

                         
                    </div>
                </div>
            )}
        </div>
    )
}

export default Profiles