import { useState } from "react";
import { NavLink } from "react-router-dom";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";

export default function MobileDropdown({ item, closeMobileMenu }) {
    const [open, setOpen] = useState(false);

    return (
        <div>
            <div className="flex justify-between items-center px-4 py-3 cursor-pointer font-bold hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <NavLink
                    to={item.link}
                    className="flex-1"
                    onClick={() => {
                        setOpen(false); 
                        closeMobileMenu();  
                    }}
                >
                    {item.name}
                </NavLink>

                {/* دکمه باز/بسته کردن زیرمنو */}
                {item.submenu && item.submenu.length > 0 && (
                    <button
                        onClick={() => setOpen(!open)}
                        aria-expanded={open}
                        aria-label={open ? "بستن زیرمنو" : "باز کردن زیرمنو"}
                        className="focus:outline-none focus:ring-2 focus:ring-blue-500 text-xl"
                    >
                        {open ? <HiChevronUp /> : <HiChevronDown />}
                    </button>
                )}
            </div>

            {/* زیرمنو */}
            {open && item.submenu && (
                <ul className="pl-6 border-l-4 border-blue-600 bg-white">
                    {item.submenu.map((subitem, idx) => (
                        <li key={idx} className="py-2">
                            <NavLink
                                to={subitem.link}
                                className="block px-6 py-2 hover:bg-gray-100 focus:outline-none focus:bg-gray-200"
                                onClick={() => {
                                    setOpen(false);   
                                    closeMobileMenu(); 
                                }}
                            >
                                {subitem.name}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
