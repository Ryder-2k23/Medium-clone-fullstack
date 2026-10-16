import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import SideNav from '../components/sideNav';
import AdminSection from "../components/adminSection";


function AdminUserLog() {
    const [users, setUsers] = useState([]);
    const [posts, setPosts] = useState([]);
    let counter = 1
    useEffect(()=>{
        const getUsers = async()=>{
            try {
                const response = await fetch(
                    "https://backendblog-1kjf.onrender.com/medium/auth/users/"
                );
                const data = await response.json();
               
                console.log("All users registered: ", data);
                 if(response.ok){
                    setUsers(data.data || []);
                }
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        }
         const getPosts = async () => {
        try {
            const response = await fetch(
                "https://backendblog-1kjf.onrender.com/medium/content/posts/"
            );

            const data = await response.json();

            if (response.ok) {
                setPosts(data.data || []);
            }
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };

        getPosts();
        getUsers()
    }, [])

//     return (
//         <div className="w-full min-h-100  flex">
            
//             <SideNav/>
//             <div className="w-[80%] h-191  ml-80">
//                  <AdminSection/>

//                 <div className="w-full min-h-20 py-10 flex justify-center">
//                     <div className="w-100 h-50 shadow rounded-md bg-gray-100 px-5 py-10">
//                         <p className="text-gray-400 text-2xl font-semibold">Total users</p>
//                        <div className="w-full min-h-5  text-center mt-8">
//                          <span className="text-gray-400 text-5xl font-bold">{users.length}</span>
//                        </div>
//                     </div>
//                 </div>


                
// <div className="w-full min-h-100 px-10">
//     <div className="w-full mb-5">
//         <p className="text-2xl font-semibold">All Users:</p>
//     </div>

//     <div className="w-full overflow-x-auto shadow rounded-lg">
//         <table className="w-full text-left border-collapse">
//             <thead className="bg-gray-100">
//                 <tr>
//                     <th className="px-6 py-4 text-gray-600 font-semibold">S/N</th>
//                     <th className="px-6 py-4 text-gray-600 font-semibold">Name</th>
//                     <th className="px-6 py-4 text-gray-600 font-semibold">Email</th>
//                     <th className="px-6 py-4 text-gray-600 font-semibold">Contact</th>
//                     <th className="px-6 py-4 text-gray-600 font-semibold">Number of Posts</th>
//                 </tr>
//             </thead>

//             <tbody className="divide-y divide-gray-200">
//                {users.map((user)=>(
//                  <tr key={user._id} className="hover:bg-gray-50">
//                     <td className="px-6 py-4">{counter++}</td>
//                     <td className="px-6 py-4 font-medium">{user.first_name} {user.last_name}</td>
//                     <td className="px-6 py-4">{user.email}</td>
//                     <td className="px-6 py-4">{user.contact}</td>
//                     <td className="px-6 py-4">{posts.filter((post) => post.author === user._id).length}</td>
//                 </tr>
//                ))}

               
//             </tbody>
//         </table>
//     </div>
// </div>

//             </div> 
//         </div>
//     )


return (
    <div className="w-full min-h-screen flex flex-col lg:flex-row">

        <SideNav />

        <div className="flex-1 min-w-0 min-h-screen lg:ml-80">

            <AdminSection />

            <div className="w-full min-h-20 py-6 sm:py-10 flex justify-center px-4">
                <div className="w-full max-w-md min-h-50 shadow rounded-md bg-gray-100 px-5 py-8 sm:py-10">
                    <p className="text-gray-400 text-xl sm:text-2xl font-semibold">
                        Total users
                    </p>

                    <div className="w-full min-h-5 text-center mt-8">
                        <span className="text-gray-400 text-4xl sm:text-5xl font-bold">
                            {users.length}
                        </span>
                    </div>
                </div>
            </div>

            <div className="w-full min-h-100 px-4 sm:px-6 lg:px-10 pb-8">

                <div className="w-full mb-5">
                    <p className="text-xl sm:text-2xl font-semibold">
                        All Users:
                    </p>
                </div>

                <div className="w-full overflow-x-auto shadow rounded-lg">

                    <table className="w-full min-w-[650px] text-left border-collapse">

                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-3 sm:px-6 py-4 text-gray-600 font-semibold">S/N</th>
                                <th className="px-3 sm:px-6 py-4 text-gray-600 font-semibold">Name</th>
                                <th className="px-3 sm:px-6 py-4 text-gray-600 font-semibold">Email</th>
                                <th className="px-3 sm:px-6 py-4 text-gray-600 font-semibold">Contact</th>
                                <th className="px-3 sm:px-6 py-4 text-gray-600 font-semibold">Number of Posts</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-200">
                            {users.map((user) => (
                                <tr key={user._id} className="hover:bg-gray-50">
                                    <td className="px-3 sm:px-6 py-4">{counter++}</td>
                                    <td className="px-3 sm:px-6 py-4 font-medium">{user.first_name} {user.last_name}</td>
                                    <td className="px-3 sm:px-6 py-4">{user.email}</td>
                                    <td className="px-3 sm:px-6 py-4">{user.contact}</td>
                                    <td className="px-3 sm:px-6 py-4">{posts.filter((post) => post.author === user._id).length}</td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>
            </div>

        </div>
    </div>
)
};
export default AdminUserLog;
