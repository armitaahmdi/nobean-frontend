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
    
    const [isEditing, setIsEditing] = useState(false);
    const [isNewProfile, setIsNewProfile] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        userName: '',
        email: '',
        age: '',
        isParent: false,
        childPhone: '',
        isFather: null // null = not selected, true = father, false = mother
    });

    // Set breadcrumb title
    useEffect(() => {
        setPageTitle("پروفایل کاربری");
        
        return () => {
            clearPageTitle();
        };
    }, [setPageTitle, clearPageTitle]);

    // Fetch profile data on component mount
    useEffect(() => {
        if (isAuthenticated) {
            dispatch(getProfile()).catch((error) => {
                console.error('Profile fetch failed:', error);
            });
        }
    }, [isAuthenticated, dispatch, token, user]);

    // Initialize form data when profile data is available
    useEffect(() => {
        // Use profile data if available, otherwise use user data from auth
        const dataSource = profile || user;
        
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
            const isIncomplete = !newFormData.firstName || !newFormData.lastName || !newFormData.email || !newFormData.age;
            
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
        const requiredFields = ['firstName', 'lastName', 'email', 'age'];
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
                // Create new profile
                await dispatch(createProfile(cleanedData)).unwrap();
                toast.success("پروفایل با موفقیت ایجاد شد", {
                    className: "text-lg font-semibold",
                });
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
        const dataSource = profile || user;
        
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
        const isIncomplete = !dataSource?.firstName || !dataSource?.lastName || !dataSource?.email || !dataSource?.age;
        
        if (isIncomplete) {
            setIsNewProfile(true);
            setIsEditing(true); // Keep editing enabled for incomplete profiles
        } else {
            setIsNewProfile(false);
            setIsEditing(false);
        }
    };

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-lightBlue mx-auto mb-4"></div>
                    <p className="text-gray-600">در حال بارگذاری...</p>
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
                    <div className="text-center mb-8">
                        <div className="w-24 h-24 bg-gradient-to-br from-lightBlue to-darkBlue rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                            <FaUser className="text-3xl text-white" />
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">پروفایل کاربری</h1>
                        <p className="text-gray-600">مدیریت اطلاعات شخصی و تنظیمات حساب کاربری</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Profile Card */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sticky top-6">
                                <div className="text-center">
                                    <div className="w-20 h-20 bg-gradient-to-br from-lightBlue to-darkBlue rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                                        <FaUser className="text-2xl text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                                        {formData.firstName} {formData.lastName}
                                    </h3>
                                    <p className="text-gray-600 mb-4">@{formData.userName}</p>
                                    
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
                                        <h2 className="text-2xl font-bold text-gray-900">
                                            {isNewProfile ? 'تکمیل پروفایل' : 'اطلاعات شخصی'}
                                        </h2>
                                        {isNewProfile && (
                                            <p className="text-orange-600 text-sm mt-1">
                                                لطفاً اطلاعات خود را تکمیل کنید
                                            </p>
                                        )}
                                    </div>
                                    {!isNewProfile && !isEditing ? (
                                        <button
                                            onClick={() => setIsEditing(true)}
                                            className="flex items-center gap-2 bg-lightBlue text-white px-4 py-2 rounded-xl hover:bg-darkBlue transition-colors duration-300"
                                        >
                                            <HiOutlinePencil className="text-sm" />
                                            ویرایش
                                        </button>
                                    ) : (
                                        <div className="flex gap-2">
                                            {!isNewProfile && (
                                                <button
                                                    onClick={handleCancel}
                                                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors duration-300"
                                                >
                                                    انصراف
                                                </button>
                                            )}
                                            <button
                                                onClick={handleSave}
                                                disabled={isUpdating}
                                                className="px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
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
                                        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
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
                                                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-lightBlue focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500 transition-all duration-200"
                                                    placeholder="نام خود را وارد کنید"
                                                />
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
                                                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-lightBlue focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500 transition-all duration-200"
                                                    placeholder="نام خانوادگی خود را وارد کنید"
                                                />
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
                                                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-lightBlue focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500 transition-all duration-200"
                                                    placeholder="نام کاربری خود را وارد کنید"
                                                />
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
                                                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-lightBlue focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500 transition-all duration-200"
                                                    placeholder="ایمیل خود را وارد کنید"
                                                />
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
                                                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-lightBlue focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500 transition-all duration-200"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Parent Information */}
                                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6">
                                        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
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
                                                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-lightBlue focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500 transition-all duration-200"
                                                    placeholder="شماره تلفن فرزند را وارد کنید"
                                                />
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
