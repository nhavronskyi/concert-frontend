import {IconButton, Link, Menu, MenuItem} from "@mui/material";
import dateLogo from "../../images/date-picker.png";
import React, {useState} from "react";

export function DatePicker() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
       <div>
           <IconButton onClick={handleMenuOpen}>
               <img src={dateLogo} alt="Custom Arrow" style={{ width: "40px", height: "40px" }} />
           </IconButton>
           <Menu
               anchorEl={anchorEl}
               open={Boolean(anchorEl)}
               onClose={handleMenuClose}
           >
               <MenuItem>
                   {/*<Link to="/today" className="header-link">*/}
                   {/*    Сьогодні*/}
                   {/*</Link>*/}
               </MenuItem>
               <MenuItem>
                   {/*<Link to="/tomorrow" className="header-link">*/}
                   {/*    Завтра*/}
                   {/*</Link>*/}
               </MenuItem>
               <MenuItem>
                   {/*<Link to="/this-week" className="header-link">*/}
                   {/*    Цього тижня*/}
                   {/*</Link>*/}
               </MenuItem>
               <MenuItem>
                   {/*<Link to="/this-month" className="header-link">*/}
                   {/*    Цього місяця*/}
                   {/*</Link>*/}
               </MenuItem>
           </Menu>
       </div>
    );
}

export default DatePicker;