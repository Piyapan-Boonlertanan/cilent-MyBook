import './style/SignUp.css'
import { useState } from "react";
import {Link,useHistory} from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { getUser,getToken } from "../../services/authorize";

const SignUp=()=>{
    const [state,setState] = useState({
      username:"",
      telephone:"",
      email:"",
      password:"",
      confirmpassword:""
    })
    const {username,telephone,email,password,confirmpassword} = state

    const history = useHistory();

    //กำหนดค่าให้กับ state
    const inputValue=name=>event=>{
      setState({...state,[name]:event.target.value});
    }

    const submitForm=(e)=>{
      e.preventDefault();
      console.log("API URL = ",process.env.REACT_APP_API)
      axios
      .post(`${process.env.REACT_APP_API}/signup`,
      {username,telephone,email,password,confirmpassword},
      {
        headers:{
          authorization:`Bearer ${getToken()}`
        }
      })
      .then(async(response)=>{
        await Swal.fire({title:"สมัครสมาชิกเรียบร้อยแล้ว", icon:'info'})
        setState({...state,username:"",telephone:"",email:"",password:"",confirmpassword:""})
        history.push("/sign-in")
      })
      .catch(err=>{
        Swal.fire({title:err.response.data.error, icon:'warning'})
      })
    }

//--------Showing Part 
    return(
        <div className ="container-sign-up">
           <form className ="form" onSubmit={submitForm}>
                <h2 className='Sign-up-header'>Sign Up</h2>
                <p>หากเป็นสมาชิกแล้วกรุณา <Link to="/sign-in">เข้าสู่ระบบ</Link></p>
                <div className="form-control">
                    <label>ชื่อผู้ใช้</label>
                    <input type="text" placeholder="กรุณากรอกชื่อผู้ใช้" value={username} onChange={inputValue("username")}/>
                </div>
                <div className="form-control">
                    <label>โทรศัพท์</label>
                    <input type="text" placeholder="0812345678" value={telephone} onChange={inputValue("telephone")} />
                </div>
                <div className="form-control">
                    <label>อีเมล</label>
                    <input type="text" placeholder="กรุณากรอกอีเมล" value={email} onChange={inputValue("email")}/>
                </div>
                <div className="form-control">
                    <label>รหัสผ่าน</label>
                    <input type="password" placeholder="กรุณากรอกรหัสผ่าน" value={password} onChange={inputValue("password")}/>
                </div>
                <div className="form-control">
                    <label>ยืนยันรหัสผ่าน</label>
                    <input type="password" placeholder="กรุณากรอกยืนยันรหัสผ่าน" value={confirmpassword} onChange={inputValue("confirmpassword")}/>
                </div>
                <button className='sign-up-btn' type="submit">ลงทะเบียน</button>
           </form> 
        </div>
    )
}
export default SignUp