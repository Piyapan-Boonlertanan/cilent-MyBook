import './style/SignIn.css'
import { useState,useEffect } from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { authenticate,getUser } from "../../services/authorize";
import {withRouter} from "react-router-dom";

const SignIn=(props)=>{
    const [state,setState] = useState({
        username:"",
        password:""
    })
    const {username,password} = state

    const inputValue=name=>event=>{
        setState({...state,[name]:event.target.value});
    }

    const submitForm=(e)=>{
        e.preventDefault();
        axios
        .post(`${process.env.REACT_APP_API}/login`,{username,password})
        .then(response=>{
          //login สำเร็จ
          authenticate(response,()=>props.history.push("/")) //login เสร็จแล้วกลับไปหน้า /
        }).catch(err=>{
            Swal.fire({title:err.response.data.error, icon:'warning'})
        })
    }

    //ถ้า login แล้วไม่สามารถ login ได้อีก
    useEffect(()=>{
      getUser() && props.history.push("/")
    },[])

//--------Showing Part 
    return(
        <div className ="container-Sign-In">
            <div className='container-form-sign-in'>
                <form className ="form-Sign-In" onSubmit={submitForm}>
                    <h2 className='Sign-in-header'>Sign In</h2>
                    <p>ยังไม่เป็นสมาชิก? <Link to="/sign-up">สมัครสมาชิก</Link></p>
                    <div className="form-control-Sign-In">
                        <label>ชื่อผู้ใช้</label>
                        <input type="text" placeholder="กรุณากรอกชื่อผู้ใช้" value={username} onChange={inputValue("username")}/>
                    </div>
                    <div className="form-control-Sign-In">
                        <label>รหัสผ่าน</label>
                        <input type="password" placeholder="กรุณากรอกรหัสผ่าน" value={password} onChange={inputValue("password")}/>
                    </div>
                    <button className='sign-in-btn' type="submit">เข้าสู่ระบบ</button>
                </form>
            </div>    
        </div>
    )
}
export default SignIn