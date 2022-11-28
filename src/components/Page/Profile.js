import './style/Profile.css';
import {Link ,NavLink} from "react-router-dom";
import axios from "axios";
import {useState,useEffect} from "react";
import Swal from "sweetalert2";
import { getUser,getToken } from "../../services/authorize";

const Profile=()=>{
    const [data,setData] = useState([])
    const user = String(getUser())

    //function ดึงข้อมูลทั้งหมดมาจากฐานข้อมูล
    const fetchData=()=>{
        axios
        .post(`${process.env.REACT_APP_API}/collectionUser`,{user})
        .then(response=>{
            setData(response.data)
        })
        .catch(err=>alert(err));
    }

    useEffect(()=>{
        fetchData()
    },[])
    
    //function ยืนยันการลบข้อมูล
    const confirmDelete=(slug)=>{
        Swal.fire({
        title:"คุณต้องการลบข้อมูลหรือไม่ !",
        icon:"warning",
        showCancelButton:true
        }).then((result)=>{
        //กดปุ่ม ok หรือ ตกลง
        if(result.isConfirmed){
            deleteBlog(slug)
        }
        })
    }

    const deleteBlog=(slug)=>{
        //ส่ง request ไปที่ api เพื่อลบข้อมูล
        axios
        .delete(`${process.env.REACT_APP_API}/delete/${slug}`,
        {
        headers:{
            authorization:`Bearer ${getToken()}`
        }
        })
        .then(response=>{
        Swal.fire({title:response.data.message, icon:"info"})
        fetchData()
        })
        .catch(err=>console.log(err))
    }
    return(
        <div className='container-profile'>
            <div className='header-link'>
                <div>
                    <NavLink to={"/profile"} activeStyle={{ color:'orange' }}
                    >
                        โพสต์ของฉัน
                    </NavLink>
                </div>
                <div>
                   <NavLink to={"/fav-book"} activeStyle={{ color:'orange' }}
                    >
                        หนังสือที่สนใจ
                    </NavLink> 
                </div>
            </div>
            {data.map((data,index)=>(
                <div key={index} className='container-post'>
                    <div className='pic-block-profile'>
                        <img src={data.url} alt=""  className='ImgPreview'/>
                    </div>
                    <div className='profile-block'>
                        <div className="from-card-profile">
                            <div className="form-control-profile">
                                <h1>ชื่อหนังสือ : {data.bookname}</h1>
                            </div>
                            <div className="form-control-profile"> 
                                <label>ราคา : </label>
                                <p>{data.price} บาท</p>
                             </div>
                            <div className="form-control-profile">
                                <label>รายละเอียด : </label>
                                <p>{data.details} </p>
                            </div>
                            <div className="form-control-profile">
                                <label>ช่องทางการติดต่อ : </label>
                                <p>{data.contact}</p>
                            </div>
                            <div className="form-control-profile">
                                <label>ผู้เขียน : </label>
                                <p>{data.user}</p>
                            </div>
                        </div>
                        <div className='btn-component-profile'>
                                <Link className=''  to={`/edit-post/${data.slug}`}>แก้ไขข้อมูล</Link> &nbsp;
                                <button className='btn-profile-delete' onClick={()=>confirmDelete(data.slug)}>ลบข้อมูล</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
export default Profile