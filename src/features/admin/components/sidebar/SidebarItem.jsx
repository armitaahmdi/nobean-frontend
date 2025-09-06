import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function SidebarItem({ item }) {
    const [open, setOpen] = useState(false);

    const toggleOpen = () => setOpen((prev) => !prev);

    if (item.submenu && item.submenu.length > 0) {
        return (
            <div>
                <button
                    onClick={toggleOpen}
                    aria-expanded={open}
                    aria-controls={`${item.id}-submenu`}
                    className={`flex items-center justify-between w-full p-3 rounded-lg cursor-pointer
            hover:bg-gray-100 transition-colors duration-200
            ${open ? "bg-gray-100 font-semibold text-gray-800" : "text-gray-700"}`}
                >
                    <div className="flex items-center gap-3">
                        {item.icon && <item.icon className="text-base" />}
                        <span>{item.name}</span>
                    </div>
                    <svg
                        className={`w-5 h-5 transition-transform duration-300 ${open ? "rotate-90" : ""}`}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                </button>

                <div
                    id={`${item.id}-submenu`}
                    className={`overflow-hidden transition-[max-height] duration-300 ease-in-out ${open ? "max-h-96 mt-1" : "max-h-0"
                        }`}
                    role="region"
                    aria-hidden={!open}
                >
                    {item.submenu.map((sub) => (
                        <NavLink
                            key={sub.id}
                            to={sub.link}
                            className={({ isActive }) =>
                                `block py-2 px-4 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors duration-200
                 ${isActive ? "bg-blue-100 text-blue-700 font-semibold" : "text-gray-600"}`
                            }
                        >
                            {sub.name}
                        </NavLink>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <NavLink
            to={item.link}
            className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors duration-200
        ${isActive ? "bg-blue-100 text-blue-700 font-semibold" : "text-gray-700"}`
            }
        >
            {item.icon && <item.icon className="text-base" />}
            <span>{item.name}</span>
        </NavLink>
    );
}
