import React from "react";
import { Link } from "react-router-dom";

import SidebarData from './SidebarData';

function Sidebar() {
    return <div className="Sidebar">
        <ul className="SidebarList">
            {SidebarData.map((value, key) => {
                return <Link to={value.link} className="nav-link"> 
                <li 
                        key = {key} 
                        className="SidebarRow"
                        id={window.location.pathname === value.link ? "active" : ""}
                        onClick={() => {window.location.pathname = value.link}}>
                    <div className="SidebarRowIcon"> {value.icon} </div>
                    <div className="SidebarRowTitle"> {value.title} </div>
                </li>
                </Link>
            })}
        </ul>
    </div>
}

export default Sidebar;