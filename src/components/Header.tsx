import {AppBar, Toolbar, useScrollTrigger} from "@mui/material";
import {useEffect, useState} from "react";
import logo from "../images/logo.png";

export function Header() {
    const trigger = useScrollTrigger({
        disableHysteresis: true, threshold: 50,
    });

    const [headerSize, setHeaderSize] = useState("regular");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
    };

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            if (scrollPosition > 50) {
                setHeaderSize("small");
            } else {
                setHeaderSize("regular");
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token);
    }, []);


    return (<AppBar
            position="fixed"
            className={trigger ? `header scrolled ${headerSize}` : "header"}
            sx={{backgroundColor: "black", color: "white"}}
        >
            <Toolbar className="header-container">
                <a href="http://localhost:3000/home"><img src={logo} alt="Logo"
                                                          style={{width: "50px", height: "50px", marginLeft: "38px"}}/></a>
                <div className="header-links">
                    <a className="all-events" href="http://localhost:3000/home/filters">УСІ ПОДІЇ</a>
                    {!isLoggedIn ? (
                        <a className="create-event" href="http://localhost:3000/login">
                            Створити подію
                        </a>
                    ) : (
                        <a className="create-event" href="http://localhost:3000/create">
                            Створити подію
                        </a>
                    )}
                    {!isLoggedIn && (
                        <a className="login" href="http://localhost:3000/login">
                            Увійти
                        </a>
                    )}
                    {isLoggedIn && (
                        <a className="logout" onClick={handleLogout}>
                            Вийти
                        </a>
                    )}
                </div>
            </Toolbar>
        </AppBar>);
}

export default Header;
