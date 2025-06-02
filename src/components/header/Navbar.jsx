import { useState } from "react";
import { NavLink } from "react-router-dom";
// import { menuItems } from "../../constants/menuItems";
import NavDropdown from "./NavDropdown";
import MobileDropdown from "./MobileDropdown";
import { HiMenu, HiX } from "react-icons/hi";
import mainLogo from "../../assets/images/logo/main-logo.png";
import translate from "../../locale/translate";
import { useMenuItems } from "../../hooks/useMenuItems";

export default function Navbar() {
    const menuItems = useMenuItems();
    const [mobileOpen, setMobileOpen] = useState(false);

    function handleKeyDown(e) {
        if (e.key === "Escape") {
            setMobileOpen(false);
        }
    }

    return (
        <nav
            className="bg-white px-6 py-3"
            role="navigation"
            aria-label="Primary Navigation"
            onKeyDown={handleKeyDown}
        >
            {/* mobile*/}
            <div className="md:hidden flex justify-between items-center">
                <button
                    aria-label={mobileOpen ? "Close menu" : "Open menu"}
                    aria-expanded={mobileOpen}
                    onClick={() => setMobileOpen(!mobileOpen)}
                    className="text-3xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    {mobileOpen ? <HiX /> : <HiMenu />}
                </button>

                <img src={mainLogo} alt={translate.altdescription} className="w-[125px] h-[78px]" />
            </div>

            {/* desktop*/}
            <ul className="hidden lg:text-[15px] md:text-[13px] md:flex justify-center items-center gap-6">
                {menuItems.map((item, idx) => (
                    <li key={idx} className="relative">
                        {item.submenu ? (
                            <NavDropdown label={item.name} link={item.link} submenu={item.submenu} />
                        ) : (
                            <NavLink
                                to={item.link}
                                className={({ isActive }) =>
                                    `flex items-center font-bold gap-1 px-3 py-2 rounded hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${isActive ? "text-blue-600" : ""
                                    }`
                                }
                            >
                                {item.name}
                            </NavLink>
                        )}
                    </li>
                ))}
            </ul>

            <div
                className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50
                    ${mobileOpen ? "translate-x-0" : "translate-x-full"}`}
                aria-label="Mobile menu"
            >
                <button
                    onClick={() => setMobileOpen(false)}
                    aria-label="Close menu"
                    className="absolute top-4 left-4 p-2 text-gray-700 hover:text-gray-900 focus:outline-none"
                >
                    <HiX className="w-6 h-6" />
                </button>

                <ul className="flex flex-col gap-1 overflow-auto h-full mt-3">
                    {menuItems.map((item, idx) => (
                        <li key={idx} className="border-b border-gray-200">
                            {item.submenu ? (
                                <MobileDropdown item={item} closeMobileMenu={() => setMobileOpen(false)} />
                            ) : (
                                <NavLink
                                    to={item.link}
                                    className={({ isActive }) =>
                                        `block px-4 py-3 font-bold hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${isActive ? "text-blue-600" : ""
                                        }`
                                    }
                                    onClick={() => setMobileOpen(false)}
                                >
                                    {item.name}
                                </NavLink>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
}