import { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { HiMenu, HiX } from "react-icons/hi";
import { FaUser, FaSignOutAlt } from "react-icons/fa";
import NavDropdown from "./NavDropdown";
import MobileDropdown from "./MobileDropdown";
import mainLogo from "../../assets/images/logo/main-logo.png";
import translate from "../../locale/translate";
import { useMenuItems } from "../../hooks/useMenuItems";
import { useNavigate } from "react-router-dom";
import { logout } from "../../features/authentication/slices/loginSlice";
import { RiAdminLine } from "react-icons/ri";

export default function Navbar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const menuItems = useMenuItems();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [userDropdownOpen, setUserDropdownOpen] = useState(false);
    const userDropdownRef = useRef(null);
    
    // Get authentication state from Redux
    const { isAuthenticated, user } = useSelector((state) => state.auth);
    const { profile } = useSelector((state) => state.profile);

    console.log('Navbar - User data:', user);
    console.log('Navbar - User role:', user?.user?.role || user?.role);
    console.log('Navbar - Is admin?', (user?.user?.role === "admin" || user?.user?.role === "superadmin") || (user?.role === "admin" || user?.role === "superadmin"));

    // Check if profile is complete
    const isProfileComplete = () => {
        // Use profile data if available, otherwise use user data from auth
        const dataSource = profile || user;
        if (!dataSource) return false;
        return dataSource.firstName && dataSource.lastName && dataSource.email && dataSource.age;
    };

    const firstHalf = menuItems.slice(0, Math.ceil(menuItems.length / 2));
    const secondHalf = menuItems.slice(Math.ceil(menuItems.length / 2));

    function handleKeyDown(e) {
        if (e.key === "Escape") {
            setMobileOpen(false);
            setUserDropdownOpen(false);
        }
    }

    const handleLogout = async () => {
        try {
            await dispatch(logout());
            setUserDropdownOpen(false);
            navigate('/');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
                setUserDropdownOpen(false);
            }
        };

        if (userDropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [userDropdownOpen]);

    return (
        <>
            <nav
                className="py-3 rounded-[20px] w-full  "
                role="navigation"
                aria-label="Primary Navigation"
                onKeyDown={handleKeyDown}
            >
                {/* ipad & mobile */}
                <div className="lg:hidden bg-white rounded-[20px] shadow-[0_4px_12px_rgba(59,130,246,0.25)] flex justify-between items-center w-full relative">
                    {/* همبرگر سمت راست */}
                    <button
                        aria-label={mobileOpen ? "Close menu" : "Open menu"}
                        aria-expanded={mobileOpen}
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="text-3xl focus:outline-none focus:ring-2 focus:ring-blue-500 absolute right-2"
                    >
                        {mobileOpen ? <HiX /> : <HiMenu />}
                    </button>

                    {/* لوگو وسط چین */}
                    <div className="mx-auto">
                        <img
                            onClick={() => navigate("/")}
                            src={mainLogo}
                            alt="لوگو"
                            className="w-[110px] h-[65px] cursor-pointer"
                        />
                    </div>
                </div>


                {/* desktop */}
                <div className="hidden lg:flex justify-center">

                    <div className="w-full xxl:w-[70%] lg:shadow-[0_4px_12px_rgba(59,130,246,0.25)] lg:bg-white lg:py-3 lg:rounded-[20px] flex items-center justify-center">

                        {/* منوی سمت راست */}
                        <div className="flex items-center flex-shrink-1">
                            <ul className="flex text-[16px] items-center">
                                {firstHalf.map((item, idx) => (
                                    <li key={idx}>
                                        {item.submenu && item.submenu.length > 0 ? (
                                            <NavDropdown
                                                label={item.name}
                                                link={item.link}
                                                submenu={item.submenu}
                                            />
                                        ) : (
                                            <NavLink
                                                to={item.link}
                                                className={({ isActive }) =>
                                                    `font-bold text-[16px] px-3 py-2 rounded hover:bg-gray-200 whitespace-nowrap ${isActive ? "text-blue-600" : "text-gray-800"
                                                    }`
                                                }
                                            >
                                                {item.name}
                                            </NavLink>
                                        )}
                                    </li>

                                ))}
                            </ul>
                        </div>

                        {/* لوگو */}
                        <div className="mx-3 flex-shrink-0">
                            <img
                                onClick={() => navigate("/")}
                                src={mainLogo}
                                alt={translate.altdescription}
                                className="w-[80px] h-auto cursor-pointer"
                            />
                        </div>

                        {/* منوی سمت چپ و دکمه ورود */}
                        <div className="flex items-center flex-shrink-1">
                            <ul className="flex text-[16px] items-center">
                                {secondHalf.map((item, idx) => (
                                    <li key={idx}>
                                        {item.submenu && item.submenu.length > 0 ? (
                                            <NavDropdown
                                                label={item.name}
                                                link={item.link}
                                                submenu={item.submenu}
                                            />
                                        ) : (
                                            <NavLink
                                                to={item.link}
                                                className={({ isActive }) =>
                                                    `font-bold text-[16px] px-3 py-2 rounded hover:bg-gray-200 whitespace-nowrap ${isActive ? "text-blue-600" : "text-gray-800"
                                                    }`
                                                }
                                            >
                                                {item.name}
                                            </NavLink>
                                        )}
                                    </li>
                                ))}
                            </ul>
                            {isAuthenticated ? (
                                <div className="relative ml-2 flex items-center" ref={userDropdownRef}>
                                    <button
                                        onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                                        className="bg-white text-gray-700 font-semibold px-4 py-2 rounded-xl whitespace-nowrap
                                        border border-gray-200 hover:border-lightBlue hover:text-lightBlue
                                        transition-all duration-300 hover:shadow-md flex items-center gap-2"
                                    >
                                        <div className="w-8 h-8 bg-lightBlue/10 rounded-full flex items-center justify-center">
                                            <FaUser className="text-sm text-lightBlue" />
                                        </div>
                                        {user?.phone || user?.name || 'کاربر'}
                                    </button>
                                    {((user?.user?.role === "superadmin" || user?.user?.role === "admin") || (user?.role === "superadmin" || user?.role === "admin")) && (
                                        <button
                                            onClick={() => navigate('/admin')}
                                            className="mr-2 transition-all duration-300 hover:shadow-md"
                                            aria-label="پنل ادمین"
                                            title="پنل ادمین"
                                        >
                                            <div className="w-10 h-10 bg-lightBlue/10 rounded-full flex items-center justify-center">
                                                <RiAdminLine className="w-5 h-5 text-lightBlue" />
                                            </div>
                                        </button>
                                    )}
                                    
                                    {/* Profile Completion Alert */}
                                    {!isProfileComplete() && (
                                        <div className="absolute top-full right-0 mt-1 w-48 bg-orange-50 border border-orange-200 rounded-lg p-2 text-xs text-orange-700 z-40">
                                            <div className="flex items-center gap-1">
                                                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                                                پروفایل خود را تکمیل کنید
                                            </div>
                                        </div>
                                    )}
                                    
                                    {/* User Dropdown */}
                                    {userDropdownOpen && (
                                        <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                                            <div className="py-2">
                                                <div className="px-4 py-2 border-b border-gray-100">
                                                    <p className="text-sm font-semibold text-gray-900">
                                                        {user?.phone || user?.name || 'کاربر'}
                                                    </p>
                                                    <p className="text-xs text-gray-500">
                                                        {user?.email || 'کاربر نوبین'}
                                                    </p>
                                                </div>
                                                <button
                                                    onClick={() => navigate('/dashboard')}
                                                    className="w-full text-right px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                                                >
                                                    <FaUser className="text-sm" />
                                                    حساب کاربری
                                                </button>
                                                <button
                                                    onClick={handleLogout}
                                                    className="w-full text-right px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                                                >
                                                    <FaSignOutAlt className="text-sm" />
                                                    خروج
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <NavLink
                                    to="/login"
                                    className="bg-lightBlue text-white font-bold px-4 ml-2 py-2 rounded-lg whitespace-nowrap
                                transition-shadow duration-300 hover:shadow-[0_0_0_5px_rgba(3,105,161,0.3)]"
                                >
                                    {translate.loginOrSignup}
                                </NavLink>
                            )}
                        </div>
                    </div>
                </div>

                {/* منوی موبایل */}
                {mobileOpen && (
                    <div
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
                        onClick={() => setMobileOpen(false)}
                        aria-hidden="true"
                    />
                )}

                <div
                    className={`fixed top-0 right-0 flex flex-col h-full w-80 bg-white backdrop-blur-lg
                     shadow-xl transform transition-transform duration-300 ease-in-out z-50 rounded-tl-[50px] rounded-bl-[50px]
                     ${mobileOpen ? "translate-x-0" : "translate-x-full"
                        }`}
                    aria-label="Mobile menu"
                >
                    {/* دکمه بستن */}
                    <button
                        onClick={() => setMobileOpen(false)}
                        aria-label="Close menu"
                        className="absolute top-4 left-4 p-2 text-darkBlue focus:outline-none"
                    >
                        <HiX className="w-6 h-6 hover:border-2 hover:rounded-full hover:border-lightBlue" />
                    </button>

                    {/* لوگو بالا و وسط */}
                    <div className="mt-10 mb-6 flex justify-center">
                        <img src={mainLogo} alt={translate.altdescription} className="w-[100px] h-auto" />
                    </div>

                    {/* منو آیتم‌ها */}
                    <ul className="flex flex-col gap-1 overflow-auto px-4 mb-24">
                        {menuItems.map((item, idx) => (
                            <li key={idx}>
                                {item.submenu ? (
                                    <MobileDropdown item={item} closeMobileMenu={() => setMobileOpen(false)} />
                                ) : (
                                    <NavLink
                                        to={item.link}
                                        className={({ isActive }) =>
                                            `flex items-center gap-2 px-2 py-3 font-bold hover:bg-gray-100 rounded ${isActive ? "text-blue-600" : "text-gray-800"}`
                                        }
                                        onClick={() => setMobileOpen(false)}
                                    >
                                        {item.icon && <item.icon className="text-lg text-gray-600" />}
                                        <span>{item.name}</span>
                                    </NavLink>

                                )}
                            </li>
                        ))}
                    </ul>

                    {/* دکمه ورود ثبت نام در پایین */}
                    <div className="absolute flex justify-center bottom-6 left-0 w-full px-4">
                        {isAuthenticated ? (
                            <div className="w-3/4 space-y-2">
                                <div className="flex items-center justify-center gap-2">
                                    <button
                                        onClick={() => { navigate('/dashboard'); setMobileOpen(false); }}
                                        className="flex-1 bg-white text-gray-700 font-semibold px-4 py-3 rounded-[40px] text-center flex items-center justify-center gap-2 border border-gray-200 hover:border-lightBlue hover:text-lightBlue transition-colors"
                                        aria-label="رفتن به داشبورد"
                                    >
                                        <div className="w-8 h-8 bg-lightBlue/10 rounded-full flex items-center justify-center">
                                            <FaUser className="text-sm text-lightBlue" />
                                        </div>
                                        {user?.phone || user?.name || 'کاربر'}
                                    </button>
                                    {((user?.user?.role === "superadmin" || user?.user?.role === "admin") || (user?.role === "superadmin" || user?.role === "admin")) && (
                                        <button
                                            onClick={() => {
                                                navigate('/admin');
                                                setMobileOpen(false);
                                            }}
                                            className="p-2 rounded-full transition-all duration-300 hover:shadow-md"
                                            aria-label="پنل ادمین"
                                            title="پنل ادمین"
                                        >
                                            <div className="w-8 h-8 bg-lightBlue/10 rounded-full flex items-center justify-center">
                                                <RiAdminLine className="text-sm text-lightBlue" />
                                            </div>
                                        </button>
                                    )}
                                </div>
                                
                                {/* Profile Completion Alert - Mobile */}
                                {!isProfileComplete() && (
                                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-2 text-xs text-orange-700 text-center">
                                        <div className="flex items-center justify-center gap-1">
                                            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                                            پروفایل خود را تکمیل کنید
                                        </div>
                                    </div>
                                )}
                                <button
                                    onClick={() => {
                                        handleLogout();
                                        setMobileOpen(false);
                                    }}
                                    className="w-full bg-red-500 text-white font-bold px-4 py-3 rounded-[40px] 
                                    transition-shadow duration-300 hover:shadow-[0_0_0_5px_rgba(239,68,68,0.3)] flex items-center justify-center gap-2"
                                >
                                    <FaSignOutAlt />
                                    خروج
                                </button>
                            </div>
                        ) : (
                            <NavLink
                                to="/login"
                                className="w-3/4 block text-center bg-darkBlue text-white font-bold px-4 py-3 rounded-[40px] 
                            transition-shadow duration-300 hover:shadow-[0_0_0_5px_rgba(3,105,161,0.3)]"
                                onClick={() => setMobileOpen(false)}
                            >
                                {translate.loginOrSignup}
                            </NavLink>
                        )}
                    </div>

                </div>
            </nav>
        </>
    );
}