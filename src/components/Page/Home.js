import React from "react"
import './style/Home.css';
import Footer from './Footer';
import { Link } from "react-router-dom";
import { getUser } from "../../services/authorize";

const Home=(e)=>{ 
return(
    <div>
        <header>
        <div className="container-Home">
           <div className="bg-book"></div>
           <section className="middle-info">
                    <div className="Logo-mid">
                        <h1 className="Logo-word-My">My</h1>
                        <h1 className="Logo-word-Book">Book</h1>
                    </div>
                    <div>
                        <div className="mid-info">
                            <h1>#SendYouMyBook</h1>
                        </div>
                        <div className="mid-info">
                            <h1>ให้เราเป็นมากกว่าแหล่งแลกเปลี่ยนหนังสือ</h1>
                        </div>
                        <div className="mid-info">
                            {!getUser() && (
                                <Link to="/sign-up" className="get-start">เริ่มต้นใช้งาน</Link> 
                            )}
                        </div>
                    </div>
            </section>
        </div> 
        </header>
            <Footer className="footer-home"/>
    </div>
    )
}
export default Home