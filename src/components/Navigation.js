import {Link,withRouter,NavLink} from "react-router-dom";
import { useState } from "react";
import "./Navigation.css"
import MenuData from "../Data_Navidation/Menudata";
import { GoThreeBars } from "react-icons/go";
import { BiWindowClose } from "react-icons/bi";
import {getUser,logout} from "../services/authorize";


const Navigation=({history})=>{
    const [showMenu,setShowMenu]=useState(false)
    const toggleMenu =()=>setShowMenu(!showMenu) //Change the bool when click the GoThreeBars Logo
    return(
        <aside>
            <div className='navbar'>
                <div className='navbar-toggle'>
                    <Link to="#" className='manu-bar'>  
                        {/* <GoThreeBars onClick={toggleMenu}/> */}
                    </Link>
                    <div className="menu-bar-header">
                        <div className="func-component-header">
                            <Link to="/">Home</Link>
                            <NavLink to="/collection" activeStyle={{ color:'orange' }}>Collection</NavLink>
                            {getUser() && (
                                <NavLink to="/sell-book" activeStyle={{ color:'orange' }}>SongTor</NavLink>
                            )}   
                        </div>
                        <div className="sign-component-header">
                            {!getUser() && (
                                <Link to="/sign-up" className="header-sign-up">Sign Up</Link>
                            )}
                            {getUser() && (
                                <Link to='/profile' className="header-profile">Profile</Link> 
                            )}
                                
                            {!getUser() && (
                                <Link to="/sign-in" className="header-sign-in">Sign In</Link>
                            )}
                            {getUser() && (
                                <Link className="header-sign-out" onClick={()=>logout(()=>history.push("/"))}>Sign Out</Link> 
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <nav className={showMenu ? "nav-menu active":"nav-menu" }>  {/*Condition coding---keyword(Ternary operator) */}
                <ul className="nav-menu-item" onClick={toggleMenu}> 

                    <div className="navbar-sign">
                        {!getUser() && (
                            <Link to='/sign-up' className="navbar-sign-up">Sign Up</Link>
                        )}
                        {getUser() && (
                            <Link to='/profile' className="navbar-profile">Profile</Link>
                        )}

                        {!getUser() && (
                            <Link to='/sign-in' className="navbar-sign-in">Sign In</Link>
                        )}
                        {getUser() && (
                            <Link className="" onClick={()=>logout(()=>history.push("/"))}>Sign Out</Link>
                        )}    
                    </div>
                    <li className="navbar-toggle">
                        <Link to="#" className="manu-bar">
                            <BiWindowClose onClick={toggleMenu} />
                        </Link>
                    </li>
                    {MenuData.map((menu,index)=>{
                        return(
                            <li className="menu-txt" key={index}>
                                <Link to={menu.path}>
                                    {menu.icon}<span> {menu.title}</span>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </nav>
        </aside>
    )
}
export default withRouter(Navigation)