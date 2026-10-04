import {Link} from "react-router-dom";
import { useState, useEffect } from "react";
import Nav from '../components/Nav';


function Home() {
    const [openModal, setOpenModal] = useState(false);
    const[signupModal, setsignupModal] = useState(false);
    const[login, setLogin] = useState(false);



  useEffect(() => {
 

  if (signupModal) {
    setOpenModal(false);
    setLogin(false);
  }else if(login) {
    setOpenModal(false);
    setsignupModal(false);
  }
}, [signupModal, login]);

    return(
        <div>
            <Nav/>
            <div className="flex w-full bg-amber-50 h-[81vh]">

                <div className="w-[65%] h-[81vh] pt-40 px-30">
                    <h1 className="text-[120px] Header-writeup">Human <br /> stories & ideas</h1>
                    <p className="text-[30px] text-gray-900 mt-15">A place to read, write, and deepen your understanding</p>
                    <Link to='/'><button onClick={() => setOpenModal(true)}  className="min-w-50 h-12 px-3 mt-7 bg-black text-white text-[19px] rounded-3xl cursor-pointer">Start reading</button></Link>
                </div>

                <div className={`w-[35%] h-[81vh] bg-[url('/home1.webp')] bg-right bg-no-repeat bg-contain`}></div>
            </div>

            <div className="w-full h-[8.5vh] border-t bg-amber-50 flex items-center justify-center">
                <ul className="flex">
                    <li className="text-gray-500 cursor-pointer mr-5 text-[12.5px]">Help</li>
                     <li className="text-gray-500 cursor-pointer mr-5 text-[12.5px]">Status</li>
                    <li className="text-gray-500 cursor-pointer mr-5 text-[12.5px]">About</li>
                    <li className="text-gray-500 cursor-pointer mr-5 text-[12.5px]">Careers</li>
                    <li className="text-gray-500 cursor-pointer mr-5 text-[12.5px]">Press</li>
                    <li className="text-gray-500 cursor-pointer mr-5 text-[12.5px]">Blog</li>
                    <li className="text-gray-500 cursor-pointer mr-5 text-[12.5px]">Store</li>
                    <li className="text-gray-500 cursor-pointer mr-5 text-[12.5px]">Privacy</li>
                    <li className="text-gray-500 cursor-pointer mr-5 text-[12.5px]">Rules</li>
                    <li className="text-gray-500 cursor-pointer mr-5 text-[12.5px]">Terms</li>
                     <li className="text-gray-500 cursor-pointer mr-5 text-[12.5px]">Text to speech</li>
                </ul>
            </div>

           {openModal && (
                <div className={`fixed inset-0 z-50 flex items-center  bg-black/50 backdrop-blur-xs`}>
                    
                    <div className='w-[45%] h-[72vh] bg-white rounded-md ml-105'>
                        <img src="/cross.png" alt="" onClick={() => setOpenModal(false)} className="ml-165 mt-3 text-gray-400 hover:text-gray-700 size-14 font-bold cursor-pointer p-2"  />
                        <p className="text-center text-[35px] Join-Medium">Join Medium.</p>
                        <div className="w-full h-105">
                            <Link to='/'>
                                <div className="w-[50%] h-12 border cursor-pointer mt-3 rounded-[30px] ml-48 mb-5 flex">
                                    <div className="w-[15%] h-12 flex justify-center">
                                        <img src="/google.png" alt="" className="size-6 mt-3 " />
                                    </div>
                                    <div className="w-[75%] h-12 justify-center flex items-center text-[16px] Google">Sign up with Google</div>
                                </div>
                            </Link>

                            <Link to='/'>
                                <div className="w-[50%] h-12 border cursor-pointer rounded-[30px] ml-48 mb-5 flex">
                                    <div className="w-[15%] h-12 flex justify-center">
                                        <img src="/linkedin.png" alt="" className="size-6 mt-3 " />
                                    </div>
                                    <div className="w-[75%] h-12 justify-center flex items-center text-[16px] Google">Sign up with LinkedIn</div>
                                </div>
                            </Link>


                            <Link to='/'>
                                <div className="w-[50%] h-12 border cursor-pointer rounded-[30px] ml-48 mb-5 flex">
                                    <div className="w-[15%] h-12 flex justify-center">
                                        <img src="/facebook.png" alt="" className="size-6 mt-3 " />
                                    </div>
                                    <div className="w-[75%] h-12 justify-center flex items-center text-[16px] Google">Sign up with Facebook</div>
                                </div>
                            </Link>


                            <Link to='/'>
                                <div onClick={()=>setsignupModal(true)} className="w-[50%] h-12 border cursor-pointer rounded-[30px] ml-48 mb-5 flex">
                                    <div className="w-[15%] h-12 flex justify-center">
                                        <img src="/email.png" alt="" className="size-6 mt-3 " />
                                    </div>
                                    <div className="w-[75%] h-12 justify-center flex items-center text-[16px] Google">Sign up with email</div>
                                </div>
                            </Link> 

                           <div className=" flex w-full justify-center">
                                <input type="checkbox" className="size-3 mt-1.5 cursor-pointer mr-2" />
                                <p className="text-[15px]">Remember me for faster sign in</p> 
                            </div> 
                            <p className="text-[13px] text-center mt-7">Already have an account? <span onClick={()=>setLogin(true)} className="cursor-pointer underline">Sign in</span></p>
                            <p className="text-[12px] text-center mt-4 text-gray-500">By clicking "Sign up", you accept Medium's <span className="underline cursor-pointer">Terms of Service</span> and <span className="underline cursor-pointer">Privacy Policy</span>.</p>
                        </div>

                         
                    </div>
                </div>
            )}


             {signupModal && (
                <div className={`fixed inset-0 z-50 flex items-center  bg-black/50 backdrop-blur-xs `}>
                    
                    <div className='w-[45%] min-h-[75vh] pb-10 bg-white rounded-md ml-105'>
                        <img src="/cross.png" alt="" onClick={() => setsignupModal(false)} className="ml-165 mt-3 text-gray-400 hover:text-gray-700 size-14 font-bold cursor-pointer p-2"  />
                        <img src="/send email.png" alt=""  className="size-20 ml-80"/>
                        <p className="text-center text-[35px] Join-Medium">Sign up with email</p>
                        <form action="" className="w-[70%] ml-30 min-h-40">
                            <label htmlFor="First-Name">First Name</label>
                            <input type="text" placeholder="Enter your first name" className="w-full h-10 mb-4 outline-none bg-gray-200 px-4 rounded-lg"/>

                            <label htmlFor="Last-Name">Last Name</label>
                            <input type="text" placeholder="Enter your last name" className="w-full h-10 mb-4 outline-none bg-gray-200 px-4 rounded-lg"/>

                            <label htmlFor="Email">Email</label>
                            <input type="email" placeholder="Enter your email address" className="w-full h-10 mb-4 outline-none bg-gray-200 px-4 rounded-lg"/>

                            <label htmlFor="Contact">Contact</label>
                            <input type="number" placeholder="Enter your phone number" className="w-full h-10 mb-4 outline-none bg-gray-200 px-4 rounded-lg"/>

                            <label htmlFor="Password">Password</label>
                            <input type="password" placeholder="******" className="w-full h-10 mb-4 outline-none bg-gray-200 px-4 rounded-lg"/>
                        </form>

                        <button className="w-[70%] ml-30 h-10 mt-5 rounded-lg font-bold uppercase cursor-pointer bg-black text-white text-2xl text-center cursor pointer">Sign up</button>
                         
                    </div>
                </div>
            )}


             {login && (
                <div className={`fixed inset-0 z-50 flex items-center  bg-black/50 backdrop-blur-xs transition-opacity duration-3000 ease-in`}>
                    
                    <div className='w-[45%] min-h-[55vh] pb-10 bg-white rounded-md ml-105'>
                        <img src="/cross.png" alt="" onClick={() => setLogin(false)} className="ml-165 mt-3 text-gray-400 hover:text-gray-700 size-14 font-bold cursor-pointer p-2"  />
                        <p className="text-center text-[35px] Join-Medium">Welcome Back</p>
                        <form action="" className="w-[70%] ml-30 min-h-40">     
                            <label htmlFor="Email">Email</label>
                            <input type="email" placeholder="Enter your email address" className="w-full h-10 mb-4 outline-none bg-gray-200 px-4 rounded-lg"/>

                            <label htmlFor="Password">Password</label>
                            <input type="password" placeholder="******" className="w-full h-10 mb-4 outline-none bg-gray-200 px-4 rounded-lg"/>
                        </form>

                        <Link to="/landingpage"><button className="w-[70%] ml-30 h-10 mt-5 rounded-lg font-bold uppercase cursor-pointer bg-black text-white text-2xl text-center cursor pointer">Sign in</button></Link>
                         
                    </div>
                </div>
            )}
        </div>
    )
};
export default Home;
