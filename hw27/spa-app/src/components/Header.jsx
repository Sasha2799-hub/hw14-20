import { ThemeContext } from "../themeContext"
import Switch from '@mui/material/Switch';
import { useContext } from "react"
import { NavLink } from "react-router-dom";

const Header = () => {
    const { currentTheme, toggleTheme } = useContext(ThemeContext);

    return(
    <header className="header" style={{ background: currentTheme.background, color: currentTheme.color }}>
        <ul className="header-links">
            <li>
                <NavLink to="/">Main</NavLink>
            </li>
            <li>
                <NavLink to="/contacts">Contacts</NavLink>
            </li>
            <li>
                <NavLink to="/about">About us</NavLink>
            </li>
        </ul>
        <Switch onChange={toggleTheme} />
    </header>
    )
}
    

export default Header