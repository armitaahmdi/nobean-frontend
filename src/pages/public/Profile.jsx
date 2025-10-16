import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaUser, FaEnvelope, FaPhone, FaCalendarAlt, FaChild, FaUserTie, FaUserSecret } from 'react-icons/fa';
import { HiOutlinePencil } from 'react-icons/hi';
import { toast } from 'react-toastify';
import HelmetSeo from '../../helper/helmet';
import { useBreadcrumb } from '../../contexts/BreadcrumbContext';
import { createProfile, updateProfile, clearProfileError, getProfile } from '../../features/user/profile/profileSlice';

const Profile = () => {
    const dispatch = useDispatch();
    const { user, token } = useSelector((state) => state.auth);
    const { profile, isLoading, isUpdating, error } = useSelector((state) => state.profile);
    const isAuthenticated = !!token && !!user;
    const { setPageTitle, clearPageTitle } = useBreadcrumb();
    
    // Initialize form data with cached data if available
    const getInitialFormData = () => {
        try {
            const localUserData = localStorage.getItem('userData');
            if (localUserData) {
                const parsedData = JSON.parse(localUserData);
                return {
                    firstName: parsedData.firstName || '',
                    lastName: parsedData.lastName || '',
                    userName: parsedData.userName || '',
                    email: parsedData.email || '',
                    age: parsedData.age || '',
                    isParent: parsedData.isParent !== undefined ? parsedData.isParent : false,
                    childPhone: parsedData.childPhone || '',
                    isFather: parsedData.isFather !== undefined ? parsedData.isFather : null
                };
            }
        } catch (error) {
            console.error('Profile: Error parsing localStorage data:', error);
        }
        
        return {
            firstName: '',
            lastName: '',
            userName: '',
            email: '',
            age: '',
            isParent: false,
            childPhone: '',
            isFather: null
        };
    };

    // Check if profile is incomplete based on initial data
    const checkIfNewProfile = (data) => {
        return !data.firstName || !data.lastName || !data.age;
    };

    const initialData = getInitialFormData();
    const [formData, setFormData] = useState(initialData);
    const [isEditing, setIsEditing] = useState(checkIfNewProfile(initialData)); // Auto-enable editing for incomplete profiles
    const [isNewProfile, setIsNewProfile] = useState(checkIfNewProfile(initialData));

    // Set breadcrumb title
    useEffect(() => {
        setPageTitle("پروفایل کاربری");
        
        return () => {
            clearPageTitle();
        };
    }, [setPageTitle, clearPageTitle]);

    // Initialize profile data immediately from localStorage or Redux
    useEffect(() => {
        if (isAuthenticated) {
            // Check if we have complete profile data from Redux
            const hasCompleteData = user && user.firstName && user.lastName && user.age;
            
            if (hasCompleteData) {
                console.log('Profile: Complete profile data available from Redux');
                return; // No need to fetch
            }
            
            // Check localStorage for cached data
            try {
                const localUserData = localStorage.getItem('userData');
                if (localUserData) {
                    const parsedData = JSON.parse(localUserData);
                    const hasLocalCompleteData = parsedData.firstName && parsedData.lastName && parsedData.age;
                    
                    if (hasLocalCompleteData) {
                        console.log('Profile: Using cached data from localStorage');
                        return; // Use cached data, no need to fetch
                    }
                }
            } catch (error) {
                console.error('Profile: Error parsing localStorage data:', error);
            }
            
            // Only fetch if we don't have complete data anywhere
            console.log('Profile: No complete data found, fetching from API...');
            dispatch(getProfile()).catch((error) => {
                console.error('Profile fetch failed:', error);
            });
        }
    }, [isAuthenticated, dispatch, user]);

    // Initialize form data when profile data is available
    useEffect(() => {
        // Use profile data if available, otherwise use user data from auth
        let dataSource = profile || user;
        
        // If no profile data from Redux, try to get from localStorage
        if (!dataSource || (!dataSource.firstName && !dataSource.lastName)) {
            try {
                const localUserData = localStorage.getItem('userData');
                if (localUserData) {
                    const parsedData = JSON.parse(localUserData);
                    console.log('Profile: Using data from localStorage:', parsedData);
                    dataSource = parsedData;
                }
            } catch (error) {
                console.error('Profile: Error parsing localStorage data:', error);
            }
        }
        
        if (dataSource) {
            const newFormData = {
                firstName: dataSource.firstName || '',
                lastName: dataSource.lastName || '',
                userName: dataSource.userName || '',
                email: dataSource.email || '',
                age: dataSource.age || '',
                isParent: dataSource.isParent !== undefined ? dataSource.isParent : false,
                childPhone: dataSource.childPhone || '',
                isFather: dataSource.isFather !== undefined ? dataSource.isFather : null
            };
            
            setFormData(newFormData);
            
            // Check if profile is incomplete (missing required fields)
            const isIncomplete = !newFormData.firstName || !newFormData.lastName || !newFormData.age;
            
            if (isIncomplete) {
                setIsNewProfile(true);
                setIsEditing(true); // Auto-enable editing for incomplete profiles
            } else {
                setIsNewProfile(false);
                setIsEditing(false);
            }
        }
    }, [profile, user]);

    // Handle errors
    useEffect(() => {
        if (error) {
            // Don't show error toast for profile fetch failures - we'll use auth data instead
            if (!error.includes('500') && !error.includes('Internal Server Error')) {
                toast.error(error, {
                    className: "text-lg font-semibold",
                });
            }
            dispatch(clearProfileError());
        }
    }, [error, dispatch]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        
        // Convert age to number if it's a number input
        let processedValue = value;
        if (name === 'age' && value !== '') {
            processedValue = parseInt(value, 10);
        }
        
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : processedValue
        }));
    };

    // Clean and validate form data before sending
    const cleanFormData = (data) => {
        const cleaned = {
            firstName: data.firstName?.trim() || '',
            lastName: data.lastName?.trim() || '',
            userName: data.userName?.trim() || '',
            email: data.email?.trim() || '',
            age: typeof data.age === 'string' ? parseInt(data.age, 10) : data.age,
            isParent: Boolean(data.isParent),
            childPhone: data.childPhone?.trim() || '',
            isFather: data.isFather === null ? null : Boolean(data.isFather)
        };
        
        // Handle childPhone - only include if isParent is true
        if (!cleaned.isParent) {
            delete cleaned.childPhone;
            delete cleaned.isFather;
        } else {
            // Remove empty strings and convert to null for optional fields
            if (cleaned.childPhone === '') {
                cleaned.childPhone = null;
            }
            // Ensure isFather is boolean, not null
            if (cleaned.isFather === null) {
                cleaned.isFather = false; // Default to false if not selected
            }
        }
        
        // Validate required fields
        const requiredFields = ['firstName', 'lastName', 'age'];
        const missingFields = requiredFields.filter(field => !cleaned[field] || cleaned[field] === '');
        
        if (missingFields.length > 0) {
            const fieldNames = {
                firstName: 'نام',
                lastName: 'نام خانوادگی', 
                email: 'ایمیل',
                age: 'سن'
            };
            const missingFieldNames = missingFields.map(field => fieldNames[field]).join(', ');
            throw new Error(`فیلدهای اجباری پر نشده‌اند: ${missingFieldNames}`);
        }
        
        // Handle userName - if empty, remove it from the request
        if (!cleaned.userName || cleaned.userName === '') {
            delete cleaned.userName;
        } else {
            // Validate userName format (alphanumeric and underscore only)
            const userNameRegex = /^[a-zA-Z0-9_]+$/;
            if (!userNameRegex.test(cleaned.userName)) {
                throw new Error('نام کاربری باید فقط شامل حروف انگلیسی، اعداد و خط تیره باشد');
            }
        }
        
        // Ensure age is a number
        if (typeof cleaned.age !== 'number' || isNaN(cleaned.age)) {
            throw new Error('سن باید یک عدد معتبر باشد');
        }
        
        // Validate age range
        if (cleaned.age < 1 || cleaned.age > 120) {
            throw new Error('سن باید بین 1 تا 120 سال باشد');
        }
        
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (cleaned.email && !emailRegex.test(cleaned.email)) {
            throw new Error('فرمت ایمیل نامعتبر است');
        }
        
        // Ensure email is lowercase
        if (cleaned.email) {
            cleaned.email = cleaned.email.toLowerCase();
        }
        
        return cleaned;
    };

    const handleSave = async () => {
        try {
            const cleanedData = cleanFormData(formData);
            
            console.log('Sending profile data:', cleanedData);
            
            if (isNewProfile) {
                // اگر ایمیل خالی است، به جای ایجاد (POST) از ویرایش (PATCH) استفاده کن تا 400 نشود
                if (!cleanedData.email) {
                    await dispatch(updateProfile(cleanedData)).unwrap();
                    toast.success("پروفایل با موفقیت ایجاد شد", {
                        className: "text-lg font-semibold",
                    });
                } else {
                    // Create new profile
                    await dispatch(createProfile(cleanedData)).unwrap();
                    toast.success("پروفایل با موفقیت ایجاد شد", {
                        className: "text-lg font-semibold",
                    });
                }
            } else {
                // Update existing profile
                await dispatch(updateProfile(cleanedData)).unwrap();
                toast.success("پروفایل با موفقیت به‌روزرسانی شد", {
                    className: "text-lg font-semibold",
                });
            }
            
            setIsEditing(false);
            setIsNewProfile(false);
        } catch (error) {
            console.error('Profile save error:', error);
            
            // Show validation errors
            if (error.message && (error.message.includes('فیلدهای اجباری') || 
                error.message.includes('سن باید') || 
                error.message.includes('فرمت ایمیل'))) {
                toast.error(error.message, {
                    className: "text-lg font-semibold",
                });
                return;
            }
            
            // Check if it's a backend error
            if (error.message && (error.message.includes('500') || error.message.includes('Internal Server Error'))) {
                toast.warning("خطا در سرور. لطفاً بعداً دوباره تلاش کنید.", {
                    className: "text-lg font-semibold",
                });
            } else if (error.message && error.message.includes('400')) {
                toast.error("داده‌های ارسالی نامعتبر است. لطفاً فیلدها را بررسی کنید.", {
                    className: "text-lg font-semibold",
                });
            } else {
                toast.error("خطا در ذخیره پروفایل", {
                    className: "text-lg font-semibold",
                });
            }
        }
    };

    const handleCancel = () => {
        // Reset form data to original data
        let dataSource = profile || user;
        
        // If no profile data from Redux, try to get from localStorage
        if (!dataSource || (!dataSource.firstName && !dataSource.lastName)) {
            try {
                const localUserData = localStorage.getItem('userData');
                if (localUserData) {
                    const parsedData = JSON.parse(localUserData);
                    dataSource = parsedData;
                }
            } catch (error) {
                console.error('Profile: Error parsing localStorage data:', error);
            }
        }
        
        if (dataSource) {
            setFormData({
                firstName: dataSource.firstName || '',
                lastName: dataSource.lastName || '',
                userName: dataSource.userName || '',
                email: dataSource.email || '',
                age: dataSource.age || '',
                isParent: dataSource.isParent !== undefined ? dataSource.isParent : false,
                childPhone: dataSource.childPhone || '',
                isFather: dataSource.isFather !== undefined ? dataSource.isFather : null
            });
        }
        
        // Check if profile is incomplete
        const isIncomplete = !dataSource?.firstName || !dataSource?.lastName || !dataSource?.age;
        
        if (isIncomplete) {
            setIsNewProfile(true);
            setIsEditing(true); // Keep editing enabled for incomplete profiles
        } else {
            setIsNewProfile(false);
            setIsEditing(false);
        }
    };

    // Check if we have user data (from Redux or localStorage)
    const hasUserData = user || (() => {
        try {
            const localUserData = localStorage.getItem('userData');
            return localUserData ? JSON.parse(localUserData) : null;
        } catch {
            return null;
        }
    })();

    // Only show loading if we don't have any user data and we're authenticated
    if (isAuthenticated && !hasUserData && isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-lightBlue mx-auto mb-4"></div>
                    <p className="text-gray-600">در حال بارگذاری...</p>
                </div>
            </div>
        );
    }

    // If not authenticated, redirect or show error
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-gray-600">لطفاً ابتدا وارد شوید</p>
                </div>
            </div>
        );
    }

    return (
        <>
            <HelmetSeo
                title="پروفایل کاربری | نوبین"
                description="مدیریت پروفایل کاربری و اطلاعات شخصی"
                keywords="پروفایل, کاربری, اطلاعات شخصی, نوبین"
            />
            <div className="min-h-screen py-8">
                <div className="max-w-4xl mx-auto px-4">
                    {/* Header */}
                    <div className="mb-8 rounded-2xl bg-gradient-to-l from-blue-50 to-indigo-50 border border-blue-100 p-6 text-center relative overflow-hidden">
                        <div className="absolute inset-0 pointer-events-none opacity-50" style={{backgroundImage:'radial-gradient(circle at 20% 10%, rgba(59,130,246,.15) 0, transparent 40%), radial-gradient(circle at 80% 0%, rgba(99,102,241,.12) 0, transparent 35%)'}}></div>
                        <div className="relative">
                            <div className="mx-auto mb-4 w-24 h-24 rounded-full bg-gradient-to-br from-lightBlue to-darkBlue p-[3px] shadow-[0_6px_24px_rgba(3,105,161,0.25)]">
                                <div className="w-full h-full rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                                    <FaUser className="text-3xl text-white" />
                                </div>
                            </div>
                            <h1 className="text-3xl font-extrabold text-gray-900 mb-1 tracking-tight">پروفایل کاربری</h1>
                            <p className="text-gray-600">مدیریت اطلاعات شخصی و تنظیمات حساب کاربری</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Profile Card */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sticky top-6">
                                <div className="text-center">
                                    <div className="w-20 h-20 bg-gradient-to-br from-lightBlue to-darkBlue rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_4px_16px_rgba(3,105,161,0.25)]">
                                        <FaUser className="text-2xl text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                                        {formData.firstName} {formData.lastName}
                                    </h3>
                                    <p className="text-gray-600 mb-4">{formData.userName}@</p>
                                    <div className="flex items-center justify-center gap-2 mb-4">
                                        <span className="text-[11px] px-2 py-1 rounded-full bg-green-50 text-green-700 border border-green-200">حساب فعال</span>
                                    </div>
                                    
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3 text-sm">
                                            <FaEnvelope className="text-lightBlue w-4 h-4" />
                                            <span className="text-gray-700">{formData.email}</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-sm">
                                            <FaPhone className="text-lightBlue w-4 h-4" />
                                            <span className="text-gray-700">{user.phone}</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-sm">
                                            <FaCalendarAlt className="text-lightBlue w-4 h-4" />
                                            <span className="text-gray-700">{formData.age} سال</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Form */}
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <h2 className="text-2xl font-extrabold text-gray-900">
                                            {isNewProfile ? 'تکمیل پروفایل' : 'اطلاعات شخصی'}
                                        </h2>
                                        {isNewProfile && (
                                            <div className="mt-2 text-sm rounded-xl border border-amber-200 bg-amber-50/70 text-amber-800 px-3 py-2 inline-flex items-center gap-2">
                                                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                                                لطفاً اطلاعات خود را تکمیل کنید
                                            </div>
                                        )}
                                    </div>
                                    {!isNewProfile && !isEditing ? (
                                        <button
                                            onClick={() => setIsEditing(true)}
                                            className="flex items-center gap-2 bg-lightBlue text-white px-4 py-2 rounded-xl hover:bg-darkBlue transition-colors duration-300 shadow-sm"
                                        >
                                            <HiOutlinePencil className="text-sm" />
                                            ویرایش
                                        </button>
                                    ) : (
                                        <div className="flex gap-2">
                                            {!isNewProfile && (
                                                <button
                                                    onClick={handleCancel}
                                                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors duration-300 shadow-sm"
                                                >
                                                    انصراف
                                                </button>
                                            )}
                                            <button
                                                onClick={handleSave}
                                                disabled={isUpdating}
                                                className="px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-sm"
                                            >
                                                {isUpdating ? (
                                                    <>
                                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                                        در حال ذخیره...
                                                    </>
                                                ) : (
                                                    isNewProfile ? 'ایجاد پروفایل' : 'ذخیره'
                                                )}
                                            </button>
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-6">
                                    {/* Basic Information */}
                                    <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6">
                                        <h3 className="text-lg font-extrabold text-gray-800 mb-4 flex items-center gap-2">
                                            <FaUser className="text-lightBlue" />
                                            اطلاعات پایه
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {/* First Name */}
                                            <div className="space-y-2">
                                                <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700">
                                                    نام
                                                </label>
                                                <input
                                                    id="firstName"
                                                    type="text"
                                                    name="firstName"
                                                    value={formData.firstName}
                                                    onChange={handleInputChange}
                                                    disabled={!isEditing}
                                                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-lightBlue focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500 transition-all duration-200 shadow-sm"
                                                    placeholder="نام خود را وارد کنید"
                                                />
                                                <p className="text-[11px] text-gray-500">مثال: محمد</p>
                                            </div>

                                            {/* Last Name */}
                                            <div className="space-y-2">
                                                <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700">
                                                    نام خانوادگی
                                                </label>
                                                <input
                                                    id="lastName"
                                                    type="text"
                                                    name="lastName"
                                                    value={formData.lastName}
                                                    onChange={handleInputChange}
                                                    disabled={!isEditing}
                                                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-lightBlue focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500 transition-all duration-200 shadow-sm"
                                                    placeholder="نام خانوادگی خود را وارد کنید"
                                                />
                                                <p className="text-[11px] text-gray-500">مثال: رضایی</p>
                                            </div>

                                            {/* Username */}
                                            <div className="space-y-2">
                                                <label htmlFor="userName" className="block text-sm font-semibold text-gray-700">
                                                    نام کاربری
                                                </label>
                                                <input
                                                    id="userName"
                                                    type="text"
                                                    name="userName"
                                                    value={formData.userName}
                                                    onChange={handleInputChange}
                                                    disabled={!isEditing}
                                                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-lightBlue focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500 transition-all duration-200 shadow-sm"
                                                    placeholder="نام کاربری خود را وارد کنید"
                                                />
                                                <p className="text-[11px] text-gray-500">فقط حروف انگلیسی، اعداد و _</p>
                                            </div>

                                            {/* Email */}
                                            <div className="space-y-2">
                                                <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                                                    ایمیل
                                                </label>
                                                <input
                                                    id="email"
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    disabled={!isEditing}
                                                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-lightBlue focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500 transition-all duration-200 shadow-sm"
                                                    placeholder="ایمیل خود را وارد کنید"
                                                />
                                                <p className="text-[11px] text-gray-500">نمونه: name@example.com</p>
                                            </div>

                                            {/* Age */}
                                            <div className="space-y-2">
                                                <label htmlFor="age" className="block text-sm font-semibold text-gray-700">
                                                    سن
                                                </label>
                                                <input
                                                    id="age"
                                                    type="number"
                                                    name="age"
                                                    value={formData.age}
                                                    onChange={handleInputChange}
                                                    disabled={!isEditing}
                                                    min="1"
                                                    max="120"
                                                    placeholder="سن خود را وارد کنید"
                                                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-lightBlue focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500 transition-all duration-200 shadow-sm"
                                                />
                                                <p className="text-[11px] text-gray-500">بین 1 تا 120</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Parent Information */}
                                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6">
                                        <h3 className="text-lg font-extrabold text-gray-800 mb-4 flex items-center gap-2">
                                            <FaChild className="text-lightBlue" />
                                            اطلاعات والدین
                                        </h3>
                                        
                                        {/* Parent Checkbox */}
                                        <div className="mb-4">
                                            <label className="flex items-center gap-3 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    name="isParent"
                                                    checked={formData.isParent}
                                                    onChange={handleInputChange}
                                                    disabled={!isEditing}
                                                    className="w-5 h-5 text-lightBlue border-gray-300 rounded focus:ring-lightBlue"
                                                />
                                                <span className="text-sm font-semibold text-gray-700">
                                                    والد هستم
                                                </span>
                                            </label>
                                        </div>

                                        {/* Parent Type Selection - Only show if isParent is true */}
                                        {formData.isParent && (
                                            <div className="mb-4">
                                                <label className="block text-sm font-semibold text-gray-700 mb-3">
                                                    نوع والد
                                                </label>
                                                <div className="flex gap-4">
                                                    <label className="flex items-center gap-2 cursor-pointer">
                                                        <input
                                                            type="radio"
                                                            name="isFather"
                                                            value="true"
                                                            checked={formData.isFather === true}
                                                            onChange={(e) => setFormData(prev => ({ ...prev, isFather: true }))}
                                                            disabled={!isEditing}
                                                            className="w-4 h-4 text-lightBlue border-gray-300 focus:ring-lightBlue"
                                                        />
                                                        <FaUserTie className="text-lightBlue" />
                                                        <span className="text-sm font-medium text-gray-700">پدر</span>
                                                    </label>
                                                    <label className="flex items-center gap-2 cursor-pointer">
                                                        <input
                                                            type="radio"
                                                            name="isFather"
                                                            value="false"
                                                            checked={formData.isFather === false}
                                                            onChange={(e) => setFormData(prev => ({ ...prev, isFather: false }))}
                                                            disabled={!isEditing}
                                                            className="w-4 h-4 text-lightBlue border-gray-300 focus:ring-lightBlue"
                                                        />
                                                        <FaUserSecret className="text-pink-500" />
                                                        <span className="text-sm font-medium text-gray-700">مادر</span>
                                                    </label>
                                                </div>
                                            </div>
                                        )}

                                        {/* Child Phone - Only show if isParent is true */}
                                        {formData.isParent && (
                                            <div className="space-y-2">
                                                <label htmlFor="childPhone" className="block text-sm font-semibold text-gray-700">
                                                    شماره تلفن فرزند
                                                </label>
                                                <input
                                                    id="childPhone"
                                                    type="tel"
                                                    name="childPhone"
                                                    value={formData.childPhone}
                                                    onChange={handleInputChange}
                                                    disabled={!isEditing}
                                                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-lightBlue focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500 transition-all duration-200 shadow-sm"
                                                    placeholder="شماره تلفن فرزند را وارد کنید"
                                                />
                                                <p className="text-[11px] text-gray-500">اختیاری</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;
