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
    return (
        <div>
           <nav className="w-full h-17 border-b border-gray-300 flex fixed bg-white  items-center px-6">
                    <img onClick={() => setSideNavOpen(!sideNavOpen)} src="/menu.png" alt="" className="size-6 cursor-pointer" />
                    <Link to='/landingpage'><h1 className="text-[35px] Medium-font font-bold ml-5">Medium</h1></Link>

                    <div className="px-4 w-60 h-10 rounded-3xl bg-gray-50 flex items-center ml-7">
                        <img src="/search.png" alt="" className="size-7" />
                        <input type="text" placeholder="Search" className="w-full ml-2 outline-none h-6" />
                    </div>

                    <button className="min-w-20 px-3 h-9 ml-185 bg-black cursor-pointer flex rounded-3xl items-center">
                        <img src="/grid.png" alt="" className="size-6 mr-1" />
                        <p className="text-white text-[14px]">Get app</p>
                    </button>

                    <Link to="/write">
                        <div className="flex cursor-pointer ml-5 ">
                            <img src="/edit.png" alt="" className="size-5" />
                            <p className="text-[15px] ml-3 hover:text-gray-600">Write</p>
                        </div>
                    </Link>

                    <img src="/bell.png" alt="" className="size-6 ml-5" />

                    {/* <div className="rounded-[50%] border size-8 ml-5"></div> */}
                    <button onClick={signOut} className="font-bold p-2 shadow-sm ml-1 cursor-pointer hover:bg-gray-50 transition-colors duration-250 text-lg">Sign out</button>
                </nav>

            <div className="w-full min-h-150 mt-5 flex justify-center">
                <div className="w-[50%] h-auto ">
                    <div className="w-full min-h-20 flex">
                        <div className="size-12 mt-3 border rounded-full text-center text-4xl text-gray-500 cursor-pointer">+</div>
                        <textarea placeholder="Title" value={text} onChange={handleChange} className="post-topic ml-2 w-full h-[80px] resize-none overflow-hidden border-l focus:outline-none text-[40px] border-gray-300 p-3" />
                    </div>

                    <label className="h-8 min-w-20 mt-3 border border-gray-200 hover:bg-gray-50 text-center text-sm rounded-lg px-2 text-gray-500 cursor-pointer inline-flex items-center justify-center">
                        Add image +
                        <input type="file" accept="image/*" hidden onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                                setImage(file);
                                setImagePreview(URL.createObjectURL(file));
                            }
                        }}
                        />
                    </label>
                   
                    <div className="w-full h-100 mt-2 shadow-md flex items-center justify-center overflow-hidden">
                        {imagePreview ? (
                            <img
                                src={imagePreview}
                                alt="Post preview"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <p className="text-gray-400 text-2xl">
                                Set Post Image Here
                            </p>
                        )}
                    </div>
                    

                    <div className="w-full mt-5 min-h-10 flex">
                        <textarea placeholder="Tell your story ..." value={text2} onChange={handleChange2} className="post-topic ml-2 w-full h-[60px] resize-none overflow-hidden border-l focus:outline-none text-[25px] border-gray-300 p-3" />
                    </div>

                </div>
            </div>
        </div>
    )
}
export default Write