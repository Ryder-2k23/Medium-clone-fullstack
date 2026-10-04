import { useState, useEffect } from "react"
import { Link } from "react-router-dom";
function Write(){
  const [text, setText] = useState("");
  const [text2, setText2] = useState("");

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
    return(
        <div>
                <nav className="w-full h-18 border-b border-gray-200 flex justify-center">
                    <div className="w-[55%] h-18 flex justify-between">
                        <div className="flex">
                            <Link to='/'><h1 className="text-[35px] Medium-font font-bold mr-2 mt-3">Medium</h1></Link>
                            <p className="text-gray-600 mt-5 mr-2">Draft</p>
                            {/* <p className="text-gray-600 mt-5">saving..</p> */}
                        </div>

                        <div className="flex items-center">
                            <button className="w-20 h-6 mr-5  text-center  px-1 bg-green-400 rounded-full text-white publish font-semibold cursor-pointer">Publish</button>
                            <img src="/menu-dots.png" alt="" className="size-7 cursor-pointer mr-5" />
                            <img src="/bell.png" alt="" className="size-5 cursor-pointer mr-5" />
                            <div className="rounded-full size-10 border"></div>
                        </div>
                    </div>
                </nav>

                <div className="w-full min-h-150 mt-5 flex justify-center">
                    <div className="w-[50%] h-auto ">
                        <div className="w-full min-h-20 flex">
                            <div className="size-12 mt-3 border rounded-full text-center text-4xl text-gray-500 cursor-pointer">+</div>
                            <textarea placeholder="Title" value={text} onChange={handleChange} className="post-topic ml-2 w-full h-[80px] resize-none overflow-hidden border-l focus:outline-none text-[40px] border-gray-300 p-3"/>
                        </div>


                        <div className="w-full mt-5 min-h-10 flex">
                            <div className="size-12 mt-3 border rounded-full text-center text-4xl text-gray-500 cursor-pointer">+</div>
                            <textarea placeholder="Tell your story ..." value={text2} onChange={handleChange2} className="post-topic ml-2 w-full h-[60px] resize-none overflow-hidden border-l focus:outline-none text-[25px] border-gray-300 p-3"/>
                        </div>
                        
                    </div>
                </div>
        </div>
    )
}
export default Write