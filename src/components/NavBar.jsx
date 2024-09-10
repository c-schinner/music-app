import { useState } from 'react';
import { FaBars } from "react-icons/fa";
const NavBar = () => {

    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="position: relative">
            <FaBars
            onClick={toggleMenu}
            className="absolute mt-10 mr-10 fontSize-24 cursor: cursor-pointer"
            />
            {isOpen && (
                <ul className="absolute mt-10 mr-10 bg-white p-10 box-shadow">
                <li id="#profile">Profile</li>
                <li id="#">Something</li>
            </ul>
            )}
        </div>
    )
}

export default NavBar