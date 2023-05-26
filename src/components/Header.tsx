import {AppBar, Toolbar, useScrollTrigger} from "@mui/material";
import {useEffect, useState} from "react";
import logo from "../images/logo.png";
import DatePicker from "./header/DatePicker";

export function Header() {
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 50,
    });

    const [headerSize, setHeaderSize] = useState("regular");

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


    return (
        <AppBar
            position="fixed"
            className={trigger ? `header scrolled ${headerSize}` : "header"}
            sx={{backgroundColor: "black", color: "white"}}
        >
            <Toolbar className="header-container">
                <img src={logo} alt="Logo" style={{width: "43px", height: "43px"}}/>
                <DatePicker/>
            </Toolbar>
        </AppBar>
    );
}

export default Header;
