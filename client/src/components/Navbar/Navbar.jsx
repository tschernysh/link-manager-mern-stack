import { useContext } from "react"
import { NavLink } from "react-router-dom"
import { AuthContext } from "../../context/authContext"
import s from './Navbar.module.css'

export default() => {
    const auth = useContext(AuthContext)


    const logoutHandler = (e) => {
        e.preventDefault()
        auth.logout()
    }

    return(
        <div className={s.navbar}>
            <div className="navbar_btn">
                <NavLink to='/create' activeClassName={s.active}>Create</NavLink>
            </div>
            <div className="navbar_btn">
                <NavLink to='/links' activeClassName={s.active}>Links</NavLink>
            </div>
            <div className="navbar_btn">
                <a onClick={logoutHandler}>Logout</a>
            </div>
        </div>
    )
}