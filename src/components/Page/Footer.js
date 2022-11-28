import React from "react"
import {Link} from "react-router-dom";
import './style/Footer.css';
import {BsFacebook , BsInstagram, BsTwitter} from "react-icons/bs";


const Footer=()=>{ 
return(
    <div className="footer-container">
        <div className="footer-container-group">
            <div className="about-us"> 
                <h1>เกี่ยวกับเรา</h1>
                <p>#SendyouMyBook</p>
                <p>platform ซื่อ-ขาย-ส่งต่อ หนังสือ</p>
            </div>
            <div className="contract-us"> 
                <h1>ติดต่อเรา</h1>
                <p>เบอร์โทร:090-241-xxxx</p>
                <p>เวลาทำการ:จันทร์-ศุกร์ 10.00-19.00น.</p>
                <p>s64010126200xx@email.kmutnb.ac.th</p>
            </div>
            <div className="follow-us"> 
                <h1>ติดตามเรา</h1>
                <div className="Logo-container">
                    <Link to="#" className="fb-logo"><BsFacebook/></Link>
                    <Link to="#" className="in-logo"><BsInstagram/></Link>
                    <Link to="#" className="tw-logo"><BsTwitter/></Link> 
                </div>
            </div>
        </div>
    </div>
    )
}
export default Footer;