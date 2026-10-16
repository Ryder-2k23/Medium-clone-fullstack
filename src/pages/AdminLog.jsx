import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import SideNav from '../components/sideNav';
import AdminSection from "../components/adminSection";


function AdminLog() {
    const [posts, setPosts] = useState([]);
    const [authors, setAuthors] = useState({});
    

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
    //     <div className="w-full min-h-100  flex">
            
    //         <SideNav/>
    //         <div className="w-[80%] h-191  ml-80">
    //              <AdminSection/>

    //             <div className="w-full min-h-20 py-10 flex justify-center">
    //                 <div className="w-100 h-50 shadow rounded-md bg-gray-100 px-5 py-10">
    //                     <p className="text-gray-400 text-2xl font-semibold">Total Posts</p>
    //                    <div className="w-full min-h-5  text-center mt-8">
    //                      <span className="text-gray-400 text-5xl font-bold">{posts.length}</span>
    //                    </div>
    //                 </div>
    //             </div>


    //             <div className="w-full min-h-100  px-10">
    //                 <div className="w-full h-15 ">
    //                     <p className="text-2xl font-semibold">Recent Posts:</p>
    //                 </div>

    //                 <div className="w-full min-h-30 grid pb-8 grid-cols-3 gap-3">
    //                     {posts.map((post)=>(
    //                       <Link key={post._id} className="block" to={`/singlepost/${post._id}`}>
    //                               <div className="h-120 w-full shadow-md cursor-pointer hover:shadow-lg hover:h-125 transition-all duration-1000 ">
    //                         <div className="w-full h-60 border-gray-200 border-b "><img src={post.image.url} alt="" className="w-full h-full object-cover" /></div>`
    //                         <div className="w-full h-7 px-5 mt-3 text-xl font-semibold line-clamp-3  ">{post.title}</div>
    //                         <div className="w-full min-h-7  px-5 mt-1  line-clamp-3 overflow-hidden ">{post.content}</div>
    //                         <div className="flex items-center px-2 mt-5 shrink-0">
    //                             <img src="/wave-hand.png" alt="" className="cursor-pointer size-5 mr-1" />
    //                             <div className="flex w-full h-5 justify-between">
    //                                 <p className="text-gray-900 text-xs sm:text-sm">
    //                                 Number of claps: <span>{post.claps || 0}</span>   
    //                             </p>
    //                             <p className="text-gray-900  text-xs sm:text-sm">
    //                                 Author: <span>{(() => {
    //                                                             const author = authors[post.author];

    //                                                             if (!author) return "Loading author...";

    //                                                             return `${author.first_name || ""} ${author.last_name || ""}`.trim()
    //                                                                 || author.name
    //                                                                 || author.email
    //                                                                 || "Unknown author";
    //                                                         })()}</span>   
    //                             </p>
    //                             </div>
    //                         </div>
    //                     </div>
    //                       </Link>
    //                     ))}
    //                 </div>
    //             </div>
    //         </div> 
    //     </div>
    // )



    return (
    <div className="w-full min-h-screen flex flex-col lg:flex-row">

        <SideNav />

        <div className="flex-1 min-w-0 min-h-screen lg:ml-80">

            <AdminSection />

            <div className="w-full min-h-20 py-6 sm:py-10 flex justify-center px-4">
                <div className="w-full max-w-md min-h-50 shadow rounded-md bg-gray-100 px-5 py-8 sm:py-10">
                    <p className="text-gray-400 text-xl sm:text-2xl font-semibold">
                        Total Posts
                    </p>

                    <div className="w-full min-h-5 text-center mt-8">
                        <span className="text-gray-400 text-4xl sm:text-5xl font-bold">
                            {posts.length}
                        </span>
                    </div>
                </div>
            </div>

            <div className="w-full min-h-100 px-4 sm:px-6 lg:px-10">

                <div className="w-full min-h-15 py-3">
                    <p className="text-xl sm:text-2xl font-semibold">
                        Recent Posts:
                    </p>
                </div>

                <div className="w-full min-h-30 grid pb-8 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">

                    {posts.map((post) => (
                        <Link
                            key={post._id}
                            className="block min-w-0"
                            to={`/singlepost/${post._id}`}
                        >
                            <div className="min-h-100 sm:min-h-120 w-full shadow-md cursor-pointer hover:shadow-lg transition-shadow duration-300">

                                <div className="w-full h-48 sm:h-60 border-gray-200 border-b">
                                    <img
                                        src={post.image.url}
                                        alt=""
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                <div className="w-full min-h-7 px-4 sm:px-5 mt-3 text-lg sm:text-xl font-semibold line-clamp-3">
                                    {post.title}
                                </div>

                                <div className="w-full min-h-7 px-4 sm:px-5 mt-1 line-clamp-3 overflow-hidden">
                                    {post.content}
                                </div>

                                <div className="flex items-center px-3 mt-5 pb-4">
                                    <img
                                        src="/wave-hand.png"
                                        alt=""
                                        className="cursor-pointer size-5 mr-1 shrink-0"
                                    />

                                    <div className="flex flex-col sm:flex-row w-full min-w-0 justify-between gap-2 sm:gap-3">

                                        <p className="text-gray-900 text-xs sm:text-sm">
                                            Number of claps: <span>{post.claps || 0}</span>
                                        </p>

                                        <p className="text-gray-900 text-xs sm:text-sm break-words">
                                            Author: <span>{(() => {
                                                const author = authors[post.author];

                                                if (!author) return "Loading author...";

                                                return `${author.first_name || ""} ${author.last_name || ""}`.trim()
                                                    || author.name
                                                    || author.email
                                                    || "Unknown author";
                                            })()}</span>
                                        </p>

                                    </div>
                                </div>

                            </div>
                        </Link>
                    ))}

                </div>
            </div>
        </div>
    </div>
)
};
export default AdminLog;
