import { useEffect, useRef, useState } from "react";
import { HiChevronDown } from "react-icons/hi";
import { NavLink } from "react-router-dom";
import { PiLinkDuotone } from "react-icons/pi";

function NavDropdown({ label, link, submenu }) {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);
    let leaveTimeout = useRef();

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    function handleKeyDown(e) {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setOpen(!open);
        }
        if (e.key === "Escape") {
            setOpen(false);
        }
    }

    return (
        <div
            className="relative"
            ref={dropdownRef}
            onMouseEnter={() => {
                clearTimeout(leaveTimeout.current);
                setOpen(true);
            }}
            onMouseLeave={() => {
                leaveTimeout.current = setTimeout(() => {
                    setOpen(false);
                }, 200);
            }}
        >
            <div className="flex items-center gap-1">
                <NavLink
                    to={link}
                    className={({ isActive }) =>
                        `block font-bold  px-3 py-2 rounded-xl transition-all duration-200 
                        hover:bg-sky-50 focus:outline-none focus:ring-2 focus:ring-sky-200 
                        ${isActive ? "font-semibold text-sky-600" : "text-gray-700"}`
                    }

                    onKeyDown={handleKeyDown}
                >
                    {label}
                </NavLink>

                <button
                    onClick={() => setOpen(!open)}
                    onKeyDown={handleKeyDown}
                    aria-haspopup="true"
                    aria-expanded={open}
                    className="focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label={open ? "بستن زیرمنو" : "باز کردن زیرمنو"}
                >
                    <HiChevronDown
                        className={`transition-transform duration-300 ${open ? "rotate-180" : ""
                            }`}
                    />
                </button>
            </div>
            <ul
                className={`absolute top-full w-[500px] lg:left-1/2 lg:-translate-x-1/2 mt-4 
                    bg-white border border-gray-200 rounded-2xl shadow-2xl z-50 
                    origin-top transform transition-transform duration-300 ease-out 
                    grid grid-cols-2 gap-3 p-4 
                    ${open ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0 pointer-events-none"}`}
                role="menu"
            >
                {submenu.map((item, idx) => (
                    <li key={idx} role="none">
                        <NavLink
                            to={item.link}
                            role="menuitem"
                            tabIndex={open ? 0 : -1}
                            onClick={() => setOpen(false)}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-3 text-sm rounded-xl transition-all duration-200
                                hover:bg-sky-100 focus:bg-sky-100 focus:outline-none focus:ring-2 focus:ring-sky-200
                                shadow-sm hover:shadow-md
                                ${isActive ? "bg-sky-50 text-sky-600 font-semibold" : "text-gray-700"}`
                            }
                        >
                            <PiLinkDuotone className="text-lg text-sky-500" />
                            {item.name}
                        </NavLink>
                    </li>
                ))}

            </ul>
        </div>
    );
}

export default NavDropdown;