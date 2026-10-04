import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
function SinglePost(){
    const [openClapModal, setOpenClapModal] = useState(false);
    const [openCommentModal, setOpenCommentModal] = useState(false);
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
                    <div className="w-full h-13 bg-yellow-400 border-b border-t flex items-center justify-center">
                        <div className="min-w-30 h-8 bg-white rounded-lg flex items-center px-2 mr-3">Welcome Offer</div>
                        <p>Access to everything. Now 30% off. <span className="font-bold underline">Upgrade Now</span></p>
                    </div>

                    {/* midlle */}
                    <div className="w-full min-h-[85vh] mt-10 ">

                        <div className="w-full min-h-[57vh]  px-30 ">
                            <div className="w-full min-h-50  flex">
                                <div className="w-[25%] min-h-50  px-10">
                                    <div className="size-15 border rounded-[50%]"></div>
                                    <p className="font-semibold text-lg mt-2">Y.L Wolfe</p>
                                    <p className="text-gray-500 text-md">Not married. Not a mother. Middle aged. The kind of woman who lives in a house on chicken legs. \\ hello@ylwolfe.com</p>

                                    <p className="text-md underline cursor-pointer mt-2">Follow Writer</p>
                                </div>


                                <div className="w-[75%] min-h-50  px-10">
                                    <div className="w-45 p-2 flex justify-between h-10 border rounded-md border-gray-300">
                                        <img src="/star.png" alt="" className="size-5" />
                                        <p>Member-only story</p>
                                    </div>

                                    <div className="w-150 h-7 flex justify-between mt-5">
                                        <div className="border  border-gray-500 rounded-xl  min-w-25 h-7 flex">
                                            <div className="w-[70%] h-6.5 border-r border-gray-500 text-center">Men</div>

                                            <div className="w-[30%] cursor-pointer   h-6.5 font-bold text-xl flex items-center pl-1 text-gray-500">+</div>
                                        </div>

                                        <div className="border  border-gray-500 rounded-xl  min-w-25 h-7 flex">
                                            <div className="w-[70%] h-6.5 border-r border-gray-500 text-center">Women</div>

                                            <div className="w-[30%] cursor-pointer   h-6.5 font-bold text-xl flex items-center pl-1 text-gray-500">+</div>
                                        </div>

                                        <div className="border  border-gray-500 rounded-xl  min-w-25 h-7 flex">
                                            <div className="w-[70%] h-6.5 border-r border-gray-500 text-center">Crime</div>

                                            <div className="w-[30%] cursor-pointer   h-6.5 font-bold text-xl flex items-center pl-1 text-gray-500">+</div>
                                        </div>

                                        <div className="border  border-gray-500 rounded-xl  min-w-25 h-7 flex">
                                            <div className="w-[70%] h-6.5 border-r border-gray-500 text-center">Internet</div>

                                            <div className="w-[30%] cursor-pointer   h-6.5 font-bold text-xl flex items-center pl-1 text-gray-500">+</div>
                                        </div>

                                        <div className="border  border-gray-500 rounded-xl  min-w-25 h-7 flex">
                                            <div className="min-w-[70%] h-6.5 border-r border-gray-500 text-center px-1">Feminism</div>

                                            <div className="w-[30%] cursor-pointer   h-6.5 font-bold text-xl flex items-center pl-1 text-gray-500">+</div>
                                        </div>
                                    </div>

                                    <h1 className="postName mt-5">Men on the Internet Do This All the Time, but Don’t Realize It’s a Crime</h1>

                                    <p className="postSub text-gray-500">The law is catching up with technology…and men are about to find out</p>

                                    <div className="w-[50%] h-10 mt-10 flex justify-between items-center">
                                        <div className="size-10 border rounded-[50%]"></div>
                                        <p>Y.L Wolfe</p>
                                        <button className="rounded-xl min-h-6 w-18 border p-1 cursor-pointer">Follow</button>
                                        <p className="text-gray-500 text-sm">7 min read .</p>
                                        <p className="text-gray-500 text-sm">Aug 7, 2026</p>
                                    </div>

                                {/* base icons  */}

                                    <div className="w-full h-10 border-t border-b border-gray-500 mt-12 flex ">
                                        <div className="w-full h-8 flex  justify-between">
                                            <div className="w-[30%] h-8  flex justify-between items-center ">
                                                <div className="flex"><img src="/hands-clapping.png" alt="" className="size-5 cursor-pointer mr-1" /> <p onClick={()=>setOpenClapModal(true)} className="text-gray-500 text-sm cursor-pointer hover:text-black">3.3K</p></div>
                                                <div className="flex"><img src="/speech-bubble.png" alt="" className="size-4 cursor-pointer mr-1 mt-0.5" /> <p onClick={()=>setOpenCommentModal(true)} className="text-gray-500 text-sm cursor-pointer hover:text-black">105</p></div>
                                                <div className="flex"><img src="/exchange.png" alt="" className="size-4 cursor-pointer mt-0.5 mr-1" /> <p className="text-gray-500 text-sm cursor-pointer hover:text-black">238</p></div>
                                            </div>

                                            <div className="w-[25%] h-8  flex items-center justify-between ">
                                                <img src="/save-instagram.png" alt="" className="size-6 cursor-pointer mr-1 mt-0.5" />
                                                <img src="/play.png" alt="" className="size-6 cursor-pointer mr-1 mt-0.5" />
                                                <img src="/share.png" alt="" className="size-6 cursor-pointer mr-1 mt-0.5" />
                                                <img src="/menu-dots.png" alt="" className="size-6 cursor-pointer mr-1 mt-0.5" />
                                            </div>
                                        </div>
                                    </div>

                                    
                                </div>
                            </div>
                        </div>


                        <div className="w-full min-h-20  mt-2">
                            <div className="w-[80%] h-180 border ml-33">image div</div>

                            <div className="w-full min-h-50 flex justify-center">
                                <div className="post-content w-[50%] min-h-50 border mt-15 text-left">
                                    Lorem ipsum dolor sit amet consecteturquaerat dolorem, nulla animi aperiam nemo nostrum voluptate eum nam labore nisi alias quis pariatur odit neque! Omnis incidunt esse illum recusandae expedita ad quidem!
                                </div>
                            </div>


                            <div className="w-full h-10 flex justify-center">
                                <div className="w-[50%] h-10 border-t border-b border-gray-500 mt-12 flex ">
                                        <div className="w-full h-8 flex  justify-between">
                                            <div className="w-[30%] h-8  flex justify-between items-center ">
                                                <div className="flex"><img src="/hands-clapping.png" alt="" className="size-5 cursor-pointer mr-1" /> <p className="text-gray-900 text-sm">3.3K</p></div>
                                                <div className="flex"><img src="/speech-bubble.png" alt="" className="size-4 cursor-pointer mr-1 mt-0.5" /> <p className="text-gray-900 text-sm">105</p></div>
                                                <div className="flex"><img src="/exchange.png" alt="" className="size-4 cursor-pointer mt-0.5 mr-1" /> <p className="text-gray-900 text-sm">238</p></div>
                                            </div>

                                            <div className="w-[25%] h-8  flex items-center justify-between ">
                                                <img src="/save-instagram.png" alt="" className="size-6 cursor-pointer mr-1 mt-0.5" />
                                                <img src="/play.png" alt="" className="size-6 cursor-pointer mr-1 mt-0.5" />
                                                <img src="/share.png" alt="" className="size-6 cursor-pointer mr-1 mt-0.5" />
                                                <img src="/menu-dots.png" alt="" className="size-6 cursor-pointer mr-1 mt-0.5" />
                                            </div>
                                        </div>
                            </div>
                            </div>
                        </div>

                        
                   

                         <div className="w-full min-h-30 justify-center flex mt-20">
                                <div className="w-[50%] h-100 rounded-2xl bg-amber-50 py-5">
                                    <div className="w-full min-h-10 justify-center flex">
                                        <div className="size-15 rounded-[50%] border"></div>
                                    </div>

                                    <p className="text-2xl font-bold text-center mt-2">Written by Y.L Wolfe</p>


                                    <div className="w-full min-h-10 justify-center flex mt-3">
                                        <p><span>130k</span> followers .</p>
                                        <p className="ml-5"><span>794</span> following</p>
                                    </div>


                                    <div className="w-full min-h-10 justify-center flex mt-3 px-35">
                                        <p className="text-center">Not married. Not a mother. Middle aged. The kind of woman who lives in a house on chicken legs. \\ hello@ylwolfe.com</p>
                                    </div>

                                    <div className="w-full min-h-10 flex justify-center">
                                        <button className="w-100 cursor-pointer mt-5 h-10 rounded-3xl bg-black text-white">Follow</button>
                                    </div>

                                    <div className="w-full min-h-10 flex justify-center">
                                        <button className="w-100 cursor-pointer mt-5 h-10 rounded-3xl border">Buy me a coffee</button>
                                    </div>
                                </div>
                         </div>

                         <div className="w-full min-h-10 border-t border-gray-300 mt-15 flex justify-center">
                                <div className="w-[50%] min-h-10 ">
                                    <div className="w-full h-10 flex justify-between items-center">
                                        <p className="text-3xl font-semibold">Responses (<span>292</span>)</p>
                                        <img src="/insurance.png" alt="" className="size-5" />
                                    </div>

                                    <div className="flex mt-3">
                                        <div className="rounded-[50%] size-7 mr-2 border"></div>
                                        <p>Onuegbusuccess</p>
                                    </div>

                                    
                                    <div className="w-full min-h-30 outline-none mt-3 rounded-md bg-gray-200 px-5 mb-10 py-2">
                                        <textarea name="" id="" placeholder="What are your thoughts?" className="w-full h-20 outline-none rounded-md bg-gray-200 px-5 "></textarea>

                                        <div className="flex justify-between w-full h-10">
                                                <div className="w-25 h-10 justify-between flex  items-center">
                                                    <img src="/bold-text-option.png" alt="" className="size-5 cursor-pointer" />
                                                     <img src="/italic.png" alt="" className="size-5 cursor-pointer" />
                                                      <img src="/link.png" alt="" className="size-5 cursor-pointer" />
                                                </div>

                                                <div className="flex">
                                                    <button className="rounded-3xl w-20 min-h-9 cursor-pointer mr-3 p-1">Cancel</button>
                                                     <button className="rounded-3xl w-20 min-h-9 cursor-pointer bg-black text-white p-1">Resposnd</button>
                                                </div>
                                        </div>
                                    </div>

                                    <div className="w-full min-h-30 border-t border-b border-gray-400 py-4">
                                        <div className="flex w-full h-10 items-center">
                                            <div className="size-10 rounded-[50%] border"></div>
                                            <div className="w-[89%] h-10 ml-2">
                                                <div><p>Lost Factal</p></div>
                                                <div><p className="text-gray-500">Aug 7</p></div>
                                            </div>
                                            <img src="/menu-dots.png" alt="" className="size-8 cursor-pointer" />
                                        </div>

                                        <p className="mt-5">It is also an infringement on your right to self-expression. Disagreeing with you is their right, but stalking and trying to intimidate you is not.</p>

                                        <div className="w-55 h-10  mt-5">
                                            <div className="w-full h-8  flex justify-between items-center ">
                                                <div className="flex"><img src="/hands-clapping.png" alt="" className="size-5 cursor-pointer mr-1" /> <p className="text-gray-900 text-sm">3.3K</p></div>
                                                <div className="flex"><img src="/speech-bubble.png" alt="" className="size-4 cursor-pointer mr-1 mt-0.5" /> <p className="text-gray-900 text-sm">105 replies</p></div>
                                                <div className="flex"> <p className="text-gray-900 text-sm underline cursor-pointer">Reply</p></div>
                                            </div>
                                        </div>
                                    </div>


                                    
                                    
                                    
                                </div>
                         </div>

                         <button className="w-40 h-10 rounded-3xl border ml-83 mt-10">See all responses</button>

                         <div className="w-full min-h-10 mt-15 flex justify-center">
                            <div className="w-[50%] min-h-10">
                                <p className="text-[25px] font-semibold mb-8">More from <span>Y.L Wolfe</span></p>
                                
                                <div className="w-full min-h-20 grid grid-cols-2 gap-10">
                                    <Link to='/singlepost'>
                                            <div className="border min-h-70 mb-7">
                                        <div className="w-full h-45 border-b">image div</div>
                                        <div className="w-full min-h-7 flex  py-5 flex items-center">
                                            <div className="rounded-full size-8 border"></div>
                                            <p className="ml-2 text-sm">Y.L Wolfe</p>
                                            <p className="text-sm text-gray-500 ml-2">Jun 5</p>
                                        </div>
                                        <p className="text-xl font-bold">Why it's Okay for Men to Want a Skinny Woman ...</p>
                                        <p className="text-md text-gray-700 pt-2">...but not okay for a woman to want a tall man</p>
                                       <div className="full h-8 flex  justify-between mt-10">
                                            <div className="w-[60%] h-8  flex justify-between items-center">
                                                <img src="/star.png" alt="" className="size-4" />
                                                <div className="flex"><img src="/wave-hand.png" alt="" className="cursor-pointer size-5 mr-1" /> <p className="text-gray-900 text-sm">3.3K</p></div>
                                                <div className="flex"><img src="/speech-bubble.png" alt="" className="cursor-pointer size-4 mr-1 mt-0.5" /> <p className="text-gray-900 text-sm">105</p></div>
                                                <div className="flex"><img src="/exchange.png" alt="" className="cursor-pointer size-4 mt-0.5 mr-1" /> <p className="text-gray-900 text-sm">238</p></div>
                                            </div>

                                            <div className="w-[22%] h-8 flex items-center justify-between">
                                                <img src="/dislike.png" alt="" className="cursor-pointer size-6 mr-1 mt-0.5" />
                                                <img src="/menu-dots.png" alt="" className="cursor-pointer size-6 mr-1 mt-0.5" />
                                            </div>
                                        </div>
                                    </div>  
                                    </Link>  
                                                                    
                                </div>

                                <button className="min-w-40 h-10 rounded-3xl border mt-10 px-4 cursor-pointer py-2">See all from Y.L Wolfe</button>

                            </div>
                         </div>


                         <div className="w-full min-h-10 border-t border-gray-300 mt-30 flex justify-center">
                            <div className="w-[50%] min-h-10 border-b border-gray-300">
                                <p className="text-[25px] font-semibold my-10">Recommended from Medium</p>
                                
                                <div className="w-full min-h-20 grid grid-cols-2 gap-10">
                                    <Link to='/singlepost'>
                                            <div className="border min-h-70 mb-7">
                                        <div className="w-full h-45 border-b">image div</div>
                                        <div className="w-full min-h-7 flex  py-5 flex items-center">
                                            <div className="rounded-full size-8 border"></div>
                                            <p className="ml-2 text-sm">Y.L Wolfe</p>
                                            <p className="text-sm text-gray-500 ml-2">Jun 5</p>
                                        </div>
                                        <p className="text-xl font-bold">Why it's Okay for Men to Want a Skinny Woman ...</p>
                                        <p className="text-md text-gray-700 pt-2">...but not okay for a woman to want a tall man</p>
                                       <div className="full h-8 flex  justify-between mt-10">
                                            <div className="w-[60%] h-8  flex justify-between items-center">
                                                <img src="/star.png" alt="" className="size-4" />
                                                <div className="flex"><img src="/wave-hand.png" alt="" className="cursor-pointer size-5 mr-1" /> <p className="text-gray-900 text-sm">3.3K</p></div>
                                                <div className="flex"><img src="/speech-bubble.png" alt="" className="cursor-pointer size-4 mr-1 mt-0.5" /> <p className="text-gray-900 text-sm">105</p></div>
                                                <div className="flex"><img src="/exchange.png" alt="" className="cursor-pointer size-4 mt-0.5 mr-1" /> <p className="text-gray-900 text-sm">238</p></div>
                                            </div>

                                            <div className="w-[22%] h-8 flex items-center justify-between">
                                                <img src="/dislike.png" alt="" className="cursor-pointer size-6 mr-1 mt-0.5" />
                                                <img src="/menu-dots.png" alt="" className="cursor-pointer size-6 mr-1 mt-0.5" />
                                            </div>
                                        </div>
                                    </div>  
                                    </Link>  
                                                                    
                                </div>

                                

                            </div>
                         </div>
                        
                        <button className="min-w-40 h-10 rounded-3xl border mt-10 px-4 cursor-pointer py-2 ml-83">See all Recommendations</button>
                        
                        <div className="w-full min-h-10 py-5 border-t border-gray-300 mt-30 py-6 px-100">
                                <ul className="flex">
                                    <li className="text-sm text-gray-500 cursor-pointer ml-3">Help</li>
                                    <li className="text-sm text-gray-500 cursor-pointer ml-3">Status</li>
                                    <li className="text-sm text-gray-500 cursor-pointer ml-3">Careers</li>
                                    <li className="text-sm text-gray-500 cursor-pointer ml-3">Press</li>
                                    <li className="text-sm text-gray-500 cursor-pointer ml-3">Blog</li>
                                    <li className="text-sm text-gray-500 cursor-pointer ml-3">Store</li>
                                    <li className="text-sm text-gray-500 cursor-pointer ml-3">Privacy</li>
                                    <li className="text-sm text-gray-500 cursor-pointer ml-3">Rules</li>
                                    <li className="text-sm text-gray-500 cursor-pointer ml-3">Terms</li>
                                    <li className="text-sm text-gray-500 cursor-pointer ml-3">Text to speech</li>
                                </ul>
                        </div>
                    </div>
                </div>
            </div>

            {openClapModal && (
                <div className={`fixed inset-0 z-50 flex items-center  bg-black/50 backdrop-blur-xs transition-opacity duration-3000 ${openClapModal? "opacity-100":"opacity-0"} `}>
                    
                    <div className='w-[40%] h-[72vh] bg-white rounded-md ml-105'>
                        <img src="/cancel.png" alt="" onClick={() => setOpenClapModal(false)} className="ml-147 mt-5 text-gray-400 hover:text-gray-700 size-5 font-bold cursor-pointer"  />
                        <p className="text-center text-[20px] claps text-gray-700 font-semibold Join-Medium"><span>13,220</span> claps from from  <span>1,046</span> people</p>                      
                        
                        <div className="w-full min-h-50 flex justify-center mt-10">
                            <div className="w-[85%] h-100 overflow-y-scroll">
                                 <div className="w-full min-h-20 flex">
                                    <div className="flex">
                                        <div className="rounded-full size-13 border">
                                            <div className="size-6 mt-8 ml-8 bg-green-600 rounded-full pt-1">
                                            <img src="/clap-hands.png" className="size-4 ml-1.5" alt="" />
                                        </div>
                                        </div>
                                        

                                    </div>

                                    <p className="font-semibold text-md ml-2">Onuegbusucccess</p>
                                </div>

                                <div className="w-full min-h-20 flex">
                                    <div className="flex">
                                        <div className="rounded-full size-13 border">
                                            <div className="size-6 mt-8 ml-8 bg-green-600 rounded-full pt-1 ">
                                            <img src="/clap-hands.png" className="size-4 ml-1.5 " alt="" />
                                        </div>
                                        </div>
                                        

                                    </div>

                                  <div className=" w-80  ml-1">
                                      <p className="font-semibold text-md ml-2">Onuegbusucccess</p>
                                    <p className="text-sm ml-2 text-gray-500">Enterprise Architect, Telecommunications industry</p>
                                  </div>

                                  <button className="rounded-3xl w-20 h-9 cursor-pointer ml-18 border">Follow</button>

                                </div>



                                
                            </div>
                        </div>
                         
                    </div>
                </div>
            )}


             {openCommentModal && (
                <div className={`fixed inset-0 z-50 flex items-right justify-end bg-white/75  transition-opacity duration-3000 ${openCommentModal? "opacity-100":"opacity-0"} `}>
                    
                    <div className={`w-[25%] h-[100vh] bg-white shadow-lg px-5 overflow-y-scroll  transition-transform duration-[800ms] ease-out ${openCommentModal ? "translate-x-0" : "translate-x-full"}`}>
                        <div className="w-full h-10 flex  pt-5 justify-between">
                            <p className="text-center text-[20px] claps text-gray-700 font-semibold Join-Medium">Responses</p> 
                             <div className="flex">
                                <img src="/insurance.png" alt="" className="size-4 mr-5" />
                                <img src="/cancel.png" alt="" onClick={() => setOpenCommentModal(false)} className="  text-gray-400 hover:text-gray-700 size-4 font-bold cursor-pointer"/>
                            </div>                       
                        </div>                     
                                                
                         <div className="w-full min-h-30 outline-none mt-3 rounded-md bg-gray-200 px-5 mb-10 mt-5 py-4">
                                        <textarea name="" id="" placeholder="What are your thoughts?" className="w-full h-20 outline-none rounded-md bg-gray-200 px-3 "></textarea>

                                        <div className="flex justify-between w-full h-10">
                                                <div className="w-25 h-10 justify-between flex  items-center">
                                                    <img src="/bold-text-option.png" alt="" className="size-5 cursor-pointer" />
                                                     <img src="/italic.png" alt="" className="size-5 cursor-pointer" />
                                                      <img src="/link.png" alt="" className="size-5 cursor-pointer" />
                                                </div>

                                                <div className="flex">
                                                    <button className="rounded-3xl w-20 min-h-9 cursor-pointer mr-3 p-1">Cancel</button>
                                                     <button className="rounded-3xl min-w-20 min-h-9 cursor-pointer bg-gray-300 text-white p-2">Respond</button>
                                                </div>
                                        </div>
                        </div>

                        <div className="flex cursor-pointer">
                            <p className="uppercase font-bold text-md">Most Relevant</p>
                            <img src="/down-arrow.png" alt="" className="size-4 mt-1 ml-3" />
                        </div>

                        <div className="w-full min-h-30 border-t border-b border-gray-300 py-4 mt-10">
                                        <div className="flex w-full h-10 items-center">
                                            <div className="size-10 rounded-[50%] border"></div>
                                            <div className="w-[89%] h-10 ml-2">
                                                <div><p>Lost Factal</p></div>
                                                <div><p className="text-gray-500">Aug 7</p></div>
                                            </div>
                                            <img src="/menu-dots.png" alt="" className="size-8 cursor-pointer" />
                                        </div>

                                        <p className="mt-5">It is also an infringement on your right to self-expression. Disagreeing with you is their right, but stalking and trying to intimidate you is not.</p>

                                        <div className="w-55 h-10  mt-5">
                                            <div className="w-full h-8  flex justify-between items-center ">
                                                <div className="flex"><img src="/hands-clapping.png" alt="" className="size-5 cursor-pointer mr-1" /> <p className="text-gray-900 text-sm">3.3K</p></div>
                                                <div className="flex"><img src="/speech-bubble.png" alt="" className="size-4 cursor-pointer mr-1 mt-0.5" /> <p className="text-gray-900 text-sm">105 replies</p></div>
                                                <div className="flex"> <p className="text-gray-900 text-sm underline cursor-pointer">Reply</p></div>
                                            </div>
                                        </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
export default SinglePost