import { Link,useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
function SinglePost() {
    const [openClapModal, setOpenClapModal] = useState(false);
    const [openCommentModal, setOpenCommentModal] = useState(false);
    const [sideNavOpen, setSideNavOpen] = useState(true);
    const [activeNav, setActiveNav] = useState(0);


    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const [posts, setPosts] = useState([]);
    
const [authorPosts, setAuthorPosts] = useState([]);

    const [user, setUser] = useState(null);
    const [authors, setAuthors] = useState({});
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState("");


    const [replyingTo, setReplyingTo] = useState(null);
    const [replyText, setReplyText] = useState("");



    const [formData, setFormData] = useState({ first_name: "", last_name: "", pronoun: "", bio: "" });

    const userId = localStorage.getItem("userId");

const navigate = useNavigate();
    const signOut = async ()=>{
        localStorage.removeItem("accessToken");
localStorage.removeItem("userId");

navigate("/");
    }
    const handleClap = async () => {
        try {
            const token = localStorage.getItem("accessToken");
            const response = await fetch(
                `https://backendblog-1kjf.onrender.com/medium/content/posts/${postId}/clap`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                },
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to clap");
            }

            setPost(data.data);
            alert("Clap added!")
        } catch (error) {
            console.error("Error clapping post:", error);
        }
    };

    const handleComment = async () => {
        if (!commentText.trim()) {
            alert("Please write a comment first");
            return;
        }

        try {
            const token = localStorage.getItem("accessToken");

            const response = await fetch(
                `https://backendblog-1kjf.onrender.com/medium/comment/${postId}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        content: commentText
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to post comment");
            }

            setCommentText("");
            await getPostComments();
            alert("Comment posted successfully!");

        } catch (error) {
            console.error("Error posting comment:", error);
            alert(error.message);
        }
    };


    const handleReply = async (commentId) => {
    if (!replyText.trim()) {
        alert("Please write a reply first");
        return;
    }

    try {
        const token = localStorage.getItem("accessToken");

        const response = await fetch(
            `https://backendblog-1kjf.onrender.com/medium/comment/${postId}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    content: replyText,
                    replyTo: commentId
                })
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Failed to send reply");
        }

        setReplyText("");
        setReplyingTo(null);
        await getPostComments();

        alert("Reply posted successfully!");
    } catch (error) {
        console.error("Error posting reply:", error);
        alert(error.message);
    }
};


    const getPostComments = async () => {
        try {
            const response = await fetch(
                `https://backendblog-1kjf.onrender.com/medium/comment/comments/${postId}`
            );

            const data = await response.json();
            console.log("POST COMMENTS:", data.data);

            if (response.ok) {
                setComments(data.data || []);
            } else {
                console.error("Failed to fetch comments:", data.message);
            }
        } catch (error) {
            console.error("Error fetching comments:", error);
        }
    };

  
useEffect(() => {
    const getPosts = async () => {
        try {
            const response = await fetch(
                "https://backendblog-1kjf.onrender.com/medium/content/posts/"
            );

            const data = await response.json();

            console.log("ALL RECOMMENDED POSTS:", data);

            if (response.ok) {
                setPosts(data.data || []);
            }
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };

    getPosts();
}, []);


    useEffect(() => {
        const getPost = async () => {
            try {
                const response = await fetch(
                    "https://backendblog-1kjf.onrender.com/medium/content/posts/"
                );

                const data = await response.json();

                if (response.ok) {
                    const selectedPost = (data.data || []).find(
                        (item) => item._id === postId
                    );

                    setPost(selectedPost || null);
                }
            } catch (error) {
                console.error("Error fetching post:", error);
            }
        };

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
                            console.log("SINGLE POST AUTHOR DATA:", userData);

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
        


        

const getAuthorPosts = async () => {
    try {
        const response = await fetch(
            "https://backendblog-1kjf.onrender.com/medium/content/posts/"
        );

        const data = await response.json();

        if (response.ok) {
            const allPosts = data.data || [];

            const currentPost = allPosts.find(
                (item) => item._id === postId
            );

            if (currentPost) {
                const filteredPosts = allPosts.filter(
                    (item) =>
                        item.author === currentPost.author &&
                        item._id !== postId
                );

                setAuthorPosts(filteredPosts);
            }
        }
    } catch (error) {
        console.error("Error fetching author's posts:", error);
    }
};



        getPost();
        getAuthors();
        getAuthorPosts();
        getPostComments();
    }, [postId]);

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
//     return (
//         <div>
//             <div className="w-full h-17 bg-white ">
//                <nav className="w-full h-17 border-b border-gray-300 flex fixed bg-white  items-center px-6">
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
//                             <div onClick={() => setActiveNav(1)} className="w-full h-10 flex px-6 mt-13 items-center cursor-pointer hover:text-black text-gray-600">
//                                 <img src={activeNav === 1 ? `/clicked-home.png` : `/home.png`} alt="" className="size-5" />
//                                 <p className="ml-1">Home</p>
//                             </div>
//                         </Link>


//                         <div className="w-full h-10 flex px-6 mt-3 items-center cursor-pointer hover:text-black text-gray-600">
//                             <img src="/bookmark.png" alt="" className="size-5" />
//                             <p className="ml-1">Library</p>
//                         </div>


//                         <Link to='/profiles'>
//                             <div onClick={() => setActiveNav(2)} className="w-full h-10 flex px-6 mt-3 items-center cursor-pointer hover:text-black text-gray-600">
//                                 <img src={activeNav === 2 ? `/people.png` : `/clicked--user.png`} alt="" className="size-5" />
//                                 <p className="ml-1">Profile</p>
//                             </div>
//                         </Link>


//                         <div className="w-full h-10 flex px-6 mt-3 items-center cursor-pointer hover:text-black text-gray-600">
//                             <img src={`/file.png`} alt="" className="size-5" />
//                             <p className="ml-1">Stories</p>
//                         </div>


//                         <div className="w-full h-10 flex px-6 mt-3  items-center cursor-pointer  hover:text-black text-gray-600">
//                             <img src="/stats.png" alt="" className="size-5" />
//                             <p className="ml-1">Stats</p>
//                         </div>


//                         <div className="w-full h-20 flex px-6 border-t border-b border-gray-300 mt-3 hover:text-black text-gray-600  items-center cursor-pointer">
//                             <img src="/tic-tac-toe.png" alt="" className="size-5" />
//                             <p className="ml-1">Games</p>
//                         </div>


//                         <div className="w-full h-10 flex px-6 mt-5  items-center hover:text-black text-gray-600  cursor-pointer">
//                             <img src="/users.png" alt="" className="size-5" />
//                             <p className="ml-1">Following</p>
//                         </div>


//                         <div className="w-full h-10 flex px-6 mt-5 items-center hover:text-black text-gray-600 cursor-pointer">
//                             <img src="/plus.png" alt="" className="size-4" />
//                             <p className="ml-1 text-gray-500">Find writers and publications to follow.</p>
//                         </div>

//                         <p className="text-center underline text-gray-600 cursor-pointer mt-1">See suggestiions</p>

//                     </div>
//                 </div>

//                 <div className={` min-h-[91vh] transition-all duration-500 ease-in-out ${sideNavOpen ? "w-[85.5%] ml-59" : "w-full ml-0"}`}>
//                     <div className="w-full h-13 bg-yellow-400 border-b border-t flex items-center justify-center">
//                         <div className="min-w-30 h-8 bg-white rounded-lg flex items-center px-2 mr-3">Welcome Offer</div>
//                         <p>Access to everything. Now 30% off. <span className="font-bold underline">Upgrade Now</span></p>
//                     </div>

//                     {/* midlle */}
//                     <div className="w-full min-h-[85vh] mt-10 ">

//                         <div className="w-full min-h-[57vh]  px-30 ">
//                             <div className="w-full min-h-50  flex">
//                                 <div className="w-[25%] min-h-50  px-10">
//                                     <div className="size-15 border rounded-[50%]"></div>
//                                     <p className="font-semibold text-lg mt-2">{authors[post?.author]
//                                         ? `${authors[post.author].first_name || ""} ${authors[post.author].last_name || ""}`.trim()
//                                         : "Author"}</p>
//                                     <p className="text-gray-500 text-md"> {authors[post?.author]?.bio || "..."}</p>

//                                     <p className="text-md underline cursor-pointer mt-2">Follow Writer</p>
//                                 </div>


//                                 {!post ? (
//                                     <p className="p-5 text-gray-500">Loading post...</p>
//                                 ) : (
//                                     <div className="w-[75%] min-h-50  px-10">
//                                         <div className="w-45 p-2 flex justify-between h-10 border rounded-md border-gray-300">
//                                             <img src="/star.png" alt="" className="size-5" />
//                                             <p>Member-only story</p>
//                                         </div>

//                                         <div className="w-150 h-7 flex justify-between mt-5">
//                                             <div className="border  border-gray-500 rounded-xl  min-w-25 h-7 flex">
//                                                 <div className="w-[70%] h-6.5 border-r border-gray-500 text-center">Men</div>

//                                                 <div className="w-[30%] cursor-pointer   h-6.5 font-bold text-xl flex items-center pl-1 text-gray-500">+</div>
//                                             </div>

//                                             <div className="border  border-gray-500 rounded-xl  min-w-25 h-7 flex">
//                                                 <div className="w-[70%] h-6.5 border-r border-gray-500 text-center">Women</div>

//                                                 <div className="w-[30%] cursor-pointer   h-6.5 font-bold text-xl flex items-center pl-1 text-gray-500">+</div>
//                                             </div>

//                                             <div className="border  border-gray-500 rounded-xl  min-w-25 h-7 flex">
//                                                 <div className="w-[70%] h-6.5 border-r border-gray-500 text-center">Crime</div>

//                                                 <div className="w-[30%] cursor-pointer   h-6.5 font-bold text-xl flex items-center pl-1 text-gray-500">+</div>
//                                             </div>

//                                             <div className="border  border-gray-500 rounded-xl  min-w-25 h-7 flex">
//                                                 <div className="w-[70%] h-6.5 border-r border-gray-500 text-center">Internet</div>

//                                                 <div className="w-[30%] cursor-pointer   h-6.5 font-bold text-xl flex items-center pl-1 text-gray-500">+</div>
//                                             </div>

//                                             <div className="border  border-gray-500 rounded-xl  min-w-25 h-7 flex">
//                                                 <div className="min-w-[70%] h-6.5 border-r border-gray-500 text-center px-1">Feminism</div>

//                                                 <div className="w-[30%] cursor-pointer   h-6.5 font-bold text-xl flex items-center pl-1 text-gray-500">+</div>
//                                             </div>
//                                         </div>

//                                         <h1 className="postName mt-5">{post.title}</h1>

//                                         {/* <p className="postSub text-gray-500">The law is catching up with technology…and men are about to find out</p> */}

//                                         <div className="w-[65%] h-10 mt-10  flex justify-between items-center">
//                                             <div className="size-10 border rounded-[50%]"></div>
//                                             <p className="text-md">{authors[post.author]
//                                                 ? `${authors[post.author].first_name || ""} ${authors[post.author].last_name || ""}`.trim()
//                                                 || authors[post.author].name
//                                                 || authors[post.author].email
//                                                 : "Author"}</p>
//                                             <button className="rounded-xl min-h-6 w-18 border p-1 cursor-pointer">Follow</button>
//                                             <p className="text-gray-500 text-sm">7 min read .</p>
//                                             <p className="text-gray-500 text-sm">{post.createdAt
//                                                 ? new Date(post.createdAt).toLocaleDateString(
//                                                     "en-US",
//                                                     {
//                                                         year: "numeric",
//                                                         month: "long",
//                                                         day: "numeric",
//                                                     }
//                                                 )
//                                                 : ""}</p>
//                                         </div>

//                                         {/* base icons  */}

//                                         <div className="w-full h-10 border-t border-b border-gray-500 mt-12 flex ">
//                                             <div className="w-full h-8 flex  justify-between">
//                                                 <div className="w-[30%] h-8  flex justify-between items-center ">
//                                                     <div className="flex"><img src="/hands-clapping.png" onClick={handleClap} alt="Clap" className="size-5 cursor-pointer mr-1" /> <p onClick={() => setOpenClapModal(true)} className="text-gray-500 text-sm cursor-pointer hover:text-black">{post.claps || 0}</p></div>
//                                                     <div className="flex"><img src="/speech-bubble.png" alt="" className="size-4 cursor-pointer mr-1 mt-0.5" /> <p onClick={() => setOpenCommentModal(true)} className="text-gray-500 text-sm cursor-pointer hover:text-black">0</p></div>
//                                                     <div className="flex"><img src="/exchange.png" alt="" className="size-4 cursor-pointer mt-0.5 mr-1" /> <p className="text-gray-500 text-sm cursor-pointer hover:text-black">0</p></div>
//                                                 </div>

//                                                 <div className="w-[25%] h-8  flex items-center justify-between ">
//                                                     <img src="/save-instagram.png" alt="" className="size-6 cursor-pointer mr-1 mt-0.5" />
//                                                     <img src="/play.png" alt="" className="size-6 cursor-pointer mr-1 mt-0.5" />
//                                                     <img src="/share.png" alt="" className="size-6 cursor-pointer mr-1 mt-0.5" />
//                                                     <img src="/menu-dots.png" alt="" className="size-6 cursor-pointer mr-1 mt-0.5" />
//                                                 </div>
//                                             </div>
//                                         </div>


//                                     </div>
//                                 )}
//                             </div>
//                         </div>


//                         <div className="w-full min-h-20  mt-2">
//                             <div className="w-[80%] h-180  ml-33">
//                                 {post?.image?.url && (
//                                     <img src={post.image.url} alt={post.title} className="w-full h-full object-cover  rounded-lg mb-8" />
//                                 )}
//                                 {/* <img src="https://images.unsplash.com/photo-1678134017317-4edd53da833d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHNlYSUyMHNpdGV8ZW58MHx8MHx8fDA%3D" className="w-full h-full object-cover rounded-lg mb-8" alt="" /> */}
//                             </div>

//                             <div className="w-full min-h-50 flex justify-center">
//                                 <div className="post-content w-[50%] min-h-50 leading-8 whitespace-pre-wrap mt-15 text-left">
//                                     {post?.content || ""}
//                                 </div>
//                             </div>


//                             <div className="w-full h-10 flex justify-center">
//                                 <div className="w-[50%] h-10 border-t border-b border-gray-500 mt-12 flex ">
//                                     <div className="w-full h-8 flex  justify-between">
//                                         <div className="w-[30%] h-8  flex justify-between items-center ">
//                                             <div onClick={handleClap} className="flex"><img src="/hands-clapping.png" alt="" className="size-5 cursor-pointer mr-1" /> <p className="text-gray-900 text-sm">{post?.claps || 0}</p></div>
//                                             <div className="flex"><img src="/speech-bubble.png" alt="" className="size-4 cursor-pointer mr-1 mt-0.5" /> <p className="text-gray-900 text-sm">0</p></div>
//                                             <div className="flex"><img src="/exchange.png" alt="" className="size-4 cursor-pointer mt-0.5 mr-1" /> <p className="text-gray-900 text-sm">0</p></div>
//                                         </div>

//                                         <div className="w-[25%] h-8  flex items-center justify-between ">
//                                             <img src="/save-instagram.png" alt="" className="size-6 cursor-pointer mr-1 mt-0.5" />
//                                             <img src="/play.png" alt="" className="size-6 cursor-pointer mr-1 mt-0.5" />
//                                             <img src="/share.png" alt="" className="size-6 cursor-pointer mr-1 mt-0.5" />
//                                             <img src="/menu-dots.png" alt="" className="size-6 cursor-pointer mr-1 mt-0.5" />
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>




//                         <div className="w-full min-h-30 justify-center flex mt-20">
//                             <div className="w-[50%] h-100 rounded-2xl bg-amber-50 py-5">
//                                 <div className="w-full min-h-10 justify-center flex">
//                                     <div className="size-15 rounded-[50%] border"></div>
//                                 </div>

//                                 <p className="text-2xl font-bold text-center mt-2">{authors[post?.author]
//                                     ? `${authors[post?.author].first_name || ""} ${authors[post.author].last_name || ""}`.trim()
//                                     || authors[post.author].name
//                                     || authors[post.author].email
//                                     : "Author"}</p>


//                                 <div className="w-full min-h-10 justify-center flex mt-3">
//                                     <p><span>130k</span> followers .</p>
//                                     <p className="ml-5"><span>794</span> following</p>
//                                 </div>


//                                 <div className="w-full min-h-10 justify-center flex mt-3 px-35">
//                                     <p className="text-center">.{authors[post?.author]?.bio || "..."}</p>
//                                 </div>

//                                 <div className="w-full min-h-10 flex justify-center">
//                                     <button className="w-100 cursor-pointer mt-5 h-10 rounded-3xl bg-black text-white">Follow</button>
//                                 </div>

//                                 <div className="w-full min-h-10 flex justify-center">
//                                     <button className="w-100 cursor-pointer mt-5 h-10 rounded-3xl border">Buy me a coffee</button>
//                                 </div>
//                             </div>
//                         </div>

//                         <div className="w-full min-h-10 border-t border-gray-300 mt-15 flex justify-center">
//                             <div className="w-[50%] min-h-10 ">
//                                 <div className="w-full h-10 flex justify-between items-center">
//                                     <p className="text-3xl font-semibold">Responses (<span>0</span>)</p>
//                                     <img src="/insurance.png" alt="" className="size-5" />
//                                 </div>

//                                 <div className="flex mt-3">
//                                     <div className="rounded-[50%] size-7 mr-2 border"></div>
//                                     <p>{user ? `${user.first_name} ${user.last_name}` : "Loading..."} </p>
//                                 </div>


//                                 <div className="w-full min-h-30 outline-none mt-3 rounded-md bg-gray-200 px-5 mb-10 py-2">
//                                     <textarea value={commentText} onChange={(e) => setCommentText(e.target.value)} placeholder="What are your thoughts?" className="w-full h-20 py-2 outline-none rounded-md bg-gray-200 px-5 "></textarea>

//                                     <div className="flex justify-between w-full h-10">
//                                         <div className="w-25 h-10 justify-between flex  items-center">
//                                             <img src="/bold-text-option.png" alt="" className="size-5 cursor-pointer" />
//                                             <img src="/italic.png" alt="" className="size-5 cursor-pointer" />
//                                             <img src="/link.png" alt="" className="size-5 cursor-pointer" />
//                                         </div>

//                                         <div className="flex">
//                                             <button className="rounded-3xl w-20 min-h-9 cursor-pointer mr-3 p-1">Cancel</button>
//                                             <button onClick={handleComment} className="rounded-3xl w-20 min-h-9 cursor-pointer bg-black text-white p-1">Resposnd</button>
//                                         </div>
//                                     </div>
//                                 </div>


//                                 {comments.map((comment) => (
//                                     <div key={comment._id} className="w-full min-h-30 border-t border-b border-gray-400 py-4">
//                                         <div className="flex w-full h-10 items-center">
//                                             <div className="size-10 rounded-[50%] border"></div>
//                                             <div className="w-[89%] h-10 ml-2">
//                                                 <div><p>{comment.user?.first_name ? `${comment.user.first_name} ${comment.user.last_name || ""}`.trim() : "User"}</p></div>
//                                                 <div><p className="text-gray-500">{comment.createdAt ? new Date(comment.createdAt).toLocaleDateString() : ""}</p></div>
//                                             </div>
//                                             <img src="/menu-dots.png" alt="" className="size-8 cursor-pointer" />
//                                         </div>

//                                         <p className="mt-5">{comment.content}</p>
//                                         {/* target */}
//                                         <div className="w-55 h-10  mt-5">
//                                             <div className="w-full h-8  flex justify-between items-center ">
//                                                 <div onClick={handleClap} className="flex"><img src="/hands-clapping.png" alt="" className="size-5 cursor-pointer mr-1" /> <p className="text-gray-900 text-sm">{post?.claps || 0}</p></div>
//                                                 <div className="flex"><img src="/speech-bubble.png" alt="" className="size-4 cursor-pointer mr-1 mt-0.5" /> <p className="text-gray-900 text-sm">0 replies</p></div>
//                                                 <div className="flex">  <button onClick={() => { setReplyingTo(replyingTo === comment._id ? null : comment._id); setReplyText(""); }} className="cursor-pointer text-sm font-semibold text-gray-600 hover:text-black">
//                                                     Reply
//                                                 </button>

//                                                 </div>

//                                             </div>

//                                         </div>

//                                         {/* {replyingTo === comment._id && (


//                                             <div className="w-full min-h-30 outline-none mt-3 rounded-md bg-gray-100 px-5 mb-10 py-2">
//                                                 <textarea value={replyText} onChange={(e) => setReplyText(e.target.value)} placeholder="Write a reply..." rows={3} className="w-full h-20 outline-none py-2 rounded-md bg-gray-100 px-5 "></textarea>

//                                                 <div className="flex justify-between w-full h-10">
//                                                     <div className="w-25 h-10 justify-between flex  items-center">
//                                                         <img src="/bold-text-option.png" alt="" className="size-5 cursor-pointer" />
//                                                         <img src="/italic.png" alt="" className="size-5 cursor-pointer" />
//                                                         <img src="/link.png" alt="" className="size-5 cursor-pointer" />
//                                                     </div>

//                                                     <div className="flex">
//                                                         <button className="rounded-3xl w-20 min-h-9 cursor-pointer mr-3 p-1">Cancel</button>
//                                                         <button onClick={() => handleReply(comment._id)} className="rounded-3xl w-20 min-h-9 cursor-pointer bg-black text-white p-1">Resposnd</button>
//                                                     </div>
//                                                 </div>
//                                             </div>

//                                         )} */}
//                                     </div>

//                                 ))}





//                             </div>
//                         </div>

//                         <button className="w-40 h-10 rounded-3xl border ml-83 mt-10">See all responses</button>

//                         <div className="w-full min-h-10 mt-15 flex justify-center">
//                             <div className="w-[50%] min-h-10">
//                                 <p className="text-[25px] font-semibold mb-8">More from <span>{authors[post?.author]
//                                     ? `${authors[post?.author].first_name || ""} ${authors[post.author].last_name || ""}`.trim()
//                                     || authors[post.author].name
//                                     || authors[post.author].email
//                                     : "Author"}</span></p>


                               
// <div className="w-full min-h-20 grid grid-cols-2 gap-10">
//     {authorPosts.map((authorPost) => (
//         <Link
//             to={`/singlepost/${authorPost._id}`}
//             key={authorPost._id}
//         >
//             <div className="min-h-70 mb-7 cursor-pointer">
//                 {authorPost.image?.url && (
//                     <img
//                         src={authorPost.image.url}
//                         alt={authorPost.title || ""}
//                         className="w-full h-45 object-cover rounded-md"
//                     />
//                 )}

//                 <div className="w-full min-h-7 flex py-5 items-center">
//                     <div className="rounded-full size-8 border"></div>

//                     <p className="ml-2 text-sm">
//                         {authors[authorPost.author]
//                             ? `${authors[authorPost.author].first_name || ""} ${authors[authorPost.author].last_name || ""}`.trim()
//                             : "Author"}
//                     </p>

//                     <p className="text-sm text-gray-500 ml-2">
//                         {authorPost.createdAt
//                             ? new Date(authorPost.createdAt).toLocaleDateString(
//                                 "en-US",
//                                 { month: "short", day: "numeric" }
//                             )
//                             : ""}
//                     </p>
//                 </div>

//                 <p className="text-xl font-bold">
//                     {authorPost.title}
//                 </p>

//                 <p className="text-md text-gray-700 pt-2 line-clamp-2">
//                     {authorPost.content}
//                 </p>

//                 <div className="h-8 flex justify-between mt-5">
//                     <div className="flex items-center">
//                         <img src="/hands-clapping.png" alt="" className="size-5 mr-1"/>
//                         <p className="text-sm">{authorPost.claps || 0}</p>
//                     </div>

//                     <img src="/menu-dots.png" alt="" className="size-6" />
//                 </div>
//             </div>
//         </Link>
//     ))}
// </div>


//                                 <button className="min-w-40 h-10 rounded-3xl border mt-10 px-4 cursor-pointer py-2">See all from Y.L Wolfe</button>

//                             </div>
//                         </div>


//                         <div className="w-full min-h-10  border-t border-gray-300 mt-30 flex justify-center">
//                             <div className="w-[50%]  min-h-10 border-b border-gray-300">
//                                 <p className="text-[25px] font-semibold my-10">Recommended from Medium</p>
// {/* target  */}
//                                 <div className="w-full  min-h-20 grid grid-cols-2 gap-10">
                                   
//                                        {posts.map((post)=>(
//                                              <div key={post._id} to={`/singlepost/${post._id}`} className="shadow-md pb-3 min-h-70 mb-7">
//                                             <div className="w-full h-45 border-gray-300 border-b"><img src={post.image.url} alt='' className="w-full h-full object-cover"/></div>
//                                             <div className="w-full min-h-7 flex px-2  py-5 flex items-center">
//                                                 <div className="rounded-full  size-8 border"></div>
//                                                 <p className="ml-2 text-sm">                {(() => {
//                                                             const author = authors[post.author];

//                                                             if (!author) return "Loading author...";

//                                                             return `${author.first_name || ""} ${author.last_name || ""}`.trim()
//                                                                 || author.name
//                                                                 || author.email
//                                                                 || "Unknown author";
//                                                         })()}</p>
//                                                 <p className="text-sm text-gray-500 ml-2">{post.createdAt
//                                                         ? new Date(post.createdAt).toLocaleDateString("en-US", {
//                                                             month: "short",
//                                                             day: "numeric",
//                                                         })
//                                                         : ""}</p>
//                                             </div>
//                                             <p className="text-xl font-bold px-2">{post.title}</p>
//                                             <p className="text-md text-gray-700 pt-2 line-clamp-3 overflow-hidden px-2">{post.content}</p>
//                                             <div className="full h-8 flex  justify-between mt-10 px-2">
//                                                 <div className="w-[60%] h-8  flex justify-between items-center">
//                                                     <img src="/star.png" alt="" className="size-4" />
//                                                     <div className="flex"><img src="/wave-hand.png" alt="" className="cursor-pointer size-5 mr-1" /> <p className="text-gray-900 text-sm">3.3K</p></div>
//                                                     <div className="flex"><img src="/speech-bubble.png" alt="" className="cursor-pointer size-4 mr-1 mt-0.5" /> <p className="text-gray-900 text-sm">105</p></div>
//                                                     <div className="flex"><img src="/exchange.png" alt="" className="cursor-pointer size-4 mt-0.5 mr-1" /> <p className="text-gray-900 text-sm">238</p></div>
//                                                 </div>

//                                                 <div className="w-[22%] h-8 flex items-center justify-between">
//                                                     <img src="/dislike.png" alt="" className="cursor-pointer size-6 mr-1 mt-0.5" />
//                                                     <img src="/menu-dots.png" alt="" className="cursor-pointer size-6 mr-1 mt-0.5" />
//                                                 </div>
//                                             </div>
//                                         </div>
//                                        ))}
                                    

//                                 </div>



//                             </div>
//                         </div>

//                         <button className="min-w-40 h-10 rounded-3xl border mt-10 px-4 cursor-pointer py-2 ml-83">See all Recommendations</button>

//                         <div className="w-full min-h-10 py-5 border-t border-gray-300 mt-30 py-6 px-100">
//                             <ul className="flex">
//                                 <li className="text-sm text-gray-500 cursor-pointer ml-3">Help</li>
//                                 <li className="text-sm text-gray-500 cursor-pointer ml-3">Status</li>
//                                 <li className="text-sm text-gray-500 cursor-pointer ml-3">Careers</li>
//                                 <li className="text-sm text-gray-500 cursor-pointer ml-3">Press</li>
//                                 <li className="text-sm text-gray-500 cursor-pointer ml-3">Blog</li>
//                                 <li className="text-sm text-gray-500 cursor-pointer ml-3">Store</li>
//                                 <li className="text-sm text-gray-500 cursor-pointer ml-3">Privacy</li>
//                                 <li className="text-sm text-gray-500 cursor-pointer ml-3">Rules</li>
//                                 <li className="text-sm text-gray-500 cursor-pointer ml-3">Terms</li>
//                                 <li className="text-sm text-gray-500 cursor-pointer ml-3">Text to speech</li>
//                             </ul>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {openClapModal && (
//                 <div className={`fixed inset-0 z-50 flex items-center  bg-black/50 backdrop-blur-xs transition-opacity duration-3000 ${openClapModal ? "opacity-100" : "opacity-0"} `}>

//                     <div className='w-[40%] h-[72vh] bg-white rounded-md ml-105'>
//                         <img src="/cancel.png" alt="" onClick={() => setOpenClapModal(false)} className="ml-147 mt-5 text-gray-400 hover:text-gray-700 size-5 font-bold cursor-pointer" />
//                         <p className="text-center text-[20px] claps text-gray-700 font-semibold Join-Medium"><span>13,220</span> claps from from  <span>1,046</span> people</p>

//                         <div className="w-full min-h-50 flex justify-center mt-10">
//                             <div className="w-[85%] h-100 overflow-y-scroll">
//                                 <div className="w-full min-h-20 flex">
//                                     <div className="flex">
//                                         <div className="rounded-full size-13 border">
//                                             <div className="size-6 mt-8 ml-8 bg-green-600 rounded-full pt-1">
//                                                 <img src="/clap-hands.png" className="size-4 ml-1.5" alt="" />
//                                             </div>
//                                         </div>


//                                     </div>

//                                     <p className="font-semibold text-md ml-2">Onuegbusucccess</p>
//                                 </div>

//                                 <div className="w-full min-h-20 flex">
//                                     <div className="flex">
//                                         <div className="rounded-full size-13 border">
//                                             <div className="size-6 mt-8 ml-8 bg-green-600 rounded-full pt-1 ">
//                                                 <img src="/clap-hands.png" className="size-4 ml-1.5 " alt="" />
//                                             </div>
//                                         </div>


//                                     </div>

//                                     <div className=" w-80  ml-1">
//                                         <p className="font-semibold text-md ml-2">Onuegbusucccess</p>
//                                         <p className="text-sm ml-2 text-gray-500">Enterprise Architect, Telecommunications industry</p>
//                                     </div>

//                                     <button className="rounded-3xl w-20 h-9 cursor-pointer ml-18 border">Follow</button>

//                                 </div>




//                             </div>
//                         </div>

//                     </div>
//                 </div>
//             )}


//             {openCommentModal && (
//                 <div className={`fixed inset-0 z-50 flex items-right justify-end bg-white/75  transition-opacity duration-3000 ${openCommentModal ? "opacity-100" : "opacity-0"} `}>

//                     <div className={`w-[25%] h-[100vh] bg-white shadow-lg px-5 overflow-y-scroll  transition-transform duration-[800ms] ease-out ${openCommentModal ? "translate-x-0" : "translate-x-full"}`}>
//                         <div className="w-full h-10 flex  pt-5 justify-between">
//                             <p className="text-center text-[20px] claps text-gray-700 font-semibold Join-Medium">Responses</p>
//                             <div className="flex">
//                                 <img src="/insurance.png" alt="" className="size-4 mr-5" />
//                                 <img src="/cancel.png" alt="" onClick={() => setOpenCommentModal(false)} className="  text-gray-400 hover:text-gray-700 size-4 font-bold cursor-pointer" />
//                             </div>
//                         </div>

//                         <div className="w-full min-h-30 outline-none mt-3 rounded-md bg-gray-200 px-5 mb-10 mt-5 py-4">
//                             <textarea value={commentText} onChange={(e) => setCommentText(e.target.value)} placeholder="What are your thoughts?" className="w-full h-20 outline-none rounded-md bg-gray-200 px-3 "></textarea>

//                             <div className="flex justify-between w-full h-10">
//                                 <div className="w-25 h-10 justify-between flex  items-center">
//                                     <img src="/bold-text-option.png" alt="" className="size-5 cursor-pointer" />
//                                     <img src="/italic.png" alt="" className="size-5 cursor-pointer" />
//                                     <img src="/link.png" alt="" className="size-5 cursor-pointer" />
//                                 </div>

//                                 <div className="flex">
//                                     <button className="rounded-3xl w-20 min-h-9 cursor-pointer mr-3 p-1">Cancel</button>
//                                     <button onClick={handleComment} className="rounded-3xl min-w-20 min-h-9 cursor-pointer bg-gray-300 text-white p-2">Respond</button>
//                                 </div>
//                             </div>
//                         </div>

//                         <div className="flex cursor-pointer">
//                             <p className="uppercase font-bold text-md">Most Relevant</p>
//                             <img src="/down-arrow.png" alt="" className="size-4 mt-1 ml-3" />
//                         </div>


//                         {comments.map((comment) => (
//                             <div key={comment._id} className="w-full min-h-30 border-t border-b border-gray-300 py-4 mt-5" >
//                                 <div className="flex w-full min-h-10 items-center">
//                                     <div className="size-10 rounded-full border"></div>

//                                     <div className="ml-2 flex-1">
//                                         <p className="font-semibold">
//                                             {comment.user?.first_name ? `${comment.user.first_name} ${comment.user.last_name || ""}`.trim() : "User"}
//                                         </p>

//                                         <p className="text-gray-500 text-sm">
//                                             {comment.createdAt ? new Date(comment.createdAt).toLocaleDateString() : ""}
//                                         </p>
//                                     </div>

//                                     <img src="/menu-dots.png" alt="Options" className="size-6 cursor-pointer" />
//                                 </div>

//                                 <p className="mt-5 whitespace-pre-wrap">
//                                     {comment.content}
//                                 </p>
//                             </div>
//                         ))}

//                     </div>
//                 </div>
//             )}
//         </div>
//     )






return (
    <div className="w-full min-h-screen overflow-x-hidden bg-white">
        <div className="w-full h-17">
            <nav className="w-full h-17 border-b border-gray-300 flex fixed top-0 left-0 z-40 bg-white items-center justify-between px-3 sm:px-6">
                <div className="flex items-center min-w-0">
                    <img onClick={() => setSideNavOpen(!sideNavOpen)} src="/menu.png" alt="" className="size-5 sm:size-6 cursor-pointer shrink-0" />
                    <Link to='/landingpage'>
                        <h1 className="text-2xl sm:text-[35px] Medium-font font-bold ml-3 sm:ml-5">Medium</h1>
                    </Link>

                    <div className="hidden md:flex px-4 w-40 lg:w-60 h-10 rounded-3xl bg-gray-50 items-center ml-4 lg:ml-7">
                        <img src="/search.png" alt="" className="size-6 lg:size-7" />
                        <input type="text" placeholder="Search" className="w-full min-w-0 ml-2 outline-none h-6 bg-transparent" />
                    </div>
                </div>

                <div className="flex items-center gap-2 sm:gap-4 shrink-0">
                    <button className="hidden lg:flex min-w-20 px-3 h-9 bg-black cursor-pointer rounded-3xl items-center">
                        <img src="/grid.png" alt="" className="size-6 mr-1" />
                        <p className="text-white text-[14px]">Get app</p>
                    </button>

                    <Link to="/write">
                        <div className="flex items-center cursor-pointer">
                            <img src="/edit.png" alt="" className="size-5" />
                            <p className="hidden sm:block text-[15px] ml-2 hover:text-gray-600">Write</p>
                        </div>
                    </Link>

                    <img src="/bell.png" alt="" className="hidden sm:block size-5 sm:size-6" />

                    <button onClick={signOut} className="font-bold p-2 shadow-sm cursor-pointer hover:bg-gray-50 transition-colors duration-250 text-sm sm:text-base lg:text-lg">
                        Sign out
                    </button>
                </div>
            </nav>
        </div>

        <div className="w-full min-h-[91vh] flex">
            {/* left */}
            <div className={`w-[250px] sm:w-[260px] max-w-[85vw] h-[calc(100vh-4.25rem)] left-0 top-17 z-30 bg-white fixed transition-transform duration-500 ease-in-out ${sideNavOpen ? "translate-x-0" : "-translate-x-full"}`}>
                <div className="w-full bg-white h-full overflow-y-auto border-r border-gray-200">
                    <Link to='/landingpage'>
                        <div onClick={() => setActiveNav(1)} className="w-full min-h-10 flex px-4 sm:px-6 mt-13 items-center cursor-pointer hover:text-black text-gray-600">
                            <img src={activeNav === 1 ? `/clicked-home.png` : `/home.png`} alt="" className="size-5 shrink-0" />
                            <p className="ml-2">Home</p>
                        </div>
                    </Link>

                    <div className="w-full min-h-10 flex px-4 sm:px-6 mt-3 items-center cursor-pointer hover:text-black text-gray-600">
                        <img src="/bookmark.png" alt="" className="size-5 shrink-0" />
                        <p className="ml-2">Library</p>
                    </div>

                    <Link to='/profiles'>
                        <div onClick={() => setActiveNav(2)} className="w-full min-h-10 flex px-4 sm:px-6 mt-3 items-center cursor-pointer hover:text-black text-gray-600">
                            <img src={activeNav === 2 ? `/people.png` : `/clicked--user.png`} alt="" className="size-5 shrink-0" />
                            <p className="ml-2">Profile</p>
                        </div>
                    </Link>

                    <div className="w-full min-h-10 flex px-4 sm:px-6 mt-3 items-center cursor-pointer hover:text-black text-gray-600">
                        <img src="/file.png" alt="" className="size-5 shrink-0" />
                        <p className="ml-2">Stories</p>
                    </div>

                    <div className="w-full min-h-10 flex px-4 sm:px-6 mt-3 items-center cursor-pointer hover:text-black text-gray-600">
                        <img src="/stats.png" alt="" className="size-5 shrink-0" />
                        <p className="ml-2">Stats</p>
                    </div>

                    <div className="w-full min-h-16 flex px-4 sm:px-6 border-t border-b border-gray-300 mt-3 hover:text-black text-gray-600 items-center cursor-pointer">
                        <img src="/tic-tac-toe.png" alt="" className="size-5 shrink-0" />
                        <p className="ml-2">Games</p>
                    </div>

                    <div className="w-full min-h-10 flex px-4 sm:px-6 mt-5 items-center hover:text-black text-gray-600 cursor-pointer">
                        <img src="/users.png" alt="" className="size-5 shrink-0" />
                        <p className="ml-2">Following</p>
                    </div>

                    <div className="w-full min-h-10 flex px-4 sm:px-6 mt-5 items-start hover:text-black text-gray-600 cursor-pointer">
                        <img src="/plus.png" alt="" className="size-4 shrink-0 mt-1" />
                        <p className="ml-2 text-gray-500 text-sm">Find writers and publications to follow.</p>
                    </div>

                    <p className="text-center underline text-gray-600 cursor-pointer mt-2 text-sm">See suggestiions</p>
                </div>
            </div>

            <div className={`min-h-[91vh] min-w-0 transition-all duration-500 ease-in-out ${sideNavOpen ? "w-full md:w-[calc(100%-260px)] md:ml-[260px]" : "w-full ml-0"}`}>
                <div className="w-full min-h-13 bg-yellow-400 border-b border-t flex flex-wrap items-center justify-center gap-2 px-3 py-2 text-center">
                    <div className="min-w-0 h-8 bg-white rounded-lg flex items-center px-2 text-sm sm:text-base">Welcome Offer</div>
                    <p className="text-sm sm:text-base">Access to everything. Now 30% off. <span className="font-bold underline">Upgrade Now</span></p>
                </div>

                {/* middle */}
                <div className="w-full min-h-[85vh] mt-5 sm:mt-10">
                    <div className="w-full min-h-[57vh] px-4 sm:px-8 lg:px-12 xl:px-20">
                        <div className="w-full min-h-50 flex flex-col md:flex-row gap-6">
                            <div className="w-full md:w-[25%] min-w-0 min-h-20 md:min-h-50 px-0 md:px-3 lg:px-5">
                                <div className="size-12 sm:size-15 border rounded-full"></div>
                                <p className="font-semibold text-lg mt-2">
                                    {authors[post?.author]
                                        ? `${authors[post.author].first_name || ""} ${authors[post.author].last_name || ""}`.trim()
                                        : "Author"}
                                </p>
                                <p className="text-gray-500 text-sm sm:text-md">{authors[post?.author]?.bio || "..."}</p>
                                <p className="text-md underline cursor-pointer mt-2">Follow Writer</p>
                            </div>

                            {!post ? (
                                <p className="p-5 text-gray-500">Loading post...</p>
                            ) : (
                                <div className="w-full md:w-[75%] min-w-0 min-h-50 px-0 md:px-3 lg:px-5">
                                    <div className="w-fit max-w-full p-2 flex items-center gap-2 h-10 border rounded-md border-gray-300 text-sm sm:text-base">
                                        <img src="/star.png" alt="" className="size-5 shrink-0" />
                                        <p>Member-only story</p>
                                    </div>

                                    <div className="w-full mt-5 flex flex-wrap gap-2">
                                        <div className="border border-gray-500 rounded-xl min-w-20 sm:min-w-25 h-7 flex">
                                            <div className="w-[70%] h-6.5 border-r border-gray-500 text-center text-sm">Men</div>
                                            <div className="w-[30%] cursor-pointer h-6.5 font-bold text-xl flex items-center justify-center text-gray-500">+</div>
                                        </div>

                                        <div className="border border-gray-500 rounded-xl min-w-20 sm:min-w-25 h-7 flex">
                                            <div className="w-[70%] h-6.5 border-r border-gray-500 text-center text-sm">Women</div>
                                            <div className="w-[30%] cursor-pointer h-6.5 font-bold text-xl flex items-center justify-center text-gray-500">+</div>
                                        </div>

                                        <div className="border border-gray-500 rounded-xl min-w-20 sm:min-w-25 h-7 flex">
                                            <div className="w-[70%] h-6.5 border-r border-gray-500 text-center text-sm">Crime</div>
                                            <div className="w-[30%] cursor-pointer h-6.5 font-bold text-xl flex items-center justify-center text-gray-500">+</div>
                                        </div>

                                        <div className="border border-gray-500 rounded-xl min-w-20 sm:min-w-25 h-7 flex">
                                            <div className="w-[70%] h-6.5 border-r border-gray-500 text-center text-sm">Internet</div>
                                            <div className="w-[30%] cursor-pointer h-6.5 font-bold text-xl flex items-center justify-center text-gray-500">+</div>
                                        </div>

                                        <div className="border border-gray-500 rounded-xl min-w-25 h-7 flex">
                                            <div className="min-w-[70%] h-6.5 border-r border-gray-500 text-center px-1 text-sm">Feminism</div>
                                            <div className="w-[30%] cursor-pointer h-6.5 font-bold text-xl flex items-center justify-center text-gray-500">+</div>
                                        </div>
                                    </div>

                                    <h1 className="postName mt-5 break-words">{post.title}</h1>

                                    <div className="w-full sm:w-[90%] lg:w-[65%] min-h-10 mt-6 sm:mt-10 flex flex-wrap sm:flex-nowrap gap-3 items-center">
                                        <div className="size-10 border rounded-full shrink-0"></div>
                                        <p className="text-sm sm:text-md min-w-0 break-words">
                                            {authors[post.author]
                                                ? `${authors[post.author].first_name || ""} ${authors[post.author].last_name || ""}`.trim()
                                                || authors[post.author].name
                                                || authors[post.author].email
                                                : "Author"}
                                        </p>
                                        <button className="rounded-xl min-h-7 w-18 border p-1 cursor-pointer">Follow</button>
                                        <p className="text-gray-500 text-sm whitespace-nowrap">7 min read .</p>
                                        <p className="text-gray-500 text-sm">
                                            {post.createdAt
                                                ? new Date(post.createdAt).toLocaleDateString("en-US", {
                                                    year: "numeric",
                                                    month: "long",
                                                    day: "numeric",
                                                })
                                                : ""}
                                        </p>
                                    </div>

                                    {/* base icons */}
                                    <div className="w-full min-h-10 border-t border-b border-gray-500 mt-8 sm:mt-12 flex items-center">
                                        <div className="w-full min-h-8 flex justify-between items-center gap-3">
                                            <div className="w-[55%] sm:w-[30%] min-w-0 flex justify-between items-center">
                                                <div className="flex items-center">
                                                    <img src="/hands-clapping.png" onClick={handleClap} alt="Clap" className="size-5 cursor-pointer mr-1" />
                                                    <p onClick={() => setOpenClapModal(true)} className="text-gray-500 text-sm cursor-pointer hover:text-black">{post.claps || 0}</p>
                                                </div>
                                                <div className="flex items-center">
                                                    <img src="/speech-bubble.png" alt="" className="size-4 cursor-pointer mr-1" />
                                                    <p onClick={() => setOpenCommentModal(true)} className="text-gray-500 text-sm cursor-pointer hover:text-black">0</p>
                                                </div>
                                                <div className="flex items-center">
                                                    <img src="/exchange.png" alt="" className="size-4 cursor-pointer mr-1" />
                                                    <p className="text-gray-500 text-sm cursor-pointer hover:text-black">0</p>
                                                </div>
                                            </div>

                                            <div className="w-[40%] sm:w-[25%] min-w-0 flex items-center justify-end gap-3">
                                                <img src="/save-instagram.png" alt="" className="size-5 sm:size-6 cursor-pointer" />
                                                <img src="/play.png" alt="" className="size-5 sm:size-6 cursor-pointer" />
                                                <img src="/share.png" alt="" className="size-5 sm:size-6 cursor-pointer" />
                                                <img src="/menu-dots.png" alt="" className="size-5 sm:size-6 cursor-pointer" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="w-full min-h-20 mt-2 px-4 sm:px-8 lg:px-12 xl:px-20">
                        <div className="w-full sm:w-[90%] lg:w-[80%] mx-auto min-h-40 sm:h-180">
                            {post?.image?.url && (
                                <img src={post.image.url} alt={post.title} className="w-full max-h-[65vh] sm:max-h-none sm:h-180 object-cover rounded-lg mb-8" />
                            )}
                        </div>

                        <div className="w-full min-h-50 flex justify-center px-1 sm:px-4">
                            <div className="post-content w-full sm:w-[85%] lg:w-[65%] xl:w-[50%] min-h-50 leading-7 sm:leading-8 whitespace-pre-wrap mt-8 sm:mt-15 text-left">
                                {post?.content || ""}
                            </div>
                        </div>

                        <div className="w-full min-h-10 flex justify-center px-4">
                            <div className="w-full sm:w-[85%] lg:w-[65%] xl:w-[50%] min-h-10 border-t border-b border-gray-500 mt-12 flex items-center">
                                <div className="w-full min-h-8 flex justify-between items-center gap-3">
                                    <div className="w-[55%] sm:w-[30%] flex justify-between items-center">
                                        <div onClick={handleClap} className="flex items-center"><img src="/hands-clapping.png" alt="" className="size-5 cursor-pointer mr-1" /><p className="text-gray-900 text-sm">{post?.claps || 0}</p></div>
                                        <div className="flex items-center"><img src="/speech-bubble.png" alt="" className="size-4 cursor-pointer mr-1" /><p className="text-gray-900 text-sm">0</p></div>
                                        <div className="flex items-center"><img src="/exchange.png" alt="" className="size-4 cursor-pointer mr-1" /><p className="text-gray-900 text-sm">0</p></div>
                                    </div>

                                    <div className="w-[40%] sm:w-[25%] flex items-center justify-end gap-3">
                                        <img src="/save-instagram.png" alt="" className="size-5 sm:size-6 cursor-pointer" />
                                        <img src="/play.png" alt="" className="size-5 sm:size-6 cursor-pointer" />
                                        <img src="/share.png" alt="" className="size-5 sm:size-6 cursor-pointer" />
                                        <img src="/menu-dots.png" alt="" className="size-5 sm:size-6 cursor-pointer" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-full min-h-30 justify-center flex mt-16 sm:mt-20 px-4">
                        <div className="w-full sm:w-[85%] md:w-[70%] lg:w-[50%] min-h-80 rounded-2xl bg-amber-50 py-5 px-4 sm:px-8">
                            <div className="w-full min-h-10 justify-center flex">
                                <div className="size-15 rounded-full border"></div>
                            </div>

                            <p className="text-xl sm:text-2xl font-bold text-center mt-2">
                                {authors[post?.author]
                                    ? `${authors[post?.author].first_name || ""} ${authors[post.author].last_name || ""}`.trim()
                                    || authors[post.author].name
                                    || authors[post.author].email
                                    : "Author"}
                            </p>

                            <div className="w-full min-h-10 justify-center flex flex-wrap gap-2 mt-3 text-sm sm:text-base">
                                <p><span>130k</span> followers .</p>
                                <p><span>794</span> following</p>
                            </div>

                            <div className="w-full min-h-10 justify-center flex mt-3 px-2 sm:px-8">
                                <p className="text-center">{authors[post?.author]?.bio || "..."}</p>
                            </div>

                            <div className="w-full min-h-10 flex justify-center">
                                <button className="w-full sm:w-80 max-w-full cursor-pointer mt-5 h-10 rounded-3xl bg-black text-white">Follow</button>
                            </div>

                            <div className="w-full min-h-10 flex justify-center">
                                <button className="w-full sm:w-80 max-w-full cursor-pointer mt-5 h-10 rounded-3xl border">Buy me a coffee</button>
                            </div>
                        </div>
                    </div>

                    <div className="w-full min-h-10 border-t border-gray-300 mt-15 flex justify-center px-4">
                        <div className="w-full sm:w-[85%] lg:w-[65%] xl:w-[50%] min-h-10">
                            <div className="w-full min-h-10 flex justify-between items-center gap-3">
                                <p className="text-2xl sm:text-3xl font-semibold">Responses (<span>0</span>)</p>
                                <img src="/insurance.png" alt="" className="size-5 shrink-0" />
                            </div>

                            <div className="flex mt-3 items-center">
                                <div className="rounded-full size-7 mr-2 border shrink-0"></div>
                                <p className="break-words">{user ? `${user.first_name} ${user.last_name}` : "Loading..."}</p>
                            </div>

                            <div className="w-full min-h-30 outline-none mt-3 rounded-md bg-gray-200 px-3 sm:px-5 mb-10 py-2">
                                <textarea value={commentText} onChange={(e) => setCommentText(e.target.value)} placeholder="What are your thoughts?" className="w-full min-h-20 py-2 outline-none rounded-md bg-gray-200 px-2 sm:px-5"></textarea>

                                <div className="flex flex-wrap justify-between gap-3 w-full min-h-10">
                                    <div className="w-25 h-10 justify-between flex items-center">
                                        <img src="/bold-text-option.png" alt="" className="size-5 cursor-pointer" />
                                        <img src="/italic.png" alt="" className="size-5 cursor-pointer" />
                                        <img src="/link.png" alt="" className="size-5 cursor-pointer" />
                                    </div>

                                    <div className="flex">
                                        <button className="rounded-3xl w-20 min-h-9 cursor-pointer mr-2 sm:mr-3 p-1">Cancel</button>
                                        <button onClick={handleComment} className="rounded-3xl w-20 min-h-9 cursor-pointer bg-black text-white p-1">Resposnd</button>
                                    </div>
                                </div>
                            </div>

                            {comments.map((comment) => (
                                <div key={comment._id} className="w-full min-h-30 border-t border-b border-gray-400 py-4">
                                    <div className="flex w-full min-h-10 items-center">
                                        <div className="size-10 rounded-full border shrink-0"></div>
                                        <div className="flex-1 min-w-0 ml-2">
                                            <p>{comment.user?.first_name ? `${comment.user.first_name} ${comment.user.last_name || ""}`.trim() : "User"}</p>
                                            <p className="text-gray-500 text-sm">{comment.createdAt ? new Date(comment.createdAt).toLocaleDateString() : ""}</p>
                                        </div>
                                        <img src="/menu-dots.png" alt="" className="size-7 sm:size-8 cursor-pointer shrink-0" />
                                    </div>

                                    <p className="mt-5 whitespace-pre-wrap break-words">{comment.content}</p>

                                    <div className="w-full sm:w-55 min-h-10 mt-5">
                                        <div className="w-full min-h-8 flex justify-between items-center gap-3">
                                            <div onClick={handleClap} className="flex"><img src="/hands-clapping.png" alt="" className="size-5 cursor-pointer mr-1" /><p className="text-gray-900 text-sm">{post?.claps || 0}</p></div>
                                            <div className="flex"><img src="/speech-bubble.png" alt="" className="size-4 cursor-pointer mr-1 mt-0.5" /><p className="text-gray-900 text-sm">0 replies</p></div>
                                            <div className="flex">
                                                <button onClick={() => { setReplyingTo(replyingTo === comment._id ? null : comment._id); setReplyText(""); }} className="cursor-pointer text-sm font-semibold text-gray-600 hover:text-black">
                                                    Reply
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="w-full flex justify-center px-4">
                        <button className="min-w-40 h-10 rounded-3xl border mt-10 px-4">See all responses</button>
                    </div>

                    <div className="w-full min-h-10 mt-15 flex justify-center px-4">
                        <div className="w-full sm:w-[85%] lg:w-[65%] xl:w-[50%] min-h-10">
                            <p className="text-xl sm:text-[25px] font-semibold mb-8">
                                More from <span>{authors[post?.author]
                                    ? `${authors[post?.author].first_name || ""} ${authors[post.author].last_name || ""}`.trim()
                                    || authors[post.author].name
                                    || authors[post.author].email
                                    : "Author"}</span>
                            </p>

                            <div className="w-full min-h-20 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-10">
                                {authorPosts.map((authorPost) => (
                                    <Link to={`/singlepost/${authorPost._id}`} key={authorPost._id}>
                                        <div className="min-h-70 mb-7 cursor-pointer">
                                            {authorPost.image?.url && (
                                                <img src={authorPost.image.url} alt={authorPost.title || ""} className="w-full h-45 object-cover rounded-md" />
                                            )}

                                            <div className="w-full min-h-7 flex flex-wrap gap-2 py-5 items-center">
                                                <div className="rounded-full size-8 border shrink-0"></div>
                                                <p className="text-sm">
                                                    {authors[authorPost.author]
                                                        ? `${authors[authorPost.author].first_name || ""} ${authors[authorPost.author].last_name || ""}`.trim()
                                                        : "Author"}
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    {authorPost.createdAt
                                                        ? new Date(authorPost.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })
                                                        : ""}
                                                </p>
                                            </div>

                                            <p className="text-lg sm:text-xl font-bold break-words">{authorPost.title}</p>
                                            <p className="text-md text-gray-700 pt-2 line-clamp-2">{authorPost.content}</p>

                                            <div className="min-h-8 flex justify-between mt-5">
                                                <div className="flex items-center">
                                                    <img src="/hands-clapping.png" alt="" className="size-5 mr-1" />
                                                    <p className="text-sm">{authorPost.claps || 0}</p>
                                                </div>
                                                <img src="/menu-dots.png" alt="" className="size-6" />
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>

                            <button className="min-w-40 h-10 rounded-3xl border mt-5 px-4 cursor-pointer py-2">See all from Y.L Wolfe</button>
                        </div>
                    </div>

                    <div className="w-full min-h-10 border-t border-gray-300 mt-20 sm:mt-30 flex justify-center px-4">
                        <div className="w-full sm:w-[85%] lg:w-[65%] xl:w-[50%] min-h-10 border-b border-gray-300">
                            <p className="text-xl sm:text-[25px] font-semibold my-8 sm:my-10">Recommended from Medium</p>

                            <div className="w-full min-h-20 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-10">
                                {posts.map((post) => (
                                    <div key={post._id} className="shadow-md pb-3 min-h-70 mb-7 min-w-0">
                                        <div className="w-full h-45 border-gray-300 border-b">
                                            {post.image?.url && (
                                                <img src={post.image.url} alt="" className="w-full h-full object-cover" />
                                            )}
                                        </div>

                                        <div className="w-full min-h-7 flex flex-wrap gap-2 px-2 py-5 items-center">
                                            <div className="rounded-full size-8 border shrink-0"></div>
                                            <p className="text-sm">
                                                {(() => {
                                                    const author = authors[post.author];
                                                    if (!author) return "Loading author...";
                                                    return `${author.first_name || ""} ${author.last_name || ""}`.trim()
                                                        || author.name
                                                        || author.email
                                                        || "Unknown author";
                                                })()}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                {post.createdAt
                                                    ? new Date(post.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })
                                                    : ""}
                                            </p>
                                        </div>

                                        <p className="text-lg sm:text-xl font-bold px-2 break-words">{post.title}</p>
                                        <p className="text-md text-gray-700 pt-2 line-clamp-3 overflow-hidden px-2">{post.content}</p>

                                        <div className="min-h-8 flex justify-between mt-8 px-2 gap-2">
                                            <div className="w-[65%] min-w-0 flex justify-between items-center">
                                                <img src="/star.png" alt="" className="size-4" />
                                                <div className="flex items-center"><img src="/wave-hand.png" alt="" className="size-5 mr-1" /><p className="text-gray-900 text-sm">3.3K</p></div>
                                                <div className="flex items-center"><img src="/speech-bubble.png" alt="" className="size-4 mr-1" /><p className="text-gray-900 text-sm">105</p></div>
                                                <div className="flex items-center"><img src="/exchange.png" alt="" className="size-4 mr-1" /><p className="text-gray-900 text-sm">238</p></div>
                                            </div>

                                            <div className="w-[25%] flex items-center justify-end gap-2">
                                                <img src="/dislike.png" alt="" className="size-5 sm:size-6 cursor-pointer" />
                                                <img src="/menu-dots.png" alt="" className="size-5 sm:size-6 cursor-pointer" />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="w-full flex justify-center px-4">
                        <button className="min-w-40 h-10 rounded-3xl border mt-10 px-4 cursor-pointer py-2">See all Recommendations</button>
                    </div>

                    <div className="w-full min-h-10 py-6 px-4 sm:px-8 lg:px-12 xl:px-20 border-t border-gray-300 mt-20 sm:mt-30">
                        <ul className="flex flex-wrap gap-x-4 gap-y-3">
                            <li className="text-sm text-gray-500 cursor-pointer">Help</li>
                            <li className="text-sm text-gray-500 cursor-pointer">Status</li>
                            <li className="text-sm text-gray-500 cursor-pointer">Careers</li>
                            <li className="text-sm text-gray-500 cursor-pointer">Press</li>
                            <li className="text-sm text-gray-500 cursor-pointer">Blog</li>
                            <li className="text-sm text-gray-500 cursor-pointer">Store</li>
                            <li className="text-sm text-gray-500 cursor-pointer">Privacy</li>
                            <li className="text-sm text-gray-500 cursor-pointer">Rules</li>
                            <li className="text-sm text-gray-500 cursor-pointer">Terms</li>
                            <li className="text-sm text-gray-500 cursor-pointer">Text to speech</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        {openClapModal && (
            <div className={`fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/50 backdrop-blur-xs transition-opacity duration-3000 ${openClapModal ? "opacity-100" : "opacity-0"}`}>
                <div className="w-full sm:w-[85%] md:w-[65%] lg:w-[45%] xl:w-[40%] max-w-2xl max-h-[85vh] overflow-y-auto bg-white rounded-md p-4 sm:p-6">
                    <div className="w-full flex justify-end">
                        <img src="/cancel.png" alt="" onClick={() => setOpenClapModal(false)} className="size-5 text-gray-400 hover:text-gray-700 font-bold cursor-pointer" />
                    </div>

                    <p className="text-center text-base sm:text-[20px] claps text-gray-700 font-semibold Join-Medium">
                        <span>13,220</span> claps from <span>1,046</span> people
                    </p>

                    <div className="w-full min-h-50 flex justify-center mt-8 sm:mt-10">
                        <div className="w-full sm:w-[85%] max-h-80 overflow-y-auto">
                            <div className="w-full min-h-20 flex items-start gap-3">
                                <div className="rounded-full size-12 sm:size-13 border shrink-0 relative">
                                    <div className="size-6 absolute -bottom-1 -right-1 bg-green-600 rounded-full flex items-center justify-center">
                                        <img src="/clap-hands.png" className="size-4" alt="" />
                                    </div>
                                </div>
                                <p className="font-semibold text-md">Onuegbusucccess</p>
                            </div>

                            <div className="w-full min-h-20 flex items-start gap-3">
                                <div className="rounded-full size-12 sm:size-13 border shrink-0 relative">
                                    <div className="size-6 absolute -bottom-1 -right-1 bg-green-600 rounded-full flex items-center justify-center">
                                        <img src="/clap-hands.png" className="size-4" alt="" />
                                    </div>
                                </div>

                                <div className="flex-1 min-w-0">
                                    <p className="font-semibold text-md">Onuegbusucccess</p>
                                    <p className="text-sm text-gray-500">Enterprise Architect, Telecommunications industry</p>
                                </div>

                                <button className="rounded-3xl min-w-16 sm:w-20 h-9 cursor-pointer border text-sm">Follow</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )}

        {openCommentModal && (
            <div className={`fixed inset-0 z-50 flex justify-end bg-white/75 transition-opacity duration-3000 ${openCommentModal ? "opacity-100" : "opacity-0"}`}>
                <div className={`w-full sm:w-[85%] md:w-[60%] lg:w-[40%] xl:w-[25%] h-screen bg-white shadow-lg px-4 sm:px-5 overflow-y-auto transition-transform duration-[800ms] ease-out ${openCommentModal ? "translate-x-0" : "translate-x-full"}`}>
                    <div className="w-full min-h-10 flex pt-5 justify-between items-center gap-3">
                        <p className="text-center text-xl claps text-gray-700 font-semibold Join-Medium">Responses</p>
                        <div className="flex items-center shrink-0">
                            <img src="/insurance.png" alt="" className="size-4 mr-5" />
                            <img src="/cancel.png" alt="" onClick={() => setOpenCommentModal(false)} className="text-gray-400 hover:text-gray-700 size-4 font-bold cursor-pointer" />
                        </div>
                    </div>

                    <div className="w-full min-h-30 outline-none mt-5 rounded-md bg-gray-200 px-3 sm:px-5 mb-10 py-4">
                        <textarea value={commentText} onChange={(e) => setCommentText(e.target.value)} placeholder="What are your thoughts?" className="w-full h-20 outline-none rounded-md bg-gray-200 px-2 sm:px-3"></textarea>

                        <div className="flex flex-wrap justify-between gap-3 w-full min-h-10">
                            <div className="w-25 h-10 justify-between flex items-center">
                                <img src="/bold-text-option.png" alt="" className="size-5 cursor-pointer" />
                                <img src="/italic.png" alt="" className="size-5 cursor-pointer" />
                                <img src="/link.png" alt="" className="size-5 cursor-pointer" />
                            </div>

                            <div className="flex">
                                <button className="rounded-3xl w-20 min-h-9 cursor-pointer mr-2 sm:mr-3 p-1">Cancel</button>
                                <button onClick={handleComment} className="rounded-3xl min-w-20 min-h-9 cursor-pointer bg-gray-300 text-white p-2">Respond</button>
                            </div>
                        </div>
                    </div>

                    <div className="flex cursor-pointer">
                        <p className="uppercase font-bold text-md">Most Relevant</p>
                        <img src="/down-arrow.png" alt="" className="size-4 mt-1 ml-3" />
                    </div>

                    {comments.map((comment) => (
                        <div key={comment._id} className="w-full min-h-30 border-t border-b border-gray-300 py-4 mt-5">
                            <div className="flex w-full min-h-10 items-center">
                                <div className="size-10 rounded-full border shrink-0"></div>

                                <div className="ml-2 flex-1 min-w-0">
                                    <p className="font-semibold">
                                        {comment.user?.first_name ? `${comment.user.first_name} ${comment.user.last_name || ""}`.trim() : "User"}
                                    </p>
                                    <p className="text-gray-500 text-sm">
                                        {comment.createdAt ? new Date(comment.createdAt).toLocaleDateString() : ""}
                                    </p>
                                </div>

                                <img src="/menu-dots.png" alt="Options" className="size-6 cursor-pointer shrink-0" />
                            </div>

                            <p className="mt-5 whitespace-pre-wrap break-words">{comment.content}</p>
                        </div>
                    ))}
                </div>
            </div>
        )}
    </div>
)

}
export default SinglePost