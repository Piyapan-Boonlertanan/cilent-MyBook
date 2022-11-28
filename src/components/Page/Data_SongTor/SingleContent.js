import { useState } from "react";
import "../Data_SongTor/SingleContent.css"
import { IoIosArrowDown,IoIosArrowUp } from "react-icons/io";

const SingleContent=({description,title})=>{
    // note; accd = accordion
    const [ShowContent,setShowContent]=useState(false);
    return(
        <article className="content-accd">
            <header>
                <h4>{title}</h4>
                <button className="btn-accd" onClick={()=>setShowContent(!ShowContent)}>
                    {ShowContent ? <IoIosArrowUp/>:<IoIosArrowDown />}
                </button>     
            </header>
            {ShowContent && <p>{description}</p>}
        </article>
    )
}
export default SingleContent; 