import React from "react";
import { Link } from 'react-router-dom';
import NavGroup from "./NavGroup";
import RouteLink from "./RouteLink";
import useResponsiveSidebar from "../hooks/useResponsiveSidebar";

const Sidebar = ({ userRole, onLogout}) => {
    useResponsiveSidebar();
    const loginText = userRole ? "Log Out" : "Log In";
    const LoginAction = userRole ? onLogout : undefined;

    return (
        <div id="sidePanel" className="sidebar">
            <div className="page-icon">
                <div className="nav-group-title">
                    <Link to="/" className="icon">
                    <img id="icon" src="icon.png" alt="icon" />
                    <h3>Tuzimbe<br/><span>constructions</span></h3>
                    </Link>
                </div>
            </div>
            <div className="links-wrap">
                <NavGroup title="Navigation" clases="navigation">
                    <RouteLink to="/" ids="home" text="Home" />
                </NavGroup>
                {userRole === 'admin' && (
                    <NavGroup title="Tracking Tools" clases="site-tracker-tools">
                        <RouteLink to="/Materials" ids="materials" text="View Materials"/>
                    </NavGroup>
                )}
                {(userRole==='foreman' || userRole==='admin') && (
                    <NavGroup title="Manager Tools" clases="manager-tools">
                        <RouteLink to="/AddMaterials" ids="addMaterials" text="Add Materials" />
                    </NavGroup>
                )}
                <NavGroup title="Accounts" clases="my-account">
                    <RouteLink to="/Login" ids="login" text={loginText} onclick={LoginAction}/>
                    <RouteLink to="/Register" ids="register" text="New User"/>
                </NavGroup>
            </div>
        </div>
    )
}

export default Sidebar;