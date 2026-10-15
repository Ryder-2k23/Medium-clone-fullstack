import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom";
function Write() {
    const [text, setText] = useState("");
    const [text2, setText2] = useState("");
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState("");

    

    const handlePublish = async () => {
    try {
        const token = localStorage.getItem("accessToken");

        const formData = new FormData();
        formData.append("title", text);
        formData.append("content", text2);

        if (image) {
            formData.append("image", image);
        }

        const response = await fetch(
            "https://backendblog-1kjf.onrender.com/medium/content/posts/",
            {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                body: formData
            }
        );

        const data = await response.json();

        console.log("PUBLISH RESPONSE:", data);

        if (response.ok) {
            alert("Post published successfully!");

            setText("");
            setText2("");
            setImage(null);
            setImagePreview("");

            navigate("/profiles");
        } else {
            alert(data.message || "Failed to publish post.");
        }
    } catch (error) {
        console.error("Publish error:", error);
        alert("Something went wrong while publishing.");
    }
};
const navigate = useNavigate();
    const signOut = async ()=>{
        localStorage.removeItem("accessToken");
localStorage.removeItem("userId");

navigate("/");
    }

    const handleChange = (e) => {
        setText(e.target.value);
        e.target.style.height = "27px";
        e.target.style.height = `${e.target.scrollHeight}px`;
    };

    const handleChange2 = (e) => {
        setText2(e.target.value);
        e.target.style.height = "27px";
        e.target.style.height = `${e.target.scrollHeight}px`;
    };
    // return (
    //     <div>
    //        <nav className="w-full h-17 border-b border-gray-300 flex justify-between fixed bg-white  py-3 px-6">
    //                 {/* <img onClick={() => setSideNavOpen(!sideNavOpen)} src="/menu.png" alt="" className="size-6 cursor-pointer" /> */}
    //                 <Link to='/landingpage'><h1 className="text-[35px] Medium-font font-bold ml-80">Medium</h1></Link>
    //               <div className="w-60 h-10  flex justify-between mr-50 ">
    //                   <button onClick={handlePublish}  className={`${ text.trim() || text2.trim() ? "bg-green-600" : "bg-green-200"} rounded-xl cursor-pointer w-20 h-7 mt-3 text-white`}>Publish</button>
    //                 <p className="cursor-pointer text-2xl mt-1">...</p>
    //                  <img src="/bell.png" alt="" className="hidden sm:block size-5 sm:size-6 mt-3"/>
    //                  <div className="rounded-full border size-10"></div>
    //               </div>
    //             </nav>

    //         <div className="w-full min-h-150 pt-20 flex justify-center">
    //             <div className="w-[50%] h-auto ">
    //                 <div className="w-full min-h-20 flex">
    //                     <div className="size-12 mt-3 border rounded-full text-center text-4xl text-gray-500 cursor-pointer">+</div>
    //                     <textarea placeholder="Title" value={text} onChange={handleChange} className="post-topic ml-2 w-full h-[80px] resize-none overflow-hidden border-l focus:outline-none text-[40px] border-gray-300 p-3" />
    //                 </div>

    //                 <label className="h-8 min-w-20 mt-3 border border-gray-200 hover:bg-gray-50 text-center text-sm rounded-lg px-2 text-gray-500 cursor-pointer inline-flex items-center justify-center">
    //                     Add image +
    //                     <input type="file" accept="image/*" hidden onChange={(e) => {
    //                         const file = e.target.files[0];
    //                         if (file) {
    //                             setImage(file);
    //                             setImagePreview(URL.createObjectURL(file));
    //                         }
    //                     }}
    //                     />
    //                 </label>
                   
    //                 <div className="w-full h-100 mt-2 shadow-md flex items-center justify-center overflow-hidden">
    //                     {imagePreview ? (
    //                         <img
    //                             src={imagePreview}
    //                             alt="Post preview"
    //                             className="w-full h-full object-cover"
    //                         />
    //                     ) : (
    //                         <p className="text-gray-400 text-2xl">
    //                             Set Post Image Here
    //                         </p>
    //                     )}
    //                 </div>
                    

    //                 <div className="w-full mt-5 min-h-10 flex">
    //                     <textarea placeholder="Tell your story ..." value={text2} onChange={handleChange2} className="post-topic ml-2 w-full h-[60px] resize-none overflow-hidden border-l focus:outline-none text-[25px] border-gray-300 p-3" />
    //                 </div>

    //             </div>
    //         </div>
    //     </div>
    // )


    
return (
    <div className="w-full min-h-screen overflow-x-hidden bg-white">
        <nav className="w-full h-17 border-b border-gray-300 flex items-center justify-between fixed top-0 left-0 z-50 bg-white py-3 px-3 sm:px-6">
            {/* <img onClick={() => setSideNavOpen(!sideNavOpen)} src="/menu.png" alt="" className="size-6 cursor-pointer" /> */}

            <Link to='/landingpage' className="shrink-0">
                <h1 className="text-2xl sm:text-[35px] Medium-font font-bold ml-0 sm:ml-4 lg:ml-20 xl:ml-40">
                    Medium
                </h1>
            </Link>

            <div className="flex items-center justify-end gap-3 sm:gap-5 h-10">
                <button
                    onClick={handlePublish}
                    className={`${
                        text.trim() || text2.trim()
                            ? "bg-green-600"
                            : "bg-green-200"
                    } rounded-xl cursor-pointer w-16 sm:w-20 h-7 mt-1 text-white text-sm sm:text-base shrink-0`}
                >
                    Publish
                </button>

                <p className="cursor-pointer text-2xl mt-0">...</p>

                <img
                    src="/bell.png"
                    alt=""
                    className="hidden sm:block size-5 sm:size-6 shrink-0"
                />

                <div className="rounded-full border size-8 sm:size-10 shrink-0"></div>
            </div>
        </nav>

        <div className="w-full min-h-screen pt-24 pb-10 px-4 sm:px-6 flex justify-center">
            <div className="w-full sm:w-[85%] md:w-[75%] lg:w-[65%] xl:w-[50%] max-w-4xl h-auto">

                <div className="w-full min-h-20 flex items-start">
                    <div className="size-9 sm:size-12 mt-3 border rounded-full flex items-center justify-center text-3xl sm:text-4xl text-gray-500 cursor-pointer shrink-0">
                        +
                    </div>

                    <textarea
                        placeholder="Title"
                        value={text}
                        onChange={handleChange}
                        className="post-topic ml-2 w-full min-w-0 h-[80px] resize-none overflow-hidden border-l focus:outline-none text-2xl sm:text-3xl lg:text-[40px] border-gray-300 p-2 sm:p-3"
                    />
                </div>

                <label className="h-8 min-w-20 mt-3 border border-gray-200 hover:bg-gray-50 text-center text-sm rounded-lg px-2 text-gray-500 cursor-pointer inline-flex items-center justify-center">
                    Add image +
                    <input
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                                setImage(file);
                                setImagePreview(URL.createObjectURL(file));
                            }
                        }}
                    />
                </label>

                <div className="w-full h-56 sm:h-72 md:h-80 lg:h-96 xl:h-100 mt-2 shadow-md flex items-center justify-center overflow-hidden">
                    {imagePreview ? (
                        <img
                            src={imagePreview}
                            alt="Post preview"
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <p className="text-gray-400 text-lg sm:text-2xl text-center px-2">
                            Set Post Image Here
                        </p>
                    )}
                </div>

                <div className="w-full mt-5 min-h-10 flex">
                    <textarea
                        placeholder="Tell your story ..."
                        value={text2}
                        onChange={handleChange2}
                        className="post-topic ml-2 w-full min-w-0 h-[60px] resize-none overflow-hidden border-l focus:outline-none text-lg sm:text-xl lg:text-[25px] border-gray-300 p-2 sm:p-3"
                    />
                </div>

            </div>
        </div>
    </div>
)

}
export default Write