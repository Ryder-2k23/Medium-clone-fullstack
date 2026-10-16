// import { Link, useNavigate } from "react-router-dom";
// import { useState,useRef, useEffect } from "react";
// import SideNav from '../components/sideNav';
// import AdminSection from "../components/adminSection";


// function AdminProfile() {
//     const [user, setUser] = useState(null);
//     const fileInputRef = useRef(null);

//     const [formData, setFormData] = useState({ first_name: "", last_name: "", pronoun: "", bio: "" });

//     const userId = localStorage.getItem("userId");
//     return (
//         <div className="w-full min-h-100  flex">
            
//             <SideNav/>
//             <div className="w-[80%] min-h-140  ml-80">
//                 <div className="w-full h-50 border-b relative bg-yellow-400 flex justify-center">
//                     <div className="size-50 border border-5 rounded-full absolute mt-30 bg-white text-7xl py-15 font-bold"><p className="text-center text-gray-400">L</p> <button className="size-10 mt-6 cursor-pointer ml-35 rounded-full bg-green-500 flex justify-center items-center"><img src="/camera.png" alt="" className="size-7" /></button></div>
//                 </div>

//                 <div className="w-full min-h-190 bg-gray-100 flex pb-10 justify-center">
//                    <div>
//                          <p className="text-3xl text-gray-500 mt-10 font-semibold">Alex Morgan</p>
//                         <p className="text-xl text-gray-500">Admin/Editor in chief</p>
//                         <p className=" text-green-700 cursor-pointer hover:underline">Edit profile</p>
//                    </div>
//                         <div className="w-[70%] min-h-80  bg-white px-5 py-10 rounded-md shadow-md mt-40">
//                             <p className="text-3xl">Personal Details</p>
//                             <p>Manage your administrative details and public profile information</p>
//                             <div className="w-full h-full border-t border-gray-200 mt-3 flex">
//                                 <div className="w-[50%] h-45">
//                                     <p className="text-gray-400 text-xl font-semibold">Full name</p>
//                                     <p className="cursive"><span>Alex</span> <span>Morgan</span></p>

//                                     <p className="text-gray-400 text-xl mt-3 font-semibold">Email address</p>
//                                     <p className="cursive"><span>Alex@gmail.com</span></p>

//                                     <p className="text-gray-400 text-xl mt-3 font-semibold">Contact</p>
//                                     <p className="cursive"><span>09078909899</span></p>
//                                 </div>

//                                  <div className="w-[50%] h-45">
//                                     <p className="text-gray-400 text-xl font-semibold">Bio</p>
//                                     <p className="cursive"><span>isicing elit. Atque natus mollitia fuga cupiditate nisi eveniet vero reiciendis sint neque quibusdam aliquam totam consequuntur consectetur illum dicta porro, blanditiis, quasi nulla. consectetur adipisicing elit. Sit sunt aspernatur neque fugiat possimus laudantium fugit repudiandae maiores voluptates! Corporis explicabo non temporibus quam praesentium quae animi nesciunt, voluptate quod!</span> </p>

//                                     <p className="text-gray-400 text-xl mt-3 font-semibold">Joined date</p>
//                                     <p className="cursive"><span>20-03-09</span></p>

//                                 </div>
//                             </div>
//                         </div>
//                 </div>


//             </div> 
//         </div>
//     )
// };
// export default AdminProfile;






import { useState,useRef, useEffect } from "react";
import SideNav from "../components/sideNav";

function AdminProfile() {
    const [user, setUser] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");
const [openModal, setOpenModal] = useState(false);
const [saving, setSaving] = useState(false);

const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    pronoun: "",
    bio: ""
});
const userId = localStorage.getItem("userId");
const token = localStorage.getItem("accessToken");
const fileInputRef = useRef(null);
const [avatarFile, setAvatarFile] = useState(null);
const [avatarPreview, setAvatarPreview] = useState("");

    useEffect(() => {
        const getUser = async () => {
            try {
                if (!userId) {
                    setError("User ID not found. Please log in again.");
                    return;
                }

                const response = await fetch(
                    `https://backendblog-1kjf.onrender.com/medium/auth/users/${userId}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                const result = await response.json();

                if (!response.ok) {
                    throw new Error(
                        result.message || "Failed to fetch user details"
                    );
                }

                // Supports common API response structures
                const userDetails =
                    result.data?.user ??
                    result.data?.data ??
                    result.data;

                setUser(userDetails);

            } catch (error) {
                console.error("Error fetching user:", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        getUser();
    }, []);

    const handleEditProfile = () => {
    setFormData({
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        pronoun: user.pronoun || "",
        bio: user.bio || ""
    });

    setAvatarFile(null);
    setAvatarPreview("");
    setOpenModal(true);
};



const handleUpdate = async () => {
    try {
        setSaving(true);

        const response = await fetch(
            `https://backendblog-1kjf.onrender.com/medium/auth/update/${userId}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            }
        );

        // Read the response only once
        const result = await response.json();

        console.log("Update response:", result);

        if (!response.ok) {
            throw new Error(
                result.message ||
                result.error ||
                "Failed to update profile"
            );
        }

        // Use the updated user returned by the backend, if available
        const updatedUser =
            result.data?.user ??
            result.data?.data ??
            result.data;

        setUser(prev => ({
            ...prev,
            ...formData,
            ...(updatedUser && typeof updatedUser === "object"
                ? updatedUser
                : {})
        }));

        setOpenModal(false);
        alert("Profile updated successfully!");

    } catch (error) {
        console.error("Profile update error:", error);
        alert(error.message || "Something went wrong.");
    } finally {
        setSaving(false);
    }
};



    if (loading) {
        return <p className="p-10">Loading profile...</p>;
    }

    if (error || !user) {
        return (
            <p className="p-10 text-red-500">
                {error || "User details could not be loaded."}
            </p>
        );
    }

    const fullName =
        `${user.first_name || ""} ${user.last_name || ""}`.trim();

    const joinedDate = user.createdAt
        ? new Date(user.createdAt).toLocaleDateString()
        : "Not available";

    // return (
    //     <div className="w-full min-h-screen flex">
    //         <SideNav />

    //         <div className="w-[80%] min-h-screen ml-80">
    //             {/* Profile header */}
    //             <div className="w-full h-50 border-b relative bg-yellow-400 flex justify-center">
    //                 <div className="size-50 border-5 rounded-full absolute mt-30 bg-white flex items-center justify-center text-7xl font-bold overflow-hidden">
    //                     {user.avatar ? (
    //                         <img
    //                             src={user.avatar}
    //                             alt="Profile"
    //                             className="w-full h-full object-cover"
    //                         />
    //                     ) : (
    //                         <p className="text-gray-400">
    //                             {user.first_name?.charAt(0)?.toUpperCase() || "U"}
    //                         </p>
    //                     )}
    //                 </div>
    //             </div>

    //             {/* Profile information */}
    //             <div className="w-full min-h-190 bg-gray-100 flex pb-10 justify-center">
    //                 <div className="w-[90%]">
    //                     <p className="text-3xl text-gray-500 mt-10 font-semibold">
    //                         {fullName || "Unnamed User"}
    //                     </p>

    //                     <p className="text-xl text-gray-500 capitalize">
    //                         {user.role === "admin"
    //                             ? "Admin / Editor in chief"
    //                             : user.role || "User"}
    //                     </p>

    //                     <p onClick={handleEditProfile} className="text-green-700 cursor-pointer hover:underline">
    //                         Edit profile
    //                     </p>

    //                     <div className="w-full min-h-80 bg-white px-5 py-10 rounded-md shadow-md mt-10">
    //                         <p className="text-3xl">Personal Details</p>

    //                         <p>
    //                             Manage your administrative details and public
    //                             profile information.
    //                         </p>

    //                         <div className="w-full border-t border-gray-200 mt-3 flex flex-wrap">
    //                             {/* Left column */}
    //                             <div className="w-1/2 min-h-45 py-3 pr-4">
    //                                 <p className="text-gray-400 text-xl font-semibold">
    //                                     Full name
    //                                 </p>
    //                                 <p className="cursive">{fullName || "Not provided"}</p>

    //                                 <p className="text-gray-400 text-xl mt-3 font-semibold">
    //                                     Email address
    //                                 </p>
    //                                 <p className="cursive">
    //                                     {user.email || "Not provided"}
    //                                 </p>

    //                                 <p className="text-gray-400 text-xl mt-3 font-semibold">
    //                                     Contact
    //                                 </p>
    //                                 <p className="cursive">
    //                                     {user.contact || "Not provided"}
    //                                 </p>
    //                             </div>

    //                             {/* Right column */}
    //                             <div className="w-1/2 min-h-45 py-3">
    //                                 <p className="text-gray-400 text-xl font-semibold">
    //                                     Bio
    //                                 </p>
    //                                 <p className="cursive whitespace-pre-wrap break-words">
    //                                     {user.bio || "No bio added yet."}
    //                                 </p>

    //                                 <p className="text-gray-400 text-xl mt-3 font-semibold">
    //                                     Joined date
    //                                 </p>
    //                                 <p className="cursive">{joinedDate}</p>
    //                             </div>
    //                         </div>
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>


    //         {openModal && (
    //         <div className={`fixed inset-0 z-50 flex items-start sm:items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/50 backdrop-blur-xs transition-opacity duration-3000 ${openModal ? "opacity-100" : "opacity-0"}`}>
    //             <div className="w-full sm:w-[85%] md:w-[65%] lg:w-[50%] xl:w-[33%] max-w-xl min-h-0 max-h-[90vh] overflow-y-auto bg-white rounded-sm p-4 sm:p-6">
    //                 <div className="w-full flex justify-end">
    //                     <img
    //                         src="/cross.png"
    //                         alt=""
    //                         onClick={() => setOpenModal(false)}
    //                         className="size-9 sm:size-10 text-gray-400 hover:text-gray-700 font-bold cursor-pointer p-2"
    //                     />
    //                 </div>

    //                 <p className="font-semibold text-center text-xl sm:text-2xl">
    //                     Profile information
    //                 </p>

    //                 <div className="w-full min-h-100 mt-5">
    //                     <p className="text-md">Photo</p>

    //                     <div className="w-full min-h-10 flex items-start gap-3">
    //                         <img src={avatarPreview || user?.avatar || "/default-profile.png"} alt="Profile preview" className="size-16 sm:size-18 rounded-full object-cover shrink-0" />

    //                         <div className="min-w-0">
    //                             <div className="flex flex-wrap gap-3 text-sm sm:text-md">
    //                                 <p onClick={() => fileInputRef.current.click()} className="text-green-700 cursor-pointer">
    //                                     Update
    //                                 </p>

    //                                 <p
    //                                     onClick={() => {
    //                                         setAvatarFile(null);
    //                                         setAvatarPreview("");
    //                                     }}
    //                                     className="text-red-700 cursor-pointer"
    //                                 >
    //                                     Remove
    //                                 </p>

    //                                 <input
    //                                     type="file"
    //                                     accept="image/*"
    //                                     hidden
    //                                     ref={fileInputRef}
    //                                     onChange={(e) => {
    //                                         const file = e.target.files[0];
    //                                         if (file) {
    //                                             setAvatarFile(file);
    //                                             setAvatarPreview(URL.createObjectURL(file));
    //                                         }
    //                                     }}
    //                                 />
    //                             </div>

    //                             <div className="pl-0">
    //                                 <p className="text-[13px] sm:text-[14px] text-gray-500 mt-4">
    //                                     Recommended: Square JPG, PNG, or GIF, at least 1,000 pixels per side.
    //                                 </p>
    //                             </div>
    //                         </div>
    //                     </div>

    //                     <div className="w-full min-h-10 mt-8 sm:mt-10">
    //                         <p className="text-[15px]">Name*</p>
    //                         <input
    //                             value={`${formData.first_name} ${formData.last_name}`.trim()}
    //                             onChange={(e) => {
    //                                 const name = e.target.value; const parts = name.trim().split(/\s+/);

    //                                 setFormData({
    //                                     ...formData,
    //                                     first_name: parts[0] || "",
    //                                     last_name: parts.slice(1).join(" ") || ""
    //                                 });
    //                             }}
    //                             type="text"
    //                             className="w-full min-h-9 rounded-sm bg-gray-100 px-3 sm:px-5 outline-none py-1 border-0 focus:border-1"
    //                         />
    //                         <div className="w-full min-h-5 flex justify-end pt-1">
    //                             <span>0</span>/50
    //                         </div>
    //                     </div>

    //                     <div className="w-full min-h-10 mt-7 sm:mt-10">
    //                         <p className="text-[15px]">Pronoun</p>
    //                         <input
    //                             value={formData.pronoun}
    //                             onChange={(e) =>
    //                                 setFormData({
    //                                     ...formData,
    //                                     pronoun: e.target.value
    //                                 })
    //                             }
    //                             type="text"
    //                             placeholder="Add..."
    //                             className="w-full min-h-9 rounded-sm bg-gray-100 px-3 sm:px-5 outline-none py-1 border-0 focus:border-1"
    //                         />
    //                     </div>

    //                     <div className="w-full min-h-10 mt-7 sm:mt-10">
    //                         <p className="text-[15px]">Short bio</p>
    //                         <textarea
    //                             value={formData.bio}
    //                             onChange={(e) =>
    //                                 setFormData({
    //                                     ...formData,
    //                                     bio: e.target.value
    //                                 })
    //                             }
    //                             name=""
    //                             id=""
    //                             className="w-full min-h-20 rounded-sm bg-gray-100 px-3 sm:px-5 outline-none py-1 border-0 focus:border-1"
    //                         ></textarea>
    //                         <div className="w-full min-h-5 flex justify-end pt-1">
    //                             <span>0</span>/100
    //                         </div>
    //                     </div>

    //                     <div className="w-full min-h-20 mt-10">
    //                         <p className="text-[16px]">About Page</p>
    //                         <p className="text-gray-500 text-sm sm:text-base">
    //                             Personalize with images and more to paint more of yourself than 'Short bio'.
    //                         </p>
    //                     </div>

    //                     <div className="flex w-full min-h-10 justify-end mt-5">
    //                         <button onClick={() => setOpenModal(false)} className="h-10 w-20 cursor-pointer rounded-3xl border mr-3">
    //                             Cancel
    //                         </button>
    //                         <button onClick={handleUpdate} className="h-10 w-20 cursor-pointer rounded-3xl border bg-black text-white">
    //                             Save
    //                         </button>
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //     )}
    //     </div>
    // );

    
return (
    <div className="w-full min-h-screen flex flex-col lg:flex-row">
        <SideNav />

        <div className="flex-1 min-w-0 min-h-screen lg:ml-80">
            {/* Profile header */}
            <div className="w-full h-40 sm:h-50 border-b relative bg-yellow-400 flex justify-center">
                <div className="size-32 sm:size-40 lg:size-50 border-5 rounded-full absolute mt-24 sm:mt-30 bg-white flex items-center justify-center text-5xl sm:text-6xl lg:text-7xl font-bold overflow-hidden">
                    {user.avatar ? (
                        <img
                            src={user.avatar}
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <p className="text-gray-400">
                            {user.first_name?.charAt(0)?.toUpperCase() || "U"}
                        </p>
                    )}
                </div>
            </div>

            {/* Profile information */}
            <div className="w-full min-h-190 bg-gray-100 flex pb-10 justify-center">
                <div className="w-[95%] sm:w-[90%] min-w-0">
                    <p className="text-2xl sm:text-3xl text-gray-500 mt-10 font-semibold break-words">
                        {fullName || "Unnamed User"}
                    </p>

                    <p className="text-base sm:text-xl text-gray-500 capitalize">
                        {user.role === "admin"
                            ? "Admin / Editor in chief"
                            : user.role || "User"}
                    </p>

                    <p onClick={handleEditProfile} className="text-green-700 cursor-pointer hover:underline">
                        Edit profile
                    </p>

                    <div className="w-full min-h-80 bg-white px-3 sm:px-5 py-6 sm:py-10 rounded-md shadow-md mt-8 sm:mt-10">
                        <p className="text-2xl sm:text-3xl">Personal Details</p>

                        <p className="text-sm sm:text-base mt-1">
                            Manage your administrative details and public
                            profile information.
                        </p>

                        <div className="w-full border-t border-gray-200 mt-3 grid grid-cols-1 sm:grid-cols-2 gap-x-4">
                            {/* Left column */}
                            <div className="min-w-0 min-h-45 py-3">
                                <p className="text-gray-400 text-lg sm:text-xl font-semibold">
                                    Full name
                                </p>
                                <p className="cursive break-words">{fullName || "Not provided"}</p>

                                <p className="text-gray-400 text-lg sm:text-xl mt-3 font-semibold">
                                    Email address
                                </p>
                                <p className="cursive break-words">
                                    {user.email || "Not provided"}
                                </p>

                                <p className="text-gray-400 text-lg sm:text-xl mt-3 font-semibold">
                                    Contact
                                </p>
                                <p className="cursive break-words">
                                    {user.contact || "Not provided"}
                                </p>
                            </div>

                            {/* Right column */}
                            <div className="min-w-0 min-h-45 py-3">
                                <p className="text-gray-400 text-lg sm:text-xl font-semibold">
                                    Bio
                                </p>
                                <p className="cursive whitespace-pre-wrap break-words">
                                    {user.bio || "No bio added yet."}
                                </p>

                                <p className="text-gray-400 text-lg sm:text-xl mt-3 font-semibold">
                                    Joined date
                                </p>
                                <p className="cursive">{joinedDate}</p>
                            </div>
                        </div>
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
                            <img
                                src={avatarPreview || user?.avatar || "/default-profile.png"}
                                alt="Profile preview"
                                className="size-16 sm:size-18 rounded-full object-cover shrink-0"
                            />

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
                                    const name = e.target.value;
                                    const parts = name.trim().split(/\s+/);

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
);

}

export default AdminProfile;

