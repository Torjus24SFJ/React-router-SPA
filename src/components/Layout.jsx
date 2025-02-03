import {Link, Outlet} from "react-router-dom";
import style from "./Layout.module.css";

export const Layout = () => {
    return (
        <>
        <div>
            <nav className={style.nav_bar}>
                <Link to="/">Home</Link> 
                <Link to="/About">About</Link>
                <Link to="/Gallery">Gallery</Link>
            </nav>
            <hr />
            <Outlet />
        </div>
        </>
    )
}
