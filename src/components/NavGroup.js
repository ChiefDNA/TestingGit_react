import React from "react";


const NavGroup = ({ title , clases , children }) => {
    return (
        <div className={"nav-group "+clases}>
            <h5>{title}</h5>
            <hr />
            {children}
        </div>
    )
}

export default NavGroup;