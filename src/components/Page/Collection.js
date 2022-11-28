import axios from "axios";
import {useState,useEffect} from "react";
import "./style/Collection.css";
import { FaSearch } from "react-icons/fa";
import Swal from "sweetalert2";
import { getToken,getUser } from "../../services/authorize";


//ดึงข้อมูลจาก API มาแสดงผลหน้าแรก
function App() {
    const [Word,setWord]=useState("")
    //filter for searching
    const[DataFilter]= useState(["bookname","user"]) //use 2 condition to find
    const searchBook =(Book)=>{
        return Book.filter((item)=>{
            return DataFilter.some((filter)=>{
                if(item[filter]){
                    return (item[filter].toString().toLowerCase().indexOf(Word.toLowerCase())>-1) //>-1 mean we found
                }
            })
        })
    }
      
    const [blog,setBlogs] = useState([])

    //function ดึงข้อมูลทั้งหมดมาจากฐานข้อมูล
    const fetchData=()=>{
        axios
        .get(`${process.env.REACT_APP_API}/collection`)
        .then(response=>{
            setBlogs(response.data)
        })
        .catch(err=>alert(err));
    }
    useEffect(()=>{
        fetchData()
    },[])
//-----------------------------------------------------------------------------------------

    const [state,setState] = useState({
        user:"",
        userfavoritebook:""
    })

    const user = String(getUser())

//----------------------------------------------------------------------------------------
    const submitForm=(book)=>{
        console.log("API URL = ",process.env.REACT_APP_API)
        axios
        .post(`${process.env.REACT_APP_API}/favorite`,{user,userfavoritebook:book},
        {
            headers:{
            authorization:`Bearer ${getToken()}`
            }
        })
        .then(async(response)=>{
            await Swal.fire({title:"เพิ่มในหนังสือที่สนใจเรียบร้อย",icon:'info'})
            setState({...state,user:"",userfavoritebook:""})
        })
        .catch(err=>{
            Swal.fire({title:err.response.data.error, icon:'warning'})
        })
    }
//----------------------------------------------------------------------------------------------------
    return (
        <div className="container-collection">
            <div className="search-box">
                <h1 className="search-element">หาหนังสือที่คุณสนใจกันเลย!</h1>
                <p className="search-element">
                                 สัมผัสประสบการณ์ใหม่โดยการค้นหาหนังสือที่คุณชื่นชอบ 
                    เพียงกรอกชื่อหนังสือหรือชื่อผู้โพสต์เท่านั้นคุณก็จะได้หนังสือตรงตามความต้องการของคุณ... 
                </p>
                <FaSearch id="search-logo"/>
                <label htmlFor="search-form" className="search-element">
                    <input type="text" 
                    className="search-element" 
                    placeholder="กรอกชื่อหนังสือหรือชื่อผู้โพสต์ที่คุณต้องการค้นหา "
                    value={Word}
                    onChange={(e)=>setWord(e.target.value)}
                    />
                </label>
            </div>
            <h1>โพสต์ใหม่ล่าสุด</h1>
        {searchBook(blog).map((blog,index)=>(
            <div className="card" key={index}>
                <div className="pic-card">
                    <img src={blog.url} alt=""  className='ImgPreview'/>
                </div>
                <div className="from-card">
                    <div className="form-control-collection">
                        <h1>ชื่อหนังสือ :{blog.bookname}</h1>
                    </div>
                    <div className="form-control-collection"> 
                        <label>ราคา : </label>
                        <p>{blog.price} บาท</p>
                    </div>
                    <div className="form-control-collection">
                        <label>รายละเอียด : </label>
                        <p>{blog.details} </p>
                    </div>
                    <div className="form-control-collection">
                        <label>ช่องทางการติดต่อ : </label>
                        <p>{blog.contact}</p>
                    </div>
                    <div className="form-control-collection">
                        <label>ผู้โพสต์ : </label>
                        <p>{blog.user}</p>
                    </div>
                    <div className='btn-component-profile'>
                        <form className ="" onSubmit={(e)=>{
                            e.preventDefault()
                            submitForm(blog.bookname)}}>
                            {getUser() && (
                                <button className='favorite-submit' type="submit">สนใจหนังสือ</button> 
                            )}
                        </form>
                    </div>
                </div>
            </div>
        ))}
        </div>
    );
}

export default App;