import React from "react";
import { Link } from 'react-router-dom';
import NavGroup from "./NavGroup";
import RouteLink from "./RouteLink";

const Sidebar = ({ userRole, onLogout}) => {
    const loginText = userRole ? "Log Out" : "Log In";
    const LoginAction = userRole ? onLogout : undefined;

    return (
        <div id="sidePanel" className="sidebar">
            <div class="page-icon">
                <div class="nav-group-title">
                    <Link to="/" class="icon">
                    <img id="icon" src="icon.png" alt="icon" />
                    <h3>Tuzimbe<br/><span>constructions</span></h3>
                    </Link>
                </div>
            </div>
            <div class="links-wrap">
                <NavGroup title="Navigation" clases="navigation">
                    <RouteLink to="/" ids="home" text="Home" />
                </NavGroup>
                {userRole === 'admin' && (
                    <NavGroup title="Tracking Tools" clases="site-tracker-tools">

                    </NavGroup>
                )}
                {(userRole==='foreman' || userRole==='admin') && (
                    <NavGroup title="Manager Tools" clases="manager-tools">
                        <RouteLink to="/materials" ids="materials" text="View Materials"/>
                    </NavGroup>
                )}
                <NavGroup title="Accounts" clases="my-account">
                    <RouteLink to="/Login" ids="login" text={loginText} onclick={LoginAction}/>
                    <RouteLink to="/registration" ids="register" text="New User"/>
                </NavGroup>
            </div>
        </div>
    )
}

export default Sidebar;