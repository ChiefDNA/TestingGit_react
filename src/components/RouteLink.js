import React from "react";
import { Link } from 'react-router-dom'

const RouteLink = ({ to , ids , text }) => {
    return (
        <div className={`rout-wrap ${ids}`}>
            <Link to={to} > <img id={ids} src="./icon.png" alt=""/><span>{text}</span></Link>
        </div>
    )
}

export default RouteLink;