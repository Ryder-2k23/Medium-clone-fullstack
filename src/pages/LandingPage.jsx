import { Link, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
function LandingPage() {
    const [activeNav, setActiveNav] = useState(0);
    const [sideNavOpen, setSideNavOpen] = useState(true);
   

    const [posts, setPosts] = useState([]);
    const [authors, setAuthors] = useState({});

 const navigate = useNavigate();
    const signOut = async ()=>{
        localStorage.removeItem("accessToken");
localStorage.removeItem("userId");

navigate("/");
    }

    useEffect(() => {
        const getPosts = async () => {
            try {
                const response = await fetch(
                    "https://backendblog-1kjf.onrender.com/medium/content/posts/"
                );

                const data = await response.json();

                console.log("ALL LANDING PAGE POSTS:", data);

                if (response.ok) {
                    setPosts(data.data || []);
                }
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };

        getPosts();



        const getAuthors = async () => {
            try {
                const response = await fetch(
                    "https://backendblog-1kjf.onrender.com/medium/content/posts/"
                );

                const data = await response.json();

                if (response.ok) {
                    const allPosts = data.data || [];
                    const authorIds = [
                        ...new Set(allPosts.map((post) => post.author))
                    ];

                    const authorDetails = await Promise.all(
                        authorIds.map(async (authorId) => {
                            const userResponse = await fetch(
                                `https://backendblog-1kjf.onrender.com/medium/auth/users/${authorId}`
                            );

                            const userData = await userResponse.json();

                            return {
                                authorId,
                                user: userData.data?.user || userData.data || userData.user || userData
                            };
                        })
                    );

                    const authorsMap = {};

                    authorDetails.forEach(({ authorId, user }) => {
                        authorsMap[authorId] = user;
                    });

                    setAuthors(authorsMap);
                }
            } catch (error) {
                console.error("Error fetching authors:", error);
            }
        };

        getAuthors();
    }, []);



    // return (
    //     <div>
    //         <div className="w-full h-17 bg-white ">
    //             <nav className="w-full h-17 border-b border-gray-300 flex fixed bg-white  items-center px-6">
    //                 <img onClick={() => setSideNavOpen(!sideNavOpen)} src="/menu.png" alt="" className="size-6 cursor-pointer" />
    //                 <Link to='/landingpage'><h1 className="text-[35px] Medium-font font-bold ml-5">Medium</h1></Link>

    //                 <div className="px-4 w-60 h-10 rounded-3xl bg-gray-50 flex items-center ml-7">
    //                     <img src="/search.png" alt="" className="size-7" />
    //                     <input type="text" placeholder="Search" className="w-full ml-2 outline-none h-6" />
    //                 </div>

    //                 <button className="min-w-20 px-3 h-9 ml-185 bg-black cursor-pointer flex rounded-3xl items-center">
    //                     <img src="/grid.png" alt="" className="size-6 mr-1" />
    //                     <p className="text-white text-[14px]">Get app</p>
    //                 </button>

    //                 <Link to="/write">
    //                     <div className="flex cursor-pointer ml-5 ">
    //                         <img src="/edit.png" alt="" className="size-5" />
    //                         <p className="text-[15px] ml-3 hover:text-gray-600">Write</p>
    //                     </div>
    //                 </Link>

    //                 <img src="/bell.png" alt="" className="size-6 ml-5" />

    //                 {/* <div className="rounded-[50%] border size-8 ml-5"></div> */}
    //                 <button onClick={signOut} className="font-bold p-2 shadow-sm ml-1 cursor-pointer hover:bg-gray-50 transition-colors duration-250 text-lg">Sign out</button>
    //             </nav>
    //         </div>

    //         <div className="w-full min-h-[91vh] flex">
    //             {/* left */}
    //             <div className={`w-[15%] h-[91vh] left-0 top-17 bg-white fixed transition-transform duration-500 ease-in-out ${sideNavOpen ? "translate-x-0" : "-translate-x-full"}`}>
    //                 <div className="w-full bg-white h-[91vh] border-r border-gray-200 fixed">
    //                     <Link to='/landingpage'>
    //                         <div onClick={() => setActiveNav(1)} className="w-full h-10 flex px-6 mt-13 items-center cursor-pointer hover:text-black text-gray-600">
    //                             <img src={activeNav === 1 ? `/clicked-home.png` : `/home.png`} alt="" className="size-5" />
    //                             <p className="ml-1">Home</p>
    //                         </div>
    //                     </Link>


    //                     <div className="w-full h-10 flex px-6 mt-3 items-center cursor-pointer hover:text-black text-gray-600">
    //                         <img src="/bookmark.png" alt="" className="size-5" />
    //                         <p className="ml-1">Library</p>
    //                     </div>


    //                     <Link to='/profiles'>
    //                         <div onClick={() => setActiveNav(2)} className="w-full h-10 flex px-6 mt-3 items-center cursor-pointer hover:text-black text-gray-600">
    //                             <img src={activeNav === 2 ? `/people.png` : `/clicked--user.png`} alt="" className="size-5" />
    //                             <p className="ml-1">Profile</p>
    //                         </div>
    //                     </Link>


    //                     <div className="w-full h-10 flex px-6 mt-3 items-center cursor-pointer hover:text-black text-gray-600">
    //                         <img src={`/file.png`} alt="" className="size-5" />
    //                         <p className="ml-1">Stories</p>
    //                     </div>


    //                     <div className="w-full h-10 flex px-6 mt-3  items-center cursor-pointer  hover:text-black text-gray-600">
    //                         <img src="/stats.png" alt="" className="size-5" />
    //                         <p className="ml-1">Stats</p>
    //                     </div>


    //                     <div className="w-full h-20 flex px-6 border-t border-b border-gray-300 mt-3 hover:text-black text-gray-600  items-center cursor-pointer">
    //                         <img src="/tic-tac-toe.png" alt="" className="size-5" />
    //                         <p className="ml-1">Games</p>
    //                     </div>


    //                     <div className="w-full h-10 flex px-6 mt-5  items-center hover:text-black text-gray-600  cursor-pointer">
    //                         <img src="/users.png" alt="" className="size-5" />
    //                         <p className="ml-1">Following</p>
    //                     </div>


    //                     <div className="w-full h-10 flex px-6 mt-5 items-center hover:text-black text-gray-600 cursor-pointer">
    //                         <img src="/plus.png" alt="" className="size-4" />
    //                         <p className="ml-1 text-gray-500">Find writers and publications to follow.</p>
    //                     </div>

    //                     <p className="text-center underline text-gray-600 cursor-pointer mt-1">See suggestiions</p>

    //                 </div>
    //             </div>

    //             <div className={` min-h-[91vh]  transition-all duration-500 ease-in-out ${sideNavOpen ? "w-[85.5%] ml-59" : "w-full ml-0"}`} >
    //                 <div className={`w-full h-13 bg-yellow-400 border-b border-t flex items-center justify-center transition-transform duration-500 ease-in-out ${sideNavOpen ? "w-full " : "w-[85.5%]"}`}>
    //                     <div className="min-w-30 h-8 bg-white rounded-lg flex items-center px-2 mr-3">Welcome Offer</div>
    //                     <p>Access to everything. Now 30% off. <span className="font-bold underline">Upgrade Now</span></p>
    //                 </div>

    //                 {/* midlle */}
    //                 <div className="w-full min-h-[85vh] flex">

    //                     <div className="w-[75%] min-h-[85vh]  justify-center flex ">

    //                         <div className="w-[80%]  min-h-[10vh] ">
    //                             <div className="w-full h-[7vh] border-gray-200 mt-5">
    //                                 <button className="w-15 h-13.5 hover:border-b cursor-pointer text-gray-600 hover:text-black">For you</button>
    //                                 <button className="w-15 h-13.5 ml-3 hover:border-b cursor-pointer text-gray-600 hover:text-black">Featured</button>
    //                             </div>

                                
    //                                 {posts.map((post) => (
    //                                     <Link key={post._id} to={`/singlepost/${post._id}`} className="block">
    //                                             <div  className="w-full min-h-20  border-gray-200 border-t flex justify-between border-b py-10">
    //                                         <div className="w-[65%] h-full">
    //                                             <div className="flex">
    //                                                 <div className="size-7 rounded-[50%] border border-gray-500 mr-2"></div>
    //                                                 <div className="flex"><p className="hover:underline text-sm mt-1">
    //                                                     {(() => {
    //                                                         const author = authors[post.author];

    //                                                         if (!author) return "Loading author...";

    //                                                         return `${author.first_name || ""} ${author.last_name || ""}`.trim()
    //                                                             || author.name
    //                                                             || author.email
    //                                                             || "Unknown author";
    //                                                     })()}
    //                                                 </p><span className="text-gray-500 ml-2"> {post.createdAt
    //                                                     ? new Date(post.createdAt).toLocaleDateString("en-US", {
    //                                                         month: "short",
    //                                                         day: "numeric",
    //                                                     })
    //                                                     : ""}</span></div>
    //                                             </div>

    //                                             <div>
    //                                                 <h1 className="my-5 post-heading">{post.title}</h1>
    //                                                 <p className="mb-5 text-gray-500 line-clamp-3 overflow-hidden text-lg post-sub">{post.content}</p>
    //                                             </div>

    //                                             <div className="w-[90%] h-8 flex  justify-between">
    //                                                 <div className="w-[40%] h-8  flex justify-between items-center">
    //                                                     <img src="/star.png" alt="" className="size-4" />
    //                                                     <div className="flex"><img src="/wave-hand.png" alt="" className="cursor-pointer size-5 mr-1" /> <p className="text-gray-900 text-sm">{post.claps || 0}</p></div>
    //                                                     <div className="flex"><img src="/speech-bubble.png" alt="" className="cursor-pointer size-4 mr-1 mt-0.5" /> <p className="text-gray-900 text-sm">0</p></div>
    //                                                     <div className="flex"><img src="/exchange.png" alt="" className="cursor-pointer size-4 mt-0.5 mr-1" /> <p className="text-gray-900 text-sm">0</p></div>
    //                                                 </div>

    //                                                 <div className="w-[25%] h-8  flex items-center justify-between">
    //                                                     <img src="/dislike.png" alt="" className="cursor-pointer size-6 mr-1 mt-0.5" />
    //                                                     <img src="/save-instagram.png" alt="" className="cursor-pointer size-6 mr-1 mt-0.5" />
    //                                                     <img src="/menu-dots.png" alt="" className="cursor-pointer size-6 mr-1 mt-0.5" />
    //                                                 </div>
    //                                             </div>
    //                                         </div>

    //                                         <div className="w-[25%] h-35  mt-10 flex items-center justify-center overflow-hidden">
    //                                            <img src={post.image.url} alt='' className="w-full h-full object-cover"/>
    //                                         </div>
    //                                     </div>
    //                                     </Link>
    //                                 ))}
                                
    //                         </div>



    //                     </div>


    //                     <div className="w-[25%] self-start">
    //                         <div className={`w-full bg-white`}>
    //                             <div className={`w-full pt-10 pb-5 border-b border-gray-200 border-l  pl-7`}>
    //                                 <p className="text-lg font-semibold mb-5">Staff Picks</p>

    //                                 <div className="flex">
    //                                     <div className="size-5  rounded-[50%] border"></div>
    //                                     <p className="ml-1 text-sm mb-3">George Joseph</p>
    //                                 </div>

    //                                 <p className="font-bold text-[20px]">Let's.</p>
    //                                 <p className="text-[14px] text-gray-500">Sept 13</p>
    //                                 <div className="flex mt-3">
    //                                     <div className="size-5  rounded-[50%] border"></div>
    //                                     <p className="text-sm ml-1">In ZORA by Malia Niguel Hoskin, Ph.D</p>
    //                                 </div>

    //                                 <h1 className="text-md font-bold mt-3">Nikole Hannah-Jones Is Asking the Question Black parents know too well: What do we sacrifice? </h1>

    //                                 <p className="text-[14px] text-gray-500 mt-5">4d ago</p>

    //                                 <div className="flex mt-3">
    //                                     <div className="size-5  rounded-[50%] border"></div>
    //                                     <p className="text-sm ml-1">In Zenit by Json McBride</p>
    //                                 </div>

    //                                 <h1 className="text-md font-bold mt-3">What Makes A Place Scared? </h1>

    //                                 <p className="text-[14px] text-gray-500 mt-5">6d ago</p>

    //                                 <p className="cursor-pointer hover:underline text-gray-500 text-sm mt-5">See full list</p>

    //                                 <p className="font-bold text-[18px]">Trending On Medium</p>

    //                                 <div className="flex mt-3">
    //                                     <div className="size-5  rounded-[50%] border"></div>
    //                                     <p className="text-sm ml-1">Netflix Technnology Blog</p>
    //                                 </div>

    //                                 <h1 className="text-lg font-bold mt-3">Netflix Stratum Media Processing: Automated Container Right-Sizing</h1>

    //                                 <p className="text-[14px] text-gray-500 mt-5">1d ago</p>

    //                                 <div className="flex mt-3">
    //                                     <div className="size-5  rounded-[50%] border"></div>
    //                                     <p className="text-sm ml-1">In UX Planet by Nick Babich</p>
    //                                 </div>

    //                                 <h1 className="text-lg font-bold mt-3">I Tested Opus 5.5 at Every Effort Level for UI Design</h1>

    //                                 <p className="text-[14px] text-gray-500 mt-5">1d ago</p>


    //                                 <div className="flex mt-3">
    //                                     <div className="size-5  rounded-[50%] border"></div>
    //                                     <p className="text-sm ml-1">In Realworld AI Use Cases by Chris Dunlop</p>
    //                                 </div>

    //                                 <h1 className="text-lg font-bold mt-3">Jev Explained Through Real Examples</h1>

    //                                 <p className="text-[14px] text-gray-500 mt-5">1d ago</p>

    //                                 <p className="cursor-pointer hover:underline text-gray-500 text-sm mt-5">See all trending full stories</p>

    //                             </div>
    //                         </div>
    //                     </div>


    //                 </div>


    //             </div>
    //         </div>
    //     </div>
    // )


    return (
        <div className="w-full min-h-screen overflow-x-hidden bg-white">

            {/* NAVBAR */}
            <div className="w-full h-16 sm:h-17 bg-white">
                <nav className="w-full h-16 sm:h-17 border-b border-gray-300 flex fixed top-0 left-0 z-50 bg-white items-center px-3 sm:px-5 lg:px-6">

                    <img
                        onClick={() => setSideNavOpen(!sideNavOpen)}
                        src="/menu.png"
                        alt=""
                        className="size-5 sm:size-6 cursor-pointer shrink-0"
                    />

                    <Link to="/landingpage" className="shrink-0">
                        <h1 className="text-2xl sm:text-[30px] lg:text-[35px] Medium-font font-bold ml-3 sm:ml-5">
                            Medium
                        </h1>
                    </Link>

                    <div className="hidden sm:flex px-3 md:px-4 w-36 md:w-52 lg:w-60 h-10 rounded-3xl bg-gray-50 items-center ml-4 lg:ml-7">
                        <img
                            src="/search.png"
                            alt=""
                            className="size-6 md:size-7 shrink-0"
                        />
                        <input
                            type="text"
                            placeholder="Search"
                            className="w-full min-w-0 ml-2 outline-none h-6 bg-transparent"
                        />
                    </div>

                    <button className="hidden lg:flex min-w-20 px-3 h-9 ml-auto bg-black cursor-pointer rounded-3xl items-center shrink-0">
                        <img
                            src="/grid.png"
                            alt=""
                            className="size-6 mr-1"
                        />
                        <p className="text-white text-[14px]">Get app</p>
                    </button>

                    <div className="ml-auto lg:ml-5 flex items-center gap-3 sm:gap-4 lg:gap-5 shrink-0">

                        <Link to="/write">
                            <div className="flex cursor-pointer items-center">
                                <img
                                    src="/edit.png"
                                    alt=""
                                    className="size-5"
                                />
                                <p className="hidden md:block text-[15px] ml-2 hover:text-gray-600">
                                    Write
                                </p>
                            </div>
                        </Link>

                        <img
                            src="/bell.png"
                            alt=""
                            className="hidden sm:block size-5 sm:size-6"
                        />

                        <button
                            onClick={signOut}
                            className="font-bold px-2 sm:px-3 py-2 shadow-sm cursor-pointer hover:bg-gray-50 transition-colors duration-250 text-sm sm:text-base lg:text-lg whitespace-nowrap"
                        >
                            Sign out
                        </button>
                    </div>
                </nav>
            </div>

            {/* MAIN PAGE LAYOUT */}
            <div className="w-full min-h-[calc(100vh-4rem)] flex">

                {/* LEFT SIDEBAR */}
                <div
                    className={`w-[75%] max-w-64 sm:w-64 md:w-60 lg:w-[15%] h-[calc(100vh-4rem)] left-0 top-16 sm:top-17 bg-white fixed z-40 transition-transform duration-500 ease-in-out ${
                        sideNavOpen
                            ? "translate-x-0"
                            : "-translate-x-full"
                    }`}
                >
                    <div className="w-full h-full bg-white border-r border-gray-200 overflow-y-auto">

                        <Link to="/landingpage">
                            <div
                                onClick={() => setActiveNav(1)}
                                className="w-full min-h-10 flex px-4 sm:px-6 mt-8 sm:mt-13 items-center cursor-pointer hover:text-black text-gray-600"
                            >
                                <img
                                    src={
                                        activeNav === 1
                                            ? "/clicked-home.png"
                                            : "/home.png"
                                    }
                                    alt=""
                                    className="size-5 shrink-0"
                                />
                                <p className="ml-2">Home</p>
                            </div>
                        </Link>

                        <div className="w-full min-h-10 flex px-4 sm:px-6 mt-3 items-center cursor-pointer hover:text-black text-gray-600">
                            <img
                                src="/bookmark.png"
                                alt=""
                                className="size-5 shrink-0"
                            />
                            <p className="ml-2">Library</p>
                        </div>

                        <Link to="/profiles">
                            <div
                                onClick={() => setActiveNav(2)}
                                className="w-full min-h-10 flex px-4 sm:px-6 mt-3 items-center cursor-pointer hover:text-black text-gray-600"
                            >
                                <img
                                    src={
                                        activeNav === 2
                                            ? "/people.png"
                                            : "/clicked--user.png"
                                    }
                                    alt=""
                                    className="size-5 shrink-0"
                                />
                                <p className="ml-2">Profile</p>
                            </div>
                        </Link>

                        <div className="w-full min-h-10 flex px-4 sm:px-6 mt-3 items-center cursor-pointer hover:text-black text-gray-600">
                            <img
                                src="/file.png"
                                alt=""
                                className="size-5 shrink-0"
                            />
                            <p className="ml-2">Stories</p>
                        </div>

                        <div className="w-full min-h-10 flex px-4 sm:px-6 mt-3 items-center cursor-pointer hover:text-black text-gray-600">
                            <img
                                src="/stats.png"
                                alt=""
                                className="size-5 shrink-0"
                            />
                            <p className="ml-2">Stats</p>
                        </div>

                        <div className="w-full min-h-16 sm:min-h-20 flex px-4 sm:px-6 border-t border-b border-gray-300 mt-3 hover:text-black text-gray-600 items-center cursor-pointer">
                            <img
                                src="/tic-tac-toe.png"
                                alt=""
                                className="size-5 shrink-0"
                            />
                            <p className="ml-2">Games</p>
                        </div>

                        <div className="w-full min-h-10 flex px-4 sm:px-6 mt-5 items-center hover:text-black text-gray-600 cursor-pointer">
                            <img
                                src="/users.png"
                                alt=""
                                className="size-5 shrink-0"
                            />
                            <p className="ml-2">Following</p>
                        </div>

                        <div className="w-full min-h-10 flex px-4 sm:px-6 mt-5 items-start hover:text-black text-gray-600 cursor-pointer">
                            <img
                                src="/plus.png"
                                alt=""
                                className="size-4 shrink-0 mt-1"
                            />
                            <p className="ml-2 text-gray-500 text-sm">
                                Find writers and publications to follow.
                            </p>
                        </div>

                        <p className="text-center underline text-gray-600 cursor-pointer mt-2 mb-5 text-sm">
                            See suggestions
                        </p>

                    </div>
                </div>

                {/* MAIN CONTENT */}
                <div
                    className={`min-h-[calc(100vh-4rem)] min-w-0 transition-all duration-500 ease-in-out ${
                        sideNavOpen
                            ? "w-full md:w-[calc(100%-15rem)] md:ml-60 lg:w-[85%] lg:ml-[15%]"
                            : "w-full ml-0"
                    }`}
                >

                    {/* WELCOME OFFER */}
                    <div className="w-full min-h-13 bg-yellow-400 border-b border-t flex flex-wrap items-center justify-center gap-x-2 gap-y-1 px-3 py-2 text-center">
                        <div className="min-w-0 sm:min-w-30 h-8 bg-white rounded-lg flex items-center justify-center px-2 text-sm sm:text-base">
                            Welcome Offer
                        </div>

                        <p className="text-xs sm:text-sm md:text-base">
                            Access to everything. Now 30% off.{" "}
                            <span className="font-bold underline cursor-pointer">
                                Upgrade Now
                            </span>
                        </p>
                    </div>

                    {/* MIDDLE CONTENT */}
                    <div className="w-full min-h-[85vh] flex flex-col xl:flex-row">

                        {/* POSTS SECTION */}
                        <div className="w-full xl:w-[75%] min-w-0 min-h-[85vh] justify-center flex">

                            <div className="w-full sm:w-[90%] lg:w-[85%] xl:w-[80%] min-w-0 min-h-[10vh] px-4 sm:px-0">

                                {/* FOR YOU / FEATURED */}
                                <div className="w-full h-14 sm:h-[7vh] border-gray-200 mt-3 sm:mt-5 border-b flex items-center gap-4">
                                    <button className="min-w-15 h-full hover:border-b-2 cursor-pointer text-gray-600 hover:text-black">
                                        For you
                                    </button>

                                    <button className="min-w-15 h-full hover:border-b-2 cursor-pointer text-gray-600 hover:text-black">
                                        Featured
                                    </button>
                                </div>

                                {/* POSTS */}
                                {posts.map((post) => (
                                    <Link
                                        key={post._id}
                                        to={`/singlepost/${post._id}`}
                                        className="block"
                                    >
                                        <div className="w-full min-h-20 border-gray-200 border-t flex justify-between gap-3 sm:gap-5 border-b py-6 sm:py-8 lg:py-10">

                                            {/* POST TEXT */}
                                            <div className="flex-1 min-w-0">

                                                <div className="flex items-center min-w-0">
                                                    <div className="size-7 rounded-[50%] border border-gray-500 mr-2 shrink-0"></div>

                                                    <div className="flex flex-wrap items-center min-w-0">
                                                        <p className="hover:underline text-xs sm:text-sm mt-1 break-words">
                                                            {(() => {
                                                                const author = authors[post.author];

                                                                if (!author) return "Loading author...";

                                                                return `${author.first_name || ""} ${author.last_name || ""}`.trim()
                                                                    || author.name
                                                                    || author.email
                                                                    || "Unknown author";
                                                            })()}
                                                        </p>

                                                        <span className="text-gray-500 ml-2 text-xs sm:text-sm">
                                                            {post.createdAt
                                                                ? new Date(post.createdAt).toLocaleDateString("en-US", {
                                                                    month: "short",
                                                                    day: "numeric",
                                                                })
                                                                : ""}
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="min-w-0">
                                                    <h1 className="my-3 sm:my-5 post-heading break-words">
                                                        {post.title}
                                                    </h1>

                                                    <p className="mb-3 sm:mb-5 text-gray-500 line-clamp-3 overflow-hidden text-sm sm:text-base lg:text-lg post-sub break-words">
                                                        {post.content}
                                                    </p>
                                                </div>

                                                {/* POST ACTIONS */}
                                                <div className="w-full sm:w-[90%] min-h-8 flex items-center justify-between gap-2">

                                                    <div className="w-auto sm:w-[45%] flex justify-between items-center gap-3 sm:gap-4">

                                                        <img
                                                            src="/star.png"
                                                            alt=""
                                                            className="size-4 shrink-0"
                                                        />

                                                        <div className="flex items-center shrink-0">
                                                            <img
                                                                src="/wave-hand.png"
                                                                alt=""
                                                                className="cursor-pointer size-5 mr-1"
                                                            />
                                                            <p className="text-gray-900 text-xs sm:text-sm">
                                                                {post.claps || 0}
                                                            </p>
                                                        </div>

                                                        <div className="flex items-center shrink-0">
                                                            <img
                                                                src="/speech-bubble.png"
                                                                alt=""
                                                                className="cursor-pointer size-4 mr-1"
                                                            />
                                                            <p className="text-gray-900 text-xs sm:text-sm">
                                                                0
                                                            </p>
                                                        </div>

                                                        <div className="hidden sm:flex items-center shrink-0">
                                                            <img
                                                                src="/exchange.png"
                                                                alt=""
                                                                className="cursor-pointer size-4 mt-0.5 mr-1"
                                                            />
                                                            <p className="text-gray-900 text-sm">
                                                                0
                                                            </p>
                                                        </div>

                                                    </div>

                                                    <div className="w-auto sm:w-[25%] flex items-center justify-end sm:justify-between gap-2 sm:gap-3">

                                                        <img
                                                            src="/dislike.png"
                                                            alt=""
                                                            className="cursor-pointer size-5 sm:size-6"
                                                        />

                                                        <img
                                                            src="/save-instagram.png"
                                                            alt=""
                                                            className="cursor-pointer size-5 sm:size-6"
                                                        />

                                                        <img
                                                            src="/menu-dots.png"
                                                            alt=""
                                                            className="cursor-pointer size-5 sm:size-6"
                                                        />

                                                    </div>
                                                </div>

                                            </div>

                                            {/* POST IMAGE */}
                                            <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-[25%] md:h-35 mt-6 sm:mt-8 md:mt-10 shrink-0 flex items-center justify-center overflow-hidden">
                                                <img
                                                    src={post.image.url}
                                                    alt=""
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>

                                        </div>
                                    </Link>
                                ))}

                            </div>
                        </div>

                        {/* STAFF PICKS - DESKTOP */}
                        <div className="hidden xl:block w-[25%] min-w-0 self-start">

                            <div className="w-full bg-white">

                                <div className="w-full pt-10 pb-5 border-b border-gray-200 border-l pl-7 pr-4">

                                    <p className="text-lg font-semibold mb-5">
                                        Staff Picks
                                    </p>

                                    <div className="flex">
                                        <div className="size-5 rounded-[50%] border shrink-0"></div>
                                        <p className="ml-1 text-sm mb-3">
                                            George Joseph
                                        </p>
                                    </div>

                                    <p className="font-bold text-[20px]">Let's.</p>
                                    <p className="text-[14px] text-gray-500">Sept 13</p>

                                    <div className="flex mt-3">
                                        <div className="size-5 rounded-[50%] border shrink-0"></div>
                                        <p className="text-sm ml-1">
                                            In ZORA by Malia Niguel Hoskin, Ph.D
                                        </p>
                                    </div>

                                    <h1 className="text-md font-bold mt-3">
                                        Nikole Hannah-Jones Is Asking the Question Black parents know too well: What do we sacrifice?
                                    </h1>

                                    <p className="text-[14px] text-gray-500 mt-5">4d ago</p>

                                    <div className="flex mt-3">
                                        <div className="size-5 rounded-[50%] border shrink-0"></div>
                                        <p className="text-sm ml-1">
                                            In Zenit by Json McBride
                                        </p>
                                    </div>

                                    <h1 className="text-md font-bold mt-3">
                                        What Makes A Place Scared?
                                    </h1>

                                    <p className="text-[14px] text-gray-500 mt-5">6d ago</p>

                                    <p className="cursor-pointer hover:underline text-gray-500 text-sm mt-5">
                                        See full list
                                    </p>

                                    <p className="font-bold text-[18px] mt-7">
                                        Trending On Medium
                                    </p>

                                    <div className="flex mt-3">
                                        <div className="size-5 rounded-[50%] border shrink-0"></div>
                                        <p className="text-sm ml-1">
                                            Netflix Technnology Blog
                                        </p>
                                    </div>

                                    <h1 className="text-lg font-bold mt-3">
                                        Netflix Stratum Media Processing: Automated Container Right-Sizing
                                    </h1>

                                    <p className="text-[14px] text-gray-500 mt-5">1d ago</p>

                                    <div className="flex mt-3">
                                        <div className="size-5 rounded-[50%] border shrink-0"></div>
                                        <p className="text-sm ml-1">
                                            In UX Planet by Nick Babich
                                        </p>
                                    </div>

                                    <h1 className="text-lg font-bold mt-3">
                                        I Tested Opus 5.5 at Every Effort Level for UI Design
                                    </h1>

                                    <p className="text-[14px] text-gray-500 mt-5">1d ago</p>

                                    <div className="flex mt-3">
                                        <div className="size-5 rounded-[50%] border shrink-0"></div>
                                        <p className="text-sm ml-1">
                                            In Realworld AI Use Cases by Chris Dunlop
                                        </p>
                                    </div>

                                    <h1 className="text-lg font-bold mt-3">
                                        Jev Explained Through Real Examples
                                    </h1>

                                    <p className="text-[14px] text-gray-500 mt-5">1d ago</p>

                                    <p className="cursor-pointer hover:underline text-gray-500 text-sm mt-5">
                                        See all trending full stories
                                    </p>

                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );

}
export default LandingPage