import { Link, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";


function Profiles() {
     const [activeNav, setActiveNav] = useState(0);
    const [openModal, setOpenModal] = useState(false);
    const [sideNavOpen, setSideNavOpen] = useState(true);
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);

const [avatarFile, setAvatarFile] = useState(null);
const [avatarPreview, setAvatarPreview] = useState("");
const fileInputRef = useRef(null);

    const [formData, setFormData] = useState({ first_name: "", last_name: "", pronoun: "", bio: "" });

    const userId = localStorage.getItem("userId");

const navigate = useNavigate();
    const signOut = async ()=>{
        localStorage.removeItem("accessToken");
localStorage.removeItem("userId");

navigate("/");
    }

const handleUpdate = async () => {
    try {
        const formDataToSend = new FormData();

        formDataToSend.append("first_name", formData.first_name);
        formDataToSend.append("last_name", formData.last_name);
        formDataToSend.append("pronoun", formData.pronoun);
        formDataToSend.append("bio", formData.bio);

        if (avatarFile) {
            formDataToSend.append("avatar", avatarFile);
        }

        const response = await fetch(
            `https://backendblog-1kjf.onrender.com/medium/auth/update/${userId}`,
            {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
                body: formDataToSend,
            }
        );

        const data = await response.json();
        console.log("UPDATE PROFILE RESPONSE:", data);

        if (response.ok) {
            setUser(data.data?.user || data.data || data.user || data);
            setOpenModal(false);
            alert("Profile updated successfully!");
        } else {
            alert(data.message || "Failed to update profile.");
        }
    } catch (error) {
        console.error("Error updating profile:", error);
        alert("Something went wrong while updating your profile.");
    }
}; 


    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await fetch(
                    `https://backendblog-1kjf.onrender.com/medium/auth/users/${userId}`
                );

                const data = await response.json();

                console.log(data);

                if (response.ok) {
                    setUser(data.data);
                    setFormData({
                        first_name: data.data.first_name || "", last_name: data.data.last_name || "", pronoun: data.data.pronoun || "", bio: data.data.bio || ""
                    });
                    console.log("FORM DATA:", {
                        first_name: data.data.first_name || "",
                        last_name: data.data.last_name || "",
                        pronoun: data.data.pronoun || "",
                        bio: data.data.bio || ""
                    });
                }
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };

        getUser();


    }, [userId]);

    useEffect(() => {
        const getPosts = async () => {
            try {
                const response = await fetch(
                    "https://backendblog-1kjf.onrender.com/medium/content/posts/"
                );

                const data = await response.json();

                console.log("ALL POSTS:", data);

                if (response.ok) {
                    console.log("LOGGED-IN USER ID:", userId);
                    console.log("POST AUTHOR ID:", data.data[0]?.author);
                    const myPosts = data.data.filter(
                        (post) => post.author === userId
                    );

                    setPosts(myPosts);

                    console.log("MY POSTS:", myPosts);
                }
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };

        getPosts();
    }, []);
//     return (
//         <div>
//             <div className="w-full h-17 bg-white ">
//              <nav className="w-full h-17 border-b border-gray-300 flex fixed bg-white  items-center px-6">
//                     <img onClick={() => setSideNavOpen(!sideNavOpen)} src="/menu.png" alt="" className="size-6 cursor-pointer" />
//                     <Link to='/landingpage'><h1 className="text-[35px] Medium-font font-bold ml-5">Medium</h1></Link>

//                     <div className="px-4 w-60 h-10 rounded-3xl bg-gray-50 flex items-center ml-7">
//                         <img src="/search.png" alt="" className="size-7" />
//                         <input type="text" placeholder="Search" className="w-full ml-2 outline-none h-6" />
//                     </div>

//                     <button className="min-w-20 px-3 h-9 ml-185 bg-black cursor-pointer flex rounded-3xl items-center">
//                         <img src="/grid.png" alt="" className="size-6 mr-1" />
//                         <p className="text-white text-[14px]">Get app</p>
//                     </button>

//                     <Link to="/write">
//                         <div className="flex cursor-pointer ml-5 ">
//                             <img src="/edit.png" alt="" className="size-5" />
//                             <p className="text-[15px] ml-3 hover:text-gray-600">Write</p>
//                         </div>
//                     </Link>

//                     <img src="/bell.png" alt="" className="size-6 ml-5" />

//                     {/* <div className="rounded-[50%] border size-8 ml-5"></div> */}
//                     <button onClick={signOut} className="font-bold p-2 shadow-sm ml-1 cursor-pointer hover:bg-gray-50 transition-colors duration-250 text-lg">Sign out</button>
//                 </nav>
//             </div>

//             <div className="w-full min-h-[91vh] flex">
//                 {/* left */}
//                 <div className={`w-[15%] h-[91vh] left-0 top-17 bg-white fixed transition-transform duration-500 ease-in-out ${sideNavOpen ? "translate-x-0" : "-translate-x-full"}`}>
//                     <div className="w-full bg-white h-[91vh] border-r border-gray-200 fixed">
//                         <Link to='/landingpage'>
//                             <div onClick={() => setActiveNav(2)} className="w-full h-10 flex px-6 mt-13 items-center cursor-pointer hover:text-black text-gray-600">
//                                 <img src={activeNav === 1 ? `/home.png` : `/clicked-home.png`} alt="" className="size-5" />
//                                 <p className="ml-1">Home</p>
//                             </div>
//                         </Link>


//                         <div className="w-full h-10 flex px-6 mt-3 items-center hover:bg-gray-50 cursor-pointer">
//                             <img src="/bookmark.png" alt="" className="size-5" />
//                             <p className="ml-1">Library</p>
//                         </div>


//                         <Link to='/profiles'>
//                             <div onClick={() => setActiveNav(1)} className="w-full h-10 flex px-6 mt-3 items-center cursor-pointer hover:text-black text-gray-600">
//                                 <img src={activeNav === 2 ? `/clicked--user.png` : `/people.png`} alt="" className="size-5" />
//                                 <p className="ml-1">Profile</p>
//                             </div>
//                         </Link>


//                         <div className="w-full h-10 flex px-6 mt-3 items-center hover:bg-gray-50 cursor-pointer">
//                             <img src="/file.png" alt="" className="size-5" />
//                             <p className="ml-1">Stories</p>
//                         </div>


//                         <div className="w-full h-10 flex px-6 mt-3  items-center hover:bg-gray-50 cursor-pointer">
//                             <img src="/stats.png" alt="" className="size-5" />
//                             <p className="ml-1">Stats</p>
//                         </div>


//                         <div className="w-full h-20 flex px-6 border-t border-b border-gray-300 mt-3  items-center hover:bg-gray-50 cursor-pointer">
//                             <img src="/tic-tac-toe.png" alt="" className="size-5" />
//                             <p className="ml-1">Games</p>
//                         </div>


//                         <div className="w-full h-10 flex px-6 mt-5  items-center hover:bg-gray-50 cursor-pointer">
//                             <img src="/users.png" alt="" className="size-5" />
//                             <p className="ml-1">Following</p>
//                         </div>


//                         <div className="w-full h-10 flex px-6 mt-5 items-center hover:bg-gray-50 cursor-pointer">
//                             <img src="/plus.png" alt="" className="size-4" />
//                             <p className="ml-1 text-gray-500">Find writers and publications to follow.</p>
//                         </div>

//                         <p className="text-center underline text-gray-600 cursor-pointer mt-1">See suggestiions</p>

//                     </div>
//                 </div>


//                 <div className={`min-h-[91vh]  transition-all duration-500 ease-in-out ${sideNavOpen ? "w-[85.5%] ml-59" : "w-full ml-0"}`}>
//                     <div className="w-full h-13 bg-yellow-400 border-b border-t flex items-center justify-center">
//                         <div className="min-w-30 h-8 bg-white rounded-lg flex items-center px-2 mr-3">Welcome Offer</div>
//                         <p>Access to everything. Now 30% off. <span className="font-bold underline">Upgrade Now</span></p>
//                     </div>

//                     {/* midlle */}
//                     <div className="w-full items-start  flex">
//                         <div className="w-[70%] m-w-0 border-r border-gray-200 flex justify-center">
//                             <div className="w-[65%] min-h-50">
//                                 <div className="w-full min-h-10  flex justify-between py-10">
//                                     <p className="text-[40px] font-semibold"> {user ? `${user.first_name} ${user.last_name}` : "Loading..."} </p>
//                                     <img src="/menu-dots.png" alt="" className="size-8 mt-5 cursor-pointer" />
//                                 </div>

//                                 <div className="w-full h-9 border-b border-gray-200 flex">
//                                     <div className="cursor-pointer hover:border-b size-9 mr-10 text-[15px] text-gray-500 hover:text-black"><p>Home</p></div>
//                                     <div className="cursor-pointer hover:border-b size-9 mr-10 text-[15px] text-gray-500 hover:text-black"><p>Reposts</p></div>
//                                     <div className="cursor-pointer hover:border-b size-9 mr-10 text-[15px] text-gray-500 hover:text-black"><p>Activity</p></div>
//                                     <div className="cursor-pointer hover:border-b size-9 mr-10 text-[15px] text-gray-500 hover:text-black"><p>About</p></div>
//                                 </div>

                               
//                                 {posts.length > 0 ? (
//                                     posts.map((post) => (
//                                        <Link to={`/singlepost/${post._id}`}>
//                                                  <div key={post._id} className="w-full min-h-20 border-gray-200 border-t flex justify-between border-b py-10">
//                                             <div className="w-[65%] h-full">
//                                                 <div className="flex">
//                                                     <img src={user?.avatar || "/default-profile.png"} alt="" className="size-7 mr-2 rounded-full  object-cover"/>

//                                                     <p className="text-sm mt-1">{user ? `${user.first_name} ${user.last_name}` : "Loading..."}
//                                                     </p>
//                                                 </div>

//                                                 <div>
//                                                     <h1 className="my-5 post-heading font-bold">{post.title}</h1>

//                                                     <p className="mb-5 text-gray-500 text-lg post-sub line-clamp-3 overflow-hidden">{post.content}</p>
//                                                 </div>

//                                                 <div className="w-[90%] h-8 flex justify-end">
//                                                     <img src="/save-instagram.png" alt="Save post" className="cursor-pointer size-6 mr-3" />

//                                                     <img src="/menu-dots.png" alt="More options" className="cursor-pointer size-6" />
//                                                 </div>
//                                             </div>

//                                             <div className="w-[25%] min-h-35  mt-10">
//                                                 {post.image?.url && (<img src={post.image.url} alt={post.title} className="w-full h-full object-cover" />)}
//                                             </div>
//                                         </div>
//                                        </Link>
//                                     ))
//                                 ) : (
//                                     <p className="text-gray-500 mt-10">You haven't published any stories yet.</p>
//                                 )}
//                         </div>


//                         </div>

//                         <div className="w-[20%] h-fit  py-5 p-10 sticky top-20 self-start">
                            
//                         <img src={user?.avatar || "/default-profile.png"} alt="" className="size-25 rounded-full  object-cover"/>


//                             <p className="font-semibold text-xl mt-5"> {user ? `${user.first_name} ${user.last_name}` : "Loading..."}</p>

//                             <p onClick={() => setOpenModal(true)} className="text-green-700 text-[13px] cursor-pointer mt-5 ">Edit profile</p>
//                         </div>
//                     </div>
//                 </div>
//             </div>


//             {openModal && (
//                 <div className={`fixed inset-0 z-50 flex items-center justify-center py-10 overflow-y-auto  bg-black/50 backdrop-blur-xs transition-opacity duration-3000 ${openModal ? "opacity-100" : "opacity-0"} `}>

//                     <div className='w-[33%] min-h-[80vh] bg-white rounded-sm pb-5 mt-50'>
//                         <img src="/cross.png" alt="" onClick={() => setOpenModal(false)} className="ml-110 mt-3 text-gray-400 hover:text-gray-700 size-14 font-bold cursor-pointer p-2" />
//                         <p className="font-semibold text-center text-2xl">Profile information</p>

//                         <div className="w-full min-h-100  px-8">
//                             <p className="text-md">Photo</p>

//                             <div className="full min-h-10  flex">
//                                     <img src={avatarPreview || user?.avatar || "/default-profile.png"} alt="Profile preview" className="size-18 mr-2 rounded-full object-cover"/>    
//                             <div>
                                    
// <div className="flex text-md">
//     <p onClick={() => fileInputRef.current.click()} className="mr-3 text-green-700 cursor-pointer ml-2"> Update </p>

//     <p onClick={() => {
//             setAvatarFile(null);
//             setAvatarPreview("");
//         }}
//         className="text-red-700 cursor-pointer">
//         Remove
//     </p>

//     <input type="file" accept="image/*" hidden ref={fileInputRef} onChange={(e) => {
//             const file = e.target.files[0];
//             if (file) {
//                 setAvatarFile(file);
//                 setAvatarPreview(URL.createObjectURL(file));
//             }
//         }}/>
// </div>

//                                     <div className="pl-2"><p className="text-[14px] text-gray-500 mt-5">Recommended: Square JPG, PNG, or GIF, at least 1,000 pixels per side.</p></div>
//                                 </div>

//                             </div>

//                             <div className="w-full min-h-10 mt-10 ">
//                                 <p className="text-[15px]">Name*</p>
//                                 <input value={`${formData.first_name} ${formData.last_name}`.trim()} onChange={(e) => {
//                                     const name = e.target.value; const parts = name.trim().split(/\s+/);

//                                     setFormData({
//                                         ...formData,
//                                         first_name: parts[0] || "",
//                                         last_name: parts.slice(1).join(" ") || ""
//                                     });
//                                 }} type="text" className="w-full min-h-7 rounded-sm bg-gray-100 px-5 outline-none  py-1 border-0 focus:border-1" />
//                                 <div className="w-full min-h-5  flex justify-end pt-1"><span>0</span>/50</div>
//                             </div>

//                             <div className="w-full min-h-10 mt-10 ">
//                                 <p className="text-[15px]">Pronoun</p>
//                                 <input value={formData.pronoun} onChange={(e) =>
//                                     setFormData({
//                                         ...formData,
//                                         pronoun: e.target.value
//                                     })
//                                 } type="text" placeholder="Add..." className="w-full min-h-7 rounded-sm bg-gray-100 px-5 outline-none  py-1 border-0 focus:border-1" />
//                                 {/* <div className="w-full min-h-5  flex justify-end pt-1"><span>0</span>/4</div> */}
//                             </div>


//                             <div className="w-full min-h-10 mt-10 ">
//                                 <p className="text-[15px]" >Short bio</p>
//                                 <textarea value={formData.bio} onChange={(e) =>
//                                     setFormData({
//                                         ...formData,
//                                         bio: e.target.value
//                                     })
//                                 } name="" id="" className="w-full min-h-20 rounded-sm bg-gray-100 px-5 outline-none  py-1 border-0 focus:border-1"></textarea>
//                                 {/* <input type="text" placeholder="Add..."  /> */}
//                                 <div className="w-full min-h-5  flex justify-end pt-1"><span>0</span>/100</div>
//                             </div>


//                             <div className="w-full h-20 mt-15">
//                                 <p className="text-[16px]">About Page</p>
//                                 <p className="text-gray-500">Personalize with images and more to paint more of yourself than 'Short bio'.</p>
//                             </div>

//                             <div className="flex w-full h-10 justify-end mt-5">
//                                 <button onClick={() => setOpenModal(false)} className="h-10 w-20 cursor-pointer rounded-3xl border mr-3">Cancel</button>
//                                 <button onClick={handleUpdate} className="h-10 w-20 cursor-pointer rounded-3xl border bg-black text-white">Save</button>
//                             </div>
//                         </div>


//                     </div>
//                 </div>
//             )}
//         </div>
//     )





return (
    <div className="w-full min-h-screen overflow-x-hidden bg-white">
        <div className="w-full h-17 bg-white">
            <nav className="w-full h-17 border-b border-gray-300 flex fixed top-0 left-0 z-40 bg-white items-center justify-between px-3 sm:px-6">
                <div className="flex items-center min-w-0">
                    <img
                        onClick={() => setSideNavOpen(!sideNavOpen)}
                        src="/menu.png"
                        alt=""
                        className="size-5 sm:size-6 cursor-pointer shrink-0"
                    />

                    <Link to='/landingpage'>
                        <h1 className="text-2xl sm:text-[35px] Medium-font font-bold ml-3 sm:ml-5">
                            Medium
                        </h1>
                    </Link>

                    <div className="hidden md:flex px-4 w-40 lg:w-60 h-10 rounded-3xl bg-gray-50 items-center ml-4 lg:ml-7">
                        <img src="/search.png" alt="" className="size-6 lg:size-7" />
                        <input
                            type="text"
                            placeholder="Search"
                            className="w-full min-w-0 ml-2 outline-none h-6 bg-transparent"
                        />
                    </div>
                </div>

                <div className="flex items-center gap-2 sm:gap-4 shrink-0">
                    <button className="hidden lg:flex min-w-20 px-3 h-9 bg-black cursor-pointer rounded-3xl items-center">
                        <img src="/grid.png" alt="" className="size-6 mr-1" />
                        <p className="text-white text-[14px]">Get app</p>
                    </button>

                    <Link to="/write">
                        <div className="flex items-center cursor-pointer sm:ml-1">
                            <img src="/edit.png" alt="" className="size-5" />
                            <p className="hidden sm:block text-[15px] ml-2 hover:text-gray-600">
                                Write
                            </p>
                        </div>
                    </Link>

                    <img src="/bell.png" alt="" className="hidden sm:block size-5 sm:size-6 sm:ml-1" />

                    {/* <div className="rounded-[50%] border size-8 ml-5"></div> */}
                    <button
                        onClick={signOut}
                        className="font-bold px-2 py-2 shadow-sm cursor-pointer hover:bg-gray-50 transition-colors duration-250 text-sm sm:text-base lg:text-lg"
                    >
                        Sign out
                    </button>
                </div>
            </nav>
        </div>

        <div className="w-full min-h-[91vh] flex">
            {/* left */}
            <div
                className={`w-[250px] sm:w-[260px] max-w-[85vw] h-[calc(100vh-4.25rem)] left-0 top-17 z-30 bg-white fixed transition-transform duration-500 ease-in-out ${
                    sideNavOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                <div className="w-full bg-white h-full overflow-y-auto border-r border-gray-200">
                    <Link to='/landingpage'>
                        <div onClick={() => setActiveNav(2)} className="w-full min-h-10 flex px-4 sm:px-6 mt-13 items-center cursor-pointer hover:text-black text-gray-600">
                            <img src={activeNav === 1 ? `/home.png` : `/clicked-home.png`} alt="" className="size-5 shrink-0" />
                            <p className="ml-2">Home</p>
                        </div>
                    </Link>

                    <div className="w-full min-h-10 flex px-4 sm:px-6 mt-3 items-center hover:bg-gray-50 cursor-pointer">
                        <img src="/bookmark.png" alt="" className="size-5 shrink-0" />
                        <p className="ml-2">Library</p>
                    </div>

                    <Link to='/profiles'>
                        <div onClick={() => setActiveNav(1)} className="w-full min-h-10 flex px-4 sm:px-6 mt-3 items-center cursor-pointer hover:text-black text-gray-600">
                            <img src={activeNav === 2 ? `/clicked--user.png` : `/people.png`} alt="" className="size-5 shrink-0" />
                            <p className="ml-2">Profile</p>
                        </div>
                    </Link>

                    <div className="w-full min-h-10 flex px-4 sm:px-6 mt-3 items-center hover:bg-gray-50 cursor-pointer">
                        <img src="/file.png" alt="" className="size-5 shrink-0" />
                        <p className="ml-2">Stories</p>
                    </div>

                    <div className="w-full min-h-10 flex px-4 sm:px-6 mt-3 items-center hover:bg-gray-50 cursor-pointer">
                        <img src="/stats.png" alt="" className="size-5 shrink-0" />
                        <p className="ml-2">Stats</p>
                    </div>

                    <div className="w-full min-h-16 flex px-4 sm:px-6 border-t border-b border-gray-300 mt-3 items-center hover:bg-gray-50 cursor-pointer">
                        <img src="/tic-tac-toe.png" alt="" className="size-5 shrink-0" />
                        <p className="ml-2">Games</p>
                    </div>

                    <div className="w-full min-h-10 flex px-4 sm:px-6 mt-5 items-center hover:bg-gray-50 cursor-pointer">
                        <img src="/users.png" alt="" className="size-5 shrink-0" />
                        <p className="ml-2">Following</p>
                    </div>

                    <div className="w-full min-h-10 flex px-4 sm:px-6 mt-5 items-start hover:bg-gray-50 cursor-pointer">
                        <img src="/plus.png" alt="" className="size-4 shrink-0 mt-1" />
                        <p className="ml-2 text-gray-500 text-sm">
                            Find writers and publications to follow.
                        </p>
                    </div>

                    <p className="text-center underline text-gray-600 cursor-pointer mt-2 text-sm">
                        See suggestiions
                    </p>
                </div>
            </div>

            <div className={`min-h-[91vh] min-w-0 transition-all duration-500 ease-in-out ${
                sideNavOpen
                    ? "w-full md:w-[calc(100%-260px)] md:ml-[260px]"
                    : "w-full ml-0"
            }`}>
                <div className="w-full min-h-13 bg-yellow-400 border-b border-t flex flex-wrap items-center justify-center gap-2 px-3 py-2 text-center">
                    <div className="min-w-0 h-8 bg-white rounded-lg flex items-center px-2 text-sm sm:text-base">
                        Welcome Offer
                    </div>
                    <p className="text-sm sm:text-base">
                        Access to everything. Now 30% off.{" "}
                        <span className="font-bold underline cursor-pointer">
                            Upgrade Now
                        </span>
                    </p>
                </div>

                {/* middle */}
                <div className="w-full items-start flex flex-col lg:flex-row">
                    <div className="w-full lg:w-[75%] min-w-0 border-r-0 lg:border-r border-gray-200 flex justify-center">
                        <div className="w-full sm:w-[90%] lg:w-[85%] xl:w-[75%] min-w-0 px-4 sm:px-0 min-h-50">
                            <div className="w-full min-h-10 flex justify-between items-center gap-3 py-6 sm:py-10">
                                <p className="text-2xl sm:text-3xl lg:text-[40px] font-semibold break-words min-w-0">
                                    {user ? `${user.first_name} ${user.last_name}` : "Loading..."}
                                </p>
                                <img src="/menu-dots.png" alt="" className="size-7 sm:size-8 shrink-0 cursor-pointer" />
                            </div>

                            <div className="w-full min-h-9 border-b border-gray-200 flex gap-5 sm:gap-8 overflow-x-auto">
                                <div className="cursor-pointer hover:border-b min-h-9 shrink-0 text-sm sm:text-[15px] text-gray-500 hover:text-black">
                                    <p>Home</p>
                                </div>
                                <div className="cursor-pointer hover:border-b min-h-9 shrink-0 text-sm sm:text-[15px] text-gray-500 hover:text-black">
                                    <p>Reposts</p>
                                </div>
                                <div className="cursor-pointer hover:border-b min-h-9 shrink-0 text-sm sm:text-[15px] text-gray-500 hover:text-black">
                                    <p>Activity</p>
                                </div>
                                <div className="cursor-pointer hover:border-b min-h-9 shrink-0 text-sm sm:text-[15px] text-gray-500 hover:text-black">
                                    <p>About</p>
                                </div>
                            </div>

                            {posts.length > 0 ? (
                                posts.map((post) => (
                                    <Link to={`/singlepost/${post._id}`} key={post._id}>
                                        <div className="w-full min-h-20 border-gray-200 border-t flex justify-between gap-3 sm:gap-5 border-b py-6 sm:py-10">
                                            <div className="w-[70%] sm:w-[65%] min-w-0">
                                                <div className="flex items-center min-w-0">
                                                    <img src={user?.avatar || "/default-profile.png"} alt="" className="size-7 mr-2 rounded-full object-cover shrink-0" />

                                                    <p className="text-xs sm:text-sm mt-1 break-words">
                                                        {user ? `${user.first_name} ${user.last_name}` : "Loading..."}
                                                    </p>
                                                </div>

                                                <div>
                                                    <h1 className="my-3 sm:my-5 post-heading font-bold break-words">
                                                        {post.title}
                                                    </h1>

                                                    <p className="mb-4 sm:mb-5 text-gray-500 text-base sm:text-lg post-sub line-clamp-3 overflow-hidden">
                                                        {post.content}
                                                    </p>
                                                </div>

                                                <div className="w-full sm:w-[90%] min-h-8 flex justify-end items-center">
                                                    <img src="/save-instagram.png" alt="Save post" className="cursor-pointer size-5 sm:size-6 mr-3" />
                                                    <img src="/menu-dots.png" alt="More options" className="cursor-pointer size-5 sm:size-6" />
                                                </div>
                                            </div>

                                            <div className="w-[30%] sm:w-[25%] min-w-0 min-h-20 sm:min-h-35 mt-8 sm:mt-10 flex items-center">
                                                {post.image?.url && (
                                                    <img
                                                        src={post.image.url}
                                                        alt={post.title}
                                                        className="w-full max-h-40 sm:max-h-48 object-cover"
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    </Link>
                                ))
                            ) : (
                                <p className="text-gray-500 mt-10 pb-8">
                                    You haven't published any stories yet.
                                </p>
                            )}
                        </div>
                    </div>

                   <div className="w-full lg:w-[25%] h-fit py-5 px-5 xl:px-8 lg:sticky lg:top-20 self-start border-t lg:border-t-0 border-gray-200 mt-5 lg:mt-0">
                        <img src={user?.avatar || "/default-profile.png"} alt="" className="size-20 xl:size-25 rounded-full object-cover" />

                        <p className="font-semibold text-lg xl:text-xl mt-5 break-words">
                            {user ? `${user.first_name} ${user.last_name}` : "Loading..."}
                        </p>

                        <p onClick={() => setOpenModal(true)} className="text-green-700 text-[13px] cursor-pointer mt-5">
                            Edit profile
                        </p>
                    </div>
                </div>
            </div>
        </div>

        {openModal && (
            <div className={`fixed inset-0 z-50 flex items-start sm:items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/50 backdrop-blur-xs transition-opacity duration-3000 ${openModal ? "opacity-100" : "opacity-0"}`}>
                <div className="w-full sm:w-[85%] md:w-[65%] lg:w-[50%] xl:w-[33%] max-w-xl min-h-0 max-h-[90vh] overflow-y-auto bg-white rounded-sm p-4 sm:p-6">
                    <div className="w-full flex justify-end">
                        <img
                            src="/cross.png"
                            alt=""
                            onClick={() => setOpenModal(false)}
                            className="size-9 sm:size-10 text-gray-400 hover:text-gray-700 font-bold cursor-pointer p-2"
                        />
                    </div>

                    <p className="font-semibold text-center text-xl sm:text-2xl">
                        Profile information
                    </p>

                    <div className="w-full min-h-100 mt-5">
                        <p className="text-md">Photo</p>

                        <div className="w-full min-h-10 flex items-start gap-3">
                            <img src={avatarPreview || user?.avatar || "/default-profile.png"} alt="Profile preview" className="size-16 sm:size-18 rounded-full object-cover shrink-0" />

                            <div className="min-w-0">
                                <div className="flex flex-wrap gap-3 text-sm sm:text-md">
                                    <p onClick={() => fileInputRef.current.click()} className="text-green-700 cursor-pointer">
                                        Update
                                    </p>

                                    <p
                                        onClick={() => {
                                            setAvatarFile(null);
                                            setAvatarPreview("");
                                        }}
                                        className="text-red-700 cursor-pointer"
                                    >
                                        Remove
                                    </p>

                                    <input
                                        type="file"
                                        accept="image/*"
                                        hidden
                                        ref={fileInputRef}
                                        onChange={(e) => {
                                            const file = e.target.files[0];
                                            if (file) {
                                                setAvatarFile(file);
                                                setAvatarPreview(URL.createObjectURL(file));
                                            }
                                        }}
                                    />
                                </div>

                                <div className="pl-0">
                                    <p className="text-[13px] sm:text-[14px] text-gray-500 mt-4">
                                        Recommended: Square JPG, PNG, or GIF, at least 1,000 pixels per side.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="w-full min-h-10 mt-8 sm:mt-10">
                            <p className="text-[15px]">Name*</p>
                            <input
                                value={`${formData.first_name} ${formData.last_name}`.trim()}
                                onChange={(e) => {
                                    const name = e.target.value; const parts = name.trim().split(/\s+/);

                                    setFormData({
                                        ...formData,
                                        first_name: parts[0] || "",
                                        last_name: parts.slice(1).join(" ") || ""
                                    });
                                }}
                                type="text"
                                className="w-full min-h-9 rounded-sm bg-gray-100 px-3 sm:px-5 outline-none py-1 border-0 focus:border-1"
                            />
                            <div className="w-full min-h-5 flex justify-end pt-1">
                                <span>0</span>/50
                            </div>
                        </div>

                        <div className="w-full min-h-10 mt-7 sm:mt-10">
                            <p className="text-[15px]">Pronoun</p>
                            <input
                                value={formData.pronoun}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        pronoun: e.target.value
                                    })
                                }
                                type="text"
                                placeholder="Add..."
                                className="w-full min-h-9 rounded-sm bg-gray-100 px-3 sm:px-5 outline-none py-1 border-0 focus:border-1"
                            />
                        </div>

                        <div className="w-full min-h-10 mt-7 sm:mt-10">
                            <p className="text-[15px]">Short bio</p>
                            <textarea
                                value={formData.bio}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        bio: e.target.value
                                    })
                                }
                                name=""
                                id=""
                                className="w-full min-h-20 rounded-sm bg-gray-100 px-3 sm:px-5 outline-none py-1 border-0 focus:border-1"
                            ></textarea>
                            <div className="w-full min-h-5 flex justify-end pt-1">
                                <span>0</span>/100
                            </div>
                        </div>

                        <div className="w-full min-h-20 mt-10">
                            <p className="text-[16px]">About Page</p>
                            <p className="text-gray-500 text-sm sm:text-base">
                                Personalize with images and more to paint more of yourself than 'Short bio'.
                            </p>
                        </div>

                        <div className="flex w-full min-h-10 justify-end mt-5">
                            <button onClick={() => setOpenModal(false)} className="h-10 w-20 cursor-pointer rounded-3xl border mr-3">
                                Cancel
                            </button>
                            <button onClick={handleUpdate} className="h-10 w-20 cursor-pointer rounded-3xl border bg-black text-white">
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )}
    </div>
)

}

export default Profiles