import React,{useState} from 'react';
import './style/SongTor_post.css';
import {getUser,getToken} from "../../services/authorize";
import {useHistory} from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const Sellbook_post=()=>{
    const [state,setState] = useState({
        user:"",
        bookname:"",
        price:"",
        details:"",
        contact:"",
        url:""
      })

      const {bookname,price,details,contact,url} = state
      const user = String(getUser())
  
      const history = useHistory();
  
      //กำหนดค่าให้กับ state
      const inputValue=name=>event=>{
        setState({...state,[name]:event.target.value});
      }
  
      const submitForm=(e)=>{
        e.preventDefault();
        console.log("API URL = ",process.env.REACT_APP_API)
        axios
        .post(`${process.env.REACT_APP_API}/bookseller`,{user,bookname,price,details,contact,url},
        {
          headers:{
            authorization:`Bearer ${getToken()}`
          }
        })
        .then(async(response)=>{
          await Swal.fire({title:"บันทึกข้อมูลหนังสือเรียบร้อย",icon:'info'})
          setState({...state,user:"",bookname:"",price:"",details:"",contact:"",url:""})
          history.push("/profile")
        })
        .catch(err=>{
          Swal.fire({title:err.response.data.error, icon:'warning'})
        })
      }

    return(
        <div className='container-sellbook-post'>
            <h1>เริ่มต้นใช้งาน SongTor</h1>
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
                    <button className='submit-btn' type="submit">บันทึกข้อมูลหนังสือ</button>
                </form>  
            </div>
        </div>
    )
}
export default Sellbook_post;