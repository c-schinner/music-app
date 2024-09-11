import { useState } from 'react';
import { FaBars } from "react-icons/fa";
const NavBar = () => {

    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="relative">
            <FaBars
            onClick={toggleMenu}
            className="absolute mt-10 mr-10 fontSize-24 cursor-pointer"
            />
            {isOpen && (
                <ul className="absolute mt-10 mr-10 p-10 box-shadow rounded-lg">
                    <button
                        onClick={toggleMenu}
                        className="bg-black text-white border rounded-sm text-sm cursor-pointer">
                            X
                    </button>
                    <li id="#profile">Profile</li>
                    <li id="#">Something</li>
            </ul>
            )}
        </div>
    )
}

export default NavBar