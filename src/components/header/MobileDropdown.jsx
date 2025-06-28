import { useState } from "react";
import { NavLink } from "react-router-dom";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";

export default function MobileDropdown({ item, closeMobileMenu }) {
    const [open, setOpen] = useState(false);
    const Icon = item.icon;

    return (
        <div className="w-full">
            <div
                className="flex justify-between items-center px-2 py-3 cursor-pointer text-gray-800 font-semibold rounded-lg hover:bg-gray-100 transition"
            >
                <NavLink
                    to={item.link}
                    className="flex-1 flex items-center"
                    onClick={() => {
                        setOpen(false);
                        closeMobileMenu();
                    }}
                >
                    <span className="text-lg text-gray-600">
                        {Icon && <Icon className="ml-1" />}
                    </span>

                    {item.name}
                </NavLink>

                {item.submenu && item.submenu.length > 0 && (
                    <button
                        onClick={() => setOpen(!open)}
                        aria-expanded={open}
                        aria-label={open ? "بستن زیرمنو" : "باز کردن زیرمنو"}
                        className="text-gray-600 hover:text-blue-600 transition"
                    >
                        {open ? <HiChevronUp className="w-5 h-5" /> : <HiChevronDown className="w-5 h-5" />}
                    </button>
                )}
            </div>

            {/* زیرمنو با انیمیشن ساده */}
            <div
                className={`overflow-hidden transition-all duration-300 ${open ? "max-h-[500px]" : "max-h-0"}`}
            >
                <ul className="flex flex-col gap-1 mt-1 px-4 bg-gray-50 rounded-md">
                    {item.submenu?.map((subitem, idx) => (
                        <li key={idx}>
                            <NavLink
                                to={subitem.link}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-white rounded transition"
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
            </div>
        </div>
    );
}
