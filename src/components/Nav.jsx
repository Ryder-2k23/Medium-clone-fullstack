import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
function Nav() {
    const [openModal, setOpenModal] = useState(false);
    const [signupModal, setsignupModal] = useState(false);
    const [login, setLogin] = useState(false);
    const [registerData, setRegisterData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        contact: "",
        password: ""
    });
    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    });

    const navigate = useNavigate();
    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("https://backendblog-1kjf.onrender.com/medium/auth/user-signUp", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(registerData)
            })

            const data = await response.json();
            if (response.ok) {
                alert("Registration successful!");
                setLogin(true);
                setsignupModal(false);
            } else {
                alert(data.message || "Registration failed.");
            }
            console.log(data);
        } catch (error) {
            console.error("Registration error: ", error);

        }
    };


    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(
                "https://backendblog-1kjf.onrender.com/medium/auth/user-login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(loginData)
                }
            );

            const data = await response.json();

            if (response.ok) {
                alert("Login successful!");
                console.log(data);

                localStorage.setItem("accessToken", data.data.accessToken);
                localStorage.setItem("userId", data.data.user.id);
                navigate("/landingpage");
            } else {
                alert(data.message || "Login failed.");
            }

        } catch (error) {
            console.error("Login error:", error);
        }
    };

    useEffect(() => {


        if (signupModal) {
            setOpenModal(false);
            setLogin(false);
        } else if (login) {
            setOpenModal(false);
            setsignupModal(false);
        }
    }, [signupModal, login]);

    // return (
    //     <div className=''>
    //         <nav className="w-full h-20 bg-amber-50 border-b flex pl-50 items-center">
    //             <Link to='/'><h1 className="text-[35px] Medium-font font-bold">Medium</h1></Link>

    //             <div className='flex w-80 h-20 items-center justify-between ml-140'>
    //                 <p className="text-[15px]">Our story</p>
    //                 <p className="text-[15px]">Membership</p>
    //                 <p className="text-[15px]">Write</p>
    //                 <p className="text-[15px]">Sign in</p>
    //             </div>

    //             <Link to='/'><button onClick={() => setOpenModal(true)} className="w-28 h-9 ml-10 bg-black text-white text-[17px] rounded-3xl cursor-pointer">Get started</button></Link>
    //         </nav>

    //         {openModal && (
    //             <div className={`fixed inset-0 z-50 flex items-center  bg-black/50 backdrop-blur-xs`}>

    //                 <div className='w-[45%] h-[72vh] bg-white rounded-md ml-105'>
    //                     <img src="/cross.png" alt="" onClick={() => setOpenModal(false)} className="ml-165 mt-3 text-gray-400 hover:text-gray-700 size-14 font-bold cursor-pointer p-2" />
    //                     <p className="text-center text-[35px] Join-Medium">Join Medium.</p>
    //                     <div className="w-full h-105">
    //                         <Link to='/'>
    //                             <div className="w-[50%] h-12 border cursor-pointer mt-3 rounded-[30px] ml-48 mb-5 flex">
    //                                 <div className="w-[15%] h-12 flex justify-center">
    //                                     <img src="/google.png" alt="" className="size-6 mt-3 " />
    //                                 </div>
    //                                 <div className="w-[75%] h-12 justify-center flex items-center text-[16px] Google">Sign up with Google</div>
    //                             </div>
    //                         </Link>

    //                         <Link to='/'>
    //                             <div className="w-[50%] h-12 border cursor-pointer rounded-[30px] ml-48 mb-5 flex">
    //                                 <div className="w-[15%] h-12 flex justify-center">
    //                                     <img src="/linkedin.png" alt="" className="size-6 mt-3 " />
    //                                 </div>
    //                                 <div className="w-[75%] h-12 justify-center flex items-center text-[16px] Google">Sign up with LinkedIn</div>
    //                             </div>
    //                         </Link>


    //                         <Link to='/'>
    //                             <div className="w-[50%] h-12 border cursor-pointer rounded-[30px] ml-48 mb-5 flex">
    //                                 <div className="w-[15%] h-12 flex justify-center">
    //                                     <img src="/facebook.png" alt="" className="size-6 mt-3 " />
    //                                 </div>
    //                                 <div className="w-[75%] h-12 justify-center flex items-center text-[16px] Google">Sign up with Facebook</div>
    //                             </div>
    //                         </Link>


    //                         <Link to='/'>
    //                             <div onClick={() => setsignupModal(true)} className="w-[50%] h-12 border cursor-pointer rounded-[30px] ml-48 mb-5 flex">
    //                                 <div className="w-[15%] h-12 flex justify-center">
    //                                     <img src="/email.png" alt="" className="size-6 mt-3 " />
    //                                 </div>
    //                                 <div className="w-[75%] h-12 justify-center flex items-center text-[16px] Google">Sign up with email</div>
    //                             </div>
    //                         </Link>

    //                         <div className=" flex w-full justify-center">
    //                             <input type="checkbox" className="size-3 mt-1.5 cursor-pointer mr-2" />
    //                             <p className="text-[15px]">Remember me for faster sign in</p>
    //                         </div>
    //                         <p className="text-[13px] text-center mt-7">Already have an account? <span onClick={() => setLogin(true)} className="cursor-pointer underline">Sign in</span></p>
    //                         <p className="text-[12px] text-center mt-4 text-gray-500">By clicking "Sign up", you accept Medium's <span className="underline cursor-pointer">Terms of Service</span> and <span className="underline cursor-pointer">Privacy Policy</span>.</p>
    //                     </div>


    //                 </div>
    //             </div>
    //         )}


    //         {signupModal && (
    //             <div className={`fixed inset-0 z-50 flex items-center  bg-black/50 backdrop-blur-xs `}>

    //                 <div className='w-[45%] min-h-[75vh] pb-10 bg-white rounded-md ml-105'>
    //                     <img src="/cross.png" alt="" onClick={() => setsignupModal(false)} className="ml-165 mt-3 text-gray-400 hover:text-gray-700 size-14 font-bold cursor-pointer p-2" />
    //                     <img src="/send email.png" alt="" className="size-20 ml-80" />
    //                     <p className="text-center text-[35px] Join-Medium">Sign up with email</p>
    //                     <form onSubmit={handleRegister} className="w-[70%] ml-30 min-h-40">
    //                         <label htmlFor="First-Name">First Name</label>
    //                         <input type="text" value={registerData.first_name} onChange={(e) => setRegisterData({ ...registerData, first_name: e.target.value })} placeholder="Enter your first name" className="w-full h-10 mb-4 outline-none bg-gray-200 px-4 rounded-lg" />

    //                         <label htmlFor="Last-Name">Last Name</label>
    //                         <input type="text" value={registerData.last_name} onChange={(e) => setRegisterData({ ...registerData, last_name: e.target.value })} placeholder="Enter your last name" className="w-full h-10 mb-4 outline-none bg-gray-200 px-4 rounded-lg" />

    //                         <label htmlFor="Email">Email</label>
    //                         <input type="email" value={registerData.email} onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })} placeholder="Enter your email address" className="w-full h-10 mb-4 outline-none bg-gray-200 px-4 rounded-lg" />

    //                         <label htmlFor="Contact">Contact</label>
    //                         <input type="number" value={registerData.contact} onChange={(e) => setRegisterData({ ...registerData, contact: e.target.value })} placeholder="Enter your phone number" className="w-full h-10 mb-4 outline-none bg-gray-200 px-4 rounded-lg" />

    //                         <label htmlFor="Password">Password</label>
    //                         <input type="password" value={registerData.password} onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })} placeholder="******" className="w-full h-10 mb-4 outline-none bg-gray-200 px-4 rounded-lg" />


    //                         <button type="submit" className="w-[100%] h-10 mt-5 rounded-lg font-bold uppercase cursor-pointer bg-black text-white text-2xl text-center cursor pointer">Sign up</button>
    //                     </form>



    //                 </div>
    //             </div>
    //         )}


    //         {login && (
    //             <div className={`fixed inset-0 z-50 flex items-center  bg-black/50 backdrop-blur-xs transition-opacity duration-3000 ease-in`}>

    //                 <div className='w-[45%] min-h-[55vh] pb-10 bg-white rounded-md ml-105'>
    //                     <img src="/cross.png" alt="" onClick={() => setLogin(false)} className="ml-165 mt-3 text-gray-400 hover:text-gray-700 size-14 font-bold cursor-pointer p-2" />
    //                     <p className="text-center text-[35px] Join-Medium">Welcome Back</p>
    //                     <form onSubmit={handleLogin} className="w-[70%] ml-30 min-h-40">
    //                         <label htmlFor="Email">Email</label>
    //                         <input value={loginData.email} onChange={(e) => setLoginData({ ...loginData, email: e.target.value })} type="email" placeholder="Enter your email address" className="w-full h-10 mb-4 outline-none bg-gray-200 px-4 rounded-lg" />

    //                         <label htmlFor="Password">Password</label>
    //                         <input value={loginData.password} onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} type="password" placeholder="******" className="w-full h-10 mb-4 outline-none bg-gray-200 px-4 rounded-lg" />
    //                         <button type="submit" className="w-full  h-10 mt-5 rounded-lg font-bold uppercase cursor-pointer bg-black text-white text-2xl text-center cursor pointer">Sign in</button>
    //                     </form>



    //                 </div>
    //             </div>
    //         )}
    //     </div>






    // )
    
return (
    <div className="w-full">
        <nav className="w-full min-h-20 bg-amber-50 border-b flex px-4 sm:px-8 lg:px-16 xl:px-24 items-center justify-between gap-4 py-3">
            <Link to="/">
                <h1 className="text-[30px] sm:text-[35px] Medium-font font-bold">Medium</h1>
            </Link>

            <div className="hidden md:flex items-center justify-between gap-4 lg:gap-6">
                <p className="text-[15px] whitespace-nowrap">Our story</p>
                <p className="text-[15px] whitespace-nowrap">Membership</p>
                <p className="text-[15px] whitespace-nowrap">Write</p>
                <p className="text-[15px] whitespace-nowrap">Sign in</p>
            </div>

            <Link to="/" className="shrink-0">
                <button
                    onClick={() => setOpenModal(true)}
                    className="px-4 sm:px-5 h-9 bg-black text-white text-[15px] sm:text-[17px] rounded-3xl cursor-pointer whitespace-nowrap"
                >
                    Get started
                </button>
            </Link>
        </nav>

        {openModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-3 sm:p-6 overflow-y-auto">
                <div className="w-full max-w-xl max-h-[92vh] overflow-y-auto bg-white rounded-md">
                    <img
                        src="/cross.png"
                        alt=""
                        onClick={() => setOpenModal(false)}
                        className="ml-auto mr-3 mt-3 text-gray-400 hover:text-gray-700 size-12 sm:size-14 font-bold cursor-pointer p-2"
                    />

                    <p className="text-center text-[27px] sm:text-[35px] Join-Medium">
                        Join Medium.
                    </p>

                    <div className="w-full px-4 sm:px-8 pb-6">
                        <Link to="/">
                            <div className="w-full max-w-md min-h-12 border cursor-pointer mt-3 rounded-[30px] mx-auto mb-5 flex items-center">
                                <div className="w-[15%] min-h-12 flex justify-center items-center">
                                    <img src="/google.png" alt="" className="size-6" />
                                </div>
                                <div className="w-[75%] min-h-12 justify-center flex items-center text-[14px] sm:text-[16px] Google">
                                    Sign up with Google
                                </div>
                            </div>
                        </Link>

                        <Link to="/">
                            <div className="w-full max-w-md min-h-12 border cursor-pointer rounded-[30px] mx-auto mb-5 flex items-center">
                                <div className="w-[15%] min-h-12 flex justify-center items-center">
                                    <img src="/linkedin.png" alt="" className="size-6" />
                                </div>
                                <div className="w-[75%] min-h-12 justify-center flex items-center text-[14px] sm:text-[16px] Google">
                                    Sign up with LinkedIn
                                </div>
                            </div>
                        </Link>

                        <Link to="/">
                            <div className="w-full max-w-md min-h-12 border cursor-pointer rounded-[30px] mx-auto mb-5 flex items-center">
                                <div className="w-[15%] min-h-12 flex justify-center items-center">
                                    <img src="/facebook.png" alt="" className="size-6" />
                                </div>
                                <div className="w-[75%] min-h-12 justify-center flex items-center text-[14px] sm:text-[16px] Google">
                                    Sign up with Facebook
                                </div>
                            </div>
                        </Link>

                        <Link to="/">
                            <div
                                onClick={() => setsignupModal(true)}
                                className="w-full max-w-md min-h-12 border cursor-pointer rounded-[30px] mx-auto mb-5 flex items-center"
                            >
                                <div className="w-[15%] min-h-12 flex justify-center items-center">
                                    <img src="/email.png" alt="" className="size-6" />
                                </div>
                                <div className="w-[75%] min-h-12 justify-center flex items-center text-[14px] sm:text-[16px] Google">
                                    Sign up with email
                                </div>
                            </div>
                        </Link>

                        <div className="flex flex-wrap justify-center items-start gap-2">
                            <input type="checkbox" className="size-3 mt-1 cursor-pointer shrink-0" />
                            <p className="text-[13px] sm:text-[15px]">
                                Remember me for faster sign in
                            </p>
                        </div>

                        <p className="text-[13px] sm:text-[15px] text-center mt-7">
                            Already have an account?{" "}
                            <span onClick={() => setLogin(true)} className="cursor-pointer underline">
                                Sign in
                            </span>
                        </p>

                        <p className="text-[12px] text-center mt-4 text-gray-500">
                            By clicking "Sign up", you accept Medium's{" "}
                            <span className="underline cursor-pointer">Terms of Service</span> and{" "}
                            <span className="underline cursor-pointer">Privacy Policy</span>.
                        </p>
                    </div>
                </div>
            </div>
        )}

        {signupModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-3 sm:p-6 overflow-y-auto">
                <div className="w-full max-w-xl max-h-[92vh] overflow-y-auto pb-8 bg-white rounded-md">
                    <img
                        src="/cross.png"
                        alt=""
                        onClick={() => setsignupModal(false)}
                        className="ml-auto mr-3 mt-3 text-gray-400 hover:text-gray-700 size-12 sm:size-14 font-bold cursor-pointer p-2"
                    />

                    <img src="/send email.png" alt="" className="size-16 sm:size-20 mx-auto" />

                    <p className="text-center text-[27px] sm:text-[35px] Join-Medium">
                        Sign up with email
                    </p>

                    <form onSubmit={handleRegister} className="w-[90%] sm:w-[80%] max-w-md mx-auto mt-5">
                        <label htmlFor="First-Name">First Name</label>
                        <input type="text" value={registerData.first_name} onChange={(e) => setRegisterData({ ...registerData, first_name: e.target.value })} placeholder="Enter your first name" className="w-full h-10 mb-4 outline-none bg-gray-200 px-4 rounded-lg" />

                        <label htmlFor="Last-Name">Last Name</label>
                        <input type="text" value={registerData.last_name} onChange={(e) => setRegisterData({ ...registerData, last_name: e.target.value })} placeholder="Enter your last name" className="w-full h-10 mb-4 outline-none bg-gray-200 px-4 rounded-lg" />

                        <label htmlFor="Email">Email</label>
                        <input type="email" value={registerData.email} onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })} placeholder="Enter your email address" className="w-full h-10 mb-4 outline-none bg-gray-200 px-4 rounded-lg" />

                        <label htmlFor="Contact">Contact</label>
                        <input type="number" value={registerData.contact} onChange={(e) => setRegisterData({ ...registerData, contact: e.target.value })} placeholder="Enter your phone number" className="w-full h-10 mb-4 outline-none bg-gray-200 px-4 rounded-lg" />

                        <label htmlFor="Password">Password</label>
                        <input type="password" value={registerData.password} onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })} placeholder="******" className="w-full h-10 mb-4 outline-none bg-gray-200 px-4 rounded-lg" />

                        <button type="submit" className="w-full h-10 mt-5 rounded-lg font-bold uppercase cursor-pointer bg-black text-white text-xl sm:text-2xl text-center">
                            Sign up
                        </button>
                    </form>
                </div>
            </div>
        )}

        {login && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs transition-opacity duration-3000 ease-in p-3 sm:p-6 overflow-y-auto">
                <div className="w-full max-w-xl max-h-[92vh] overflow-y-auto pb-8 bg-white rounded-md">
                    <img
                        src="/cross.png"
                        alt=""
                        onClick={() => setLogin(false)}
                        className="ml-auto mr-3 mt-3 text-gray-400 hover:text-gray-700 size-12 sm:size-14 font-bold cursor-pointer p-2"
                    />

                    <p className="text-center text-[27px] sm:text-[35px] Join-Medium">
                        Welcome Back
                    </p>

                    <form onSubmit={handleLogin} className="w-[90%] sm:w-[80%] max-w-md mx-auto mt-5">
                        <label htmlFor="Email">Email</label>
                        <input value={loginData.email} onChange={(e) => setLoginData({ ...loginData, email: e.target.value })} type="email" placeholder="Enter your email address" className="w-full h-10 mb-4 outline-none bg-gray-200 px-4 rounded-lg" />

                        <label htmlFor="Password">Password</label>
                        <input value={loginData.password} onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} type="password" placeholder="******" className="w-full h-10 mb-4 outline-none bg-gray-200 px-4 rounded-lg" />

                        <button type="submit" className="w-full h-10 mt-5 rounded-lg font-bold uppercase cursor-pointer bg-black text-white text-xl sm:text-2xl text-center">
                            Sign in
                        </button>
                    </form>
                </div>
            </div>
        )}
    </div>
)

};
export default Nav