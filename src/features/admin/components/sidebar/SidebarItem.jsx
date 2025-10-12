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
                    className={`flex items-center justify-between w-full p-3 rounded-xl transition-all duration-200 group ${
                        open 
                            ? "bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 shadow-sm border border-blue-200" 
                            : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                    }`}
                >
                    <div className="flex items-center gap-3">
                        {item.icon && (
                            <div className={`p-2 rounded-lg transition-colors duration-200 ${
                                open ? "bg-blue-100 text-blue-600" : "bg-slate-100 text-slate-500 group-hover:bg-slate-200"
                            }`}>
                                <item.icon className="text-sm" />
                            </div>
                        )}
                        <span className="font-medium">{item.name}</span>
                    </div>
                    <svg
                        className={`w-4 h-4 transition-transform duration-200 ${open ? "rotate-90" : ""}`}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                </button>

                <div className={`overflow-hidden transition-all duration-300 ${open ? "max-h-96 mt-2" : "max-h-0"}`}>
                    <div className="pr-4 space-y-1">
                        {item.submenu.map((sub) => (
                            <NavLink
                                key={sub.id}
                                to={sub.link}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 py-2 px-4 rounded-lg text-sm transition-all duration-200 group/sub ${
                                        isActive 
                                            ? "bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 font-medium shadow-sm border border-blue-200" 
                                            : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                                    }`
                                }
                            >
                                {sub.icon && (
                                    <div className={`p-1.5 rounded-md transition-colors duration-200 ${
                                        "bg-slate-100 text-slate-500 group-hover/sub:bg-slate-200"
                                    }`}>
                                        <sub.icon className="text-xs" />
                                    </div>
                                )}
                                <span>{sub.name}</span>
                            </NavLink>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <NavLink
            to={item.link}
            className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-xl transition-all duration-200 group ${
                    isActive 
                        ? "bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 shadow-sm border border-blue-200" 
                        : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                }`
            }
        >
            {item.icon && (
                <div className={`p-2 rounded-lg transition-colors duration-200 ${
                    "bg-slate-100 text-slate-500 group-hover:bg-slate-200"
                }`}>
                    <item.icon className="text-sm" />
                </div>
            )}
            <span className="font-medium">{item.name}</span>
        </NavLink>
    );
}
