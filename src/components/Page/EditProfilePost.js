import React,{useState,useEffect} from 'react';
import './style/SongTor_post.css';
import './style/EditProfilePost.css';
import {getUser,getToken} from "../../services/authorize";
import {Link,useHistory} from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const EditProfilePost=(props)=>{
    const [state,setState] = useState({
        bookname:"",
        price:"",
        details:"",
        contact:"",
        url:"",
        slug:""
    })
    const {bookname,price,details,contact,url,slug} = state

    const history = useHistory();

    //ดึงข้อมูลบทความที่ต้องการแก้ไข
    useEffect(()=>{
      axios
      .get(`${process.env.REACT_APP_API}/signleData/${props.match.params.slug}`)
      .then(response=>{
          const {bookname,price,details,contact,url,slug} = response.data
          setState({...state,bookname,price,details,contact,url,slug})
      })
      .catch(err=>alert(err))
      // eslint-disable-next-line
    },[])

    const showUpdate=()=>(
      <div className='container-sellbook-post'>
            <h1>แก้ไขโพสต์</h1>
            <div className='post-sellbook-container'>
                <div className='photo-block-container'> {/*for img preview */}
                  <div className='ImgPreview'>
                        <img src={url} alt=""  className='ImgPreview'/>
                    </div>
                </div>
                 <form className ="" onSubmit={submitForm}>
                    <div className="form-control-sellbook">
                        <label>ชื่อหนังสือ</label>
                        <input type="text" placeholder="กรุณากรอกชื่อหนังสือ" value={bookname} onChange={inputValue("bookname")}/>
                    </div>
                    <div className="form-control-sellbook">
                        <label>ราคา</label>
                        <input type="text" placeholder="กรุณากรอกราคา" value={price} onChange={inputValue("price")}/>
                    </div>
                    <div className="form-control-sellbook">
                        <label>รายละเอียด</label>
                        <input type="text" placeholder="กรุณากรอกรายละเอียดหนังสือ" value={details} onChange={inputValue("details")}/>
                    </div>
                    <div className="form-control-sellbook">
                        <label>ช่องทางการติดต่อ</label>
                        <input type="text" placeholder="กรุณากรอกช่องทางการติดต่อ" value={contact} onChange={inputValue("contact")}/>
                    </div>
                    <div className="form-control-sellbook">
                        <label>URL รูปภาพ</label>
                        <input type="url" placeholder="กรุณากรอก URL รูปภาพ" value={url} onChange={inputValue("url")}/>
                    </div>
                    <button className='edit-submit' type="submit">บันทึกข้อมูลที่แก้ไข</button>
                </form>  
            </div>
        </div>
    )

    //กำหนดค่าให้กับ state
    const inputValue=name=>event=>{
      setState({...state,[name]:event.target.value});
    }

    const submitForm=(e)=>{
      e.preventDefault();
      console.log("API URL = ",process.env.REACT_APP_API)
      axios
      .put(`${process.env.REACT_APP_API}/updatepost/${slug}`,{bookname,price,details,contact,url},
      {
        headers:{
          authorization:`Bearer ${getToken()}`
        }
      })
      .then(async(response)=>{
        await Swal.fire({title:"แก้ไขข้อมูลหนังสือเรียบร้อย",icon:'info'})
        const {bookname,price,details,contact,url,slug} = response.data
        setState({...state,bookname,price,details,contact,url,slug})
        history.push("/profile")
      })
      .catch(err=>{
        Swal.fire('แจ้งเตือน',err.response.data.error,'error')
      })
    }

    return (
        <div>
          {showUpdate()}
        </div>
      );
}
export default EditProfilePost;