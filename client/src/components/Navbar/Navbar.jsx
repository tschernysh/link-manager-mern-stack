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
            <NavLink to='/create' className={s.navbar_btn} activeClassName={s.active}>Create</NavLink>
            <NavLink to='/links' className={s.navbar_btn} activeClassName={s.active}>Links</NavLink>
            <a className={s.navbar_btn } onClick={logoutHandler}>Logout</a>
        </div>
    )
}