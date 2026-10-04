import { Link } from "react-router-dom";
import { useState, useRef, useEffect   } from "react";
function LandingPage(){
    const [activeNav, setActiveNav] = useState(1);

    return(
       <div>
            <div className="w-full h-17 bg-white ">
                <nav className="w-full h-17 border-b border-gray-300 flex fixed bg-white  items-center px-6">
                    <img src="/menu.png" alt="" className="size-10 cursor-pointer" />
                    <Link to='/landingpage'><h1 className="text-[35px] Medium-font font-bold ml-5">Medium</h1></Link>

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
                                    <img src={activeNav===1? `/clicked-home.png` : `/home.png`} alt="" className="size-5" />
                                    <p className="ml-1">Home</p>
                                </div>
                        </Link>


                        <div className="w-full h-10 flex px-6 mt-3 items-center cursor-pointer hover:text-black text-gray-600">
                            <img src="/bookmark.png" alt="" className="size-5" />
                            <p className="ml-1">Library</p>
                        </div>


                        <Link to='/profiles'>
                                <div onClick={()=>setActiveNav(1)} className="w-full h-10 flex px-6 mt-3 items-center cursor-pointer hover:text-black text-gray-600">
                                    <img src={activeNav ===2? `/people.png` : `/clicked--user.png`} alt="" className="size-5" />
                                    <p className="ml-1">Profile</p>
                                </div>
                        </Link>


                        <div className="w-full h-10 flex px-6 mt-3 items-center cursor-pointer hover:text-black text-gray-600">
                            <img src={`/file.png`} alt="" className="size-5" />
                            <p className="ml-1">Stories</p>
                        </div>


                        <div className="w-full h-10 flex px-6 mt-3  items-center cursor-pointer  hover:text-black text-gray-600">
                            <img src="/stats.png" alt="" className="size-5" />
                            <p className="ml-1">Stats</p>
                        </div>


                        <div className="w-full h-20 flex px-6 border-t border-b border-gray-300 mt-3 hover:text-black text-gray-600  items-center cursor-pointer">
                            <img src="/tic-tac-toe.png" alt="" className="size-5" />
                            <p className="ml-1">Games</p>
                        </div>


                        <div className="w-full h-10 flex px-6 mt-5  items-center hover:text-black text-gray-600  cursor-pointer">
                            <img src="/users.png" alt="" className="size-5" />
                            <p className="ml-1">Following</p>
                        </div>


                        <div className="w-full h-10 flex px-6 mt-5 items-center hover:text-black text-gray-600 cursor-pointer">
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

                        <div className="w-[75%] min-h-[85vh] justify-center flex ">

                            <div className="w-[80%] min-h-[10vh] ">
                                <div className="w-full h-[7vh] border-gray-200 mt-5">
                                    <button className="w-15 h-13.5 border-b cursor-pointer text-gray-600 hover:text-black">For you</button>
                                    <button className="w-15 h-13.5 ml-3 border-b cursor-pointer text-gray-600 hover:text-black">Featured</button>
                                </div>

                                <Link to='/singlepost'>
                                    <div className="w-full min-h-20 border-gray-200 border-t flex justify-between border-b py-10">
                                        <div className="w-[65%] h-full">
                                            <div className="flex">
                                            <div className="size-7 rounded-[50%] border border-gray-500 mr-2"></div>
                                            <div className="flex"><p className="hover:underline text-sm mt-1">Jud Brewer MD PhD.</p><span className="text-gray-500 ml-2">June 13</span></div>
                                        </div>

                                        <div>
                                            <h1 className="my-5 post-heading">Why Did You Stop Doing The Things You Loved?</h1>
                                            <p className="mb-5 text-gray-500 text-lg post-sub">Are you motivated loreminstrinsically or extrinsically or both?</p>                             
                                        </div>

                                        <div className="w-[90%] h-8 flex  justify-between">
                                            <div className="w-[40%] h-8  flex justify-between items-center">
                                                <img src="/star.png" alt="" className="size-4" />
                                                <div className="flex"><img src="/wave-hand.png" alt="" className="cursor-pointer size-5 mr-1" /> <p className="text-gray-900 text-sm">3.3K</p></div>
                                                <div className="flex"><img src="/speech-bubble.png" alt="" className="cursor-pointer size-4 mr-1 mt-0.5" /> <p className="text-gray-900 text-sm">105</p></div>
                                                <div className="flex"><img src="/exchange.png" alt="" className="cursor-pointer size-4 mt-0.5 mr-1" /> <p className="text-gray-900 text-sm">238</p></div>
                                            </div>

                                            <div className="w-[25%] h-8  flex items-center justify-between">
                                                <img src="/dislike.png" alt="" className="cursor-pointer size-6 mr-1 mt-0.5" />
                                                <img src="/save-instagram.png" alt="" className="cursor-pointer size-6 mr-1 mt-0.5" />
                                                <img src="/menu-dots.png" alt="" className="cursor-pointer size-6 mr-1 mt-0.5" />
                                            </div>
                                        </div>
                                        </div>
                                        
                                        <div className="w-[25%] h-35 border mt-10">image div</div>
                                    </div>

                                </Link>
                            </div>

                        </div>

                        {/* right  */}
                        {/* <div className="w-[25%]">
                            <div ref={rightRef} className={`w-full bg-white ${rightFixed? "fixed right-0 bottom-0" : ""}`}>
                            <div className={`w-full pt-10 pb-5 border-b border-gray-200 border-l  pl-10`}>
                                <p className="text-lg font-semibold mb-5">Staff Picks</p>

                                <div className="flex">
                                    <div className="size-5  rounded-[50%] border"></div>
                                    <p className="ml-1 text-sm mb-3">George Joseph</p>
                                </div>

                                <p className="font-bold text-[20px]">Let's.</p>
                                <p className="text-[14px] text-gray-500">Sept 13</p>
                                <div className="flex mt-3">
                                    <div className="size-5  rounded-[50%] border"></div>
                                    <p className="text-sm">In ZORA by Malia Niguel Hoskin, Ph.D</p>
                                </div>

                                <h1 className="text-md font-bold mt-3">Nikole Hannah-Jones Is Asking the Question Black parents know too well: What do we sacrifice? </h1>

                                <p className="text-[14px] text-gray-500 mt-5">4d ago</p>

                                <div className="flex mt-3">
                                    <div className="size-5  rounded-[50%] border"></div>
                                    <p className="text-sm">In Zenit by Json McBride</p>
                                </div>

                                <h1 className="text-md font-bold mt-3">What Makes A Place Scared? </h1>

                                <p className="text-[14px] text-gray-500 mt-5">6d ago</p>

                                <p className="cursor-pointer hover:underline text-gray-500 text-sm mt-5">See full list</p>

                                <p className="font-bold text-[18px]">Trending On Medium</p>

                                <div className="flex mt-3">
                                    <div className="size-5  rounded-[50%] border"></div>
                                    <p className="text-sm">Netflix Technnology Blog</p>
                                </div>

                                <h1 className="text-lg font-bold mt-3">Netflix Stratum Media Processing: Automated Container Right-Sizing</h1>

                                <p className="text-[14px] text-gray-500 mt-5">1d ago</p>

                                <div className="flex mt-3">
                                    <div className="size-5  rounded-[50%] border"></div>
                                    <p className="text-sm">In UX Planet by Nick Babich</p>
                                </div>

                                <h1 className="text-lg font-bold mt-3">I Tested Opus 5.5 at Every Effort Level for UI Design</h1>

                                <p className="text-[14px] text-gray-500 mt-5">1d ago</p>


                                <div className="flex mt-3">
                                    <div className="size-5  rounded-[50%] border"></div>
                                    <p className="text-sm">In Realworld AI Use Cases by Chris Dunlop</p>
                                </div>

                                <h1 className="text-lg font-bold mt-3">Jev Explained Through Real Examples</h1>

                                <p className="text-[14px] text-gray-500 mt-5">1d ago</p>

                                <p className="cursor-pointer hover:underline text-gray-500 text-sm mt-5">See all trending full stories</p>

                            </div>
                        </div>
                        </div> */}
                        <div className="w-[25%]">
                            <div className={`w-full bg-white`}>
                                <div className={`w-full pt-10 pb-5 border-b border-gray-200 border-l  pl-7`}>
                                    <p className="text-lg font-semibold mb-5">Staff Picks</p>

                                    <div className="flex">
                                        <div className="size-5  rounded-[50%] border"></div>
                                        <p className="ml-1 text-sm mb-3">George Joseph</p>
                                    </div>

                                    <p className="font-bold text-[20px]">Let's.</p>
                                    <p className="text-[14px] text-gray-500">Sept 13</p>
                                    <div className="flex mt-3">
                                        <div className="size-5  rounded-[50%] border"></div>
                                        <p className="text-sm ml-1">In ZORA by Malia Niguel Hoskin, Ph.D</p>
                                    </div>

                                    <h1 className="text-md font-bold mt-3">Nikole Hannah-Jones Is Asking the Question Black parents know too well: What do we sacrifice? </h1>

                                    <p className="text-[14px] text-gray-500 mt-5">4d ago</p>

                                    <div className="flex mt-3">
                                        <div className="size-5  rounded-[50%] border"></div>
                                        <p className="text-sm ml-1">In Zenit by Json McBride</p>
                                    </div>

                                    <h1 className="text-md font-bold mt-3">What Makes A Place Scared? </h1>

                                    <p className="text-[14px] text-gray-500 mt-5">6d ago</p>

                                    <p className="cursor-pointer hover:underline text-gray-500 text-sm mt-5">See full list</p>

                                    <p className="font-bold text-[18px]">Trending On Medium</p>

                                    <div className="flex mt-3">
                                        <div className="size-5  rounded-[50%] border"></div>
                                        <p className="text-sm ml-1">Netflix Technnology Blog</p>
                                    </div>

                                    <h1 className="text-lg font-bold mt-3">Netflix Stratum Media Processing: Automated Container Right-Sizing</h1>

                                    <p className="text-[14px] text-gray-500 mt-5">1d ago</p>

                                    <div className="flex mt-3">
                                        <div className="size-5  rounded-[50%] border"></div>
                                        <p className="text-sm ml-1">In UX Planet by Nick Babich</p>
                                    </div>

                                    <h1 className="text-lg font-bold mt-3">I Tested Opus 5.5 at Every Effort Level for UI Design</h1>

                                    <p className="text-[14px] text-gray-500 mt-5">1d ago</p>


                                    <div className="flex mt-3">
                                        <div className="size-5  rounded-[50%] border"></div>
                                        <p className="text-sm ml-1">In Realworld AI Use Cases by Chris Dunlop</p>
                                    </div>

                                    <h1 className="text-lg font-bold mt-3">Jev Explained Through Real Examples</h1>

                                    <p className="text-[14px] text-gray-500 mt-5">1d ago</p>

                                    <p className="cursor-pointer hover:underline text-gray-500 text-sm mt-5">See all trending full stories</p>

                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    )
}
export default LandingPage