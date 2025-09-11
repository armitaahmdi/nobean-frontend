import React, { useState, useEffect } from 'react';
import { FaPhone, FaMapMarkerAlt, FaEnvelope, FaClock, FaPaperPlane, FaUser, FaComment, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import HelmetSeo from '../../helper/helmet';
import { useBreadcrumb } from '../../contexts/BreadcrumbContext';

export default function Contact() {
    const { setPageTitle, clearPageTitle } = useBreadcrumb();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });
    const [formStatus, setFormStatus] = useState('idle');

    useEffect(() => {
        setPageTitle("تماس با ما");
        return () => clearPageTitle();
    }, [setPageTitle, clearPageTitle]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormStatus('submitting');
        
        setTimeout(() => {
            setFormStatus('success');
            setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
            setTimeout(() => setFormStatus('idle'), 3000);
        }, 1500);
    };

    const contactInfo = [
        {
            icon: FaPhone,
            title: "شماره تماس",
            details: ["۰۲۱۶۶۹۷۵۷۲۷", "داخلی ۲۱۲"],
            color: "from-blue-500 to-blue-600"
        },
        {
            icon: FaMapMarkerAlt,
            title: "آدرس",
            details: ["تهران، میدان انقلاب", "خیابان ۱۲ فروردین", "نبش کوچه مهر، پلاک ۱۸، واحد ۳"],
            color: "from-green-500 to-green-600"
        },
        {
            icon: FaEnvelope,
            title: "ایمیل",
            details: ["info@nobean.com", "support@nobean.com"],
            color: "from-purple-500 to-purple-600"
        },
        {
            icon: FaClock,
            title: "ساعات کاری",
            details: ["شنبه تا چهارشنبه: ۹:۰۰ - ۱۸:۰۰", "پنج‌شنبه: ۹:۰۰ - ۱۴:۰۰"],
            color: "from-orange-500 to-orange-600"
        }
    ];

  return (
    <>
            <HelmetSeo 
                title="تماس با ما - نوبین"
                description="با تیم نوبین در تماس باشید. شماره تماس، آدرس و فرم تماس برای ارتباط با ما."
                keywords="تماس با نوبین, آدرس نوبین, شماره تماس, فرم تماس"
            />
            
            <div className="min-h-screen">
                {/* Hero Section */}
                <div className="max-w-7xl mx-auto px-4 py-8">
                    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700">
                        <div className="absolute inset-0 opacity-10">
                            <div className="absolute inset-0" style={{
                                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                            }}></div>
                        </div>
                        
                        <div className="absolute top-6 left-8 w-12 h-12 bg-white/20 rounded-full blur-sm animate-pulse"></div>
                        <div className="absolute top-12 right-12 w-8 h-8 bg-purple-300/30 rounded-full blur-sm animate-bounce"></div>
                        <div className="absolute bottom-8 left-1/3 w-16 h-16 bg-blue-300/20 rounded-full blur-md animate-pulse"></div>
                        
                        <div className="relative px-8 py-16 text-center text-white">
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl mb-6 shadow-2xl border border-white/30">
                                <FaPaperPlane className="w-10 h-10 text-white" />
                            </div>
                            
                            <h1 className="text-4xl sm:text-5xl font-bold mb-4 drop-shadow-lg">
                                تماس با ما
                            </h1>
                            
                            <p className="text-xl sm:text-2xl font-medium mb-6 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
                                ما اینجا هستیم تا به شما کمک کنیم
                            </p>
                            
                            <div className="w-24 h-1 bg-gradient-to-r from-white to-blue-200 mx-auto rounded-full shadow-lg"></div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="max-w-7xl mx-auto px-4 py-16">
                    {/* Contact Information Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                        {contactInfo.map((info, index) => (
                            <div 
                                key={index}
                                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
                            >
                                <div className={`w-12 h-12 bg-gradient-to-r ${info.color} rounded-xl flex items-center justify-center mb-4`}>
                                    <info.icon className="w-6 h-6 text-white" />
                                </div>
                                
                                <h3 className="text-lg font-bold text-gray-900 mb-3">
                                    {info.title}
                                </h3>
                                
                                <div className="space-y-1">
                                    {info.details.map((detail, detailIndex) => (
                                        <p key={detailIndex} className="text-gray-600 text-sm leading-relaxed">
                                            {detail}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Contact Form and Map */}
                    <div className='flex justify-center items-center'>
                    {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16"> */}
                        {/* Contact Form */}
                        {/* <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                            <div className="text-center mb-8">
                                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                                    پیام خود را ارسال کنید
                                </h2>
                                <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            نام و نام خانوادگی
                                        </label>
                                        <div className="relative">
                                            <FaUser className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                                placeholder="نام خود را وارد کنید"
                                            />
                                        </div>
                                    </div> */}

                                    {/* <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            شماره تماس
                                        </label>
                                        <div className="relative">
                                            <FaPhone className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                                placeholder="شماره تماس خود را وارد کنید"
                                            />
                                        </div>
                                    </div>
                                </div> */}

                                {/* <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        ایمیل
                                    </label>
                                    <div className="relative">
                                        <FaEnvelope className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                            placeholder="ایمیل خود را وارد کنید"
                                        />
                                    </div>
                                </div> */}

                                {/* <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        موضوع
                                    </label>
                                    <input
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                        placeholder="موضوع پیام خود را وارد کنید"
                                    />
                                </div> */}

                                {/* <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        پیام
                                    </label>
                                    <div className="relative">
                                        <FaComment className="absolute right-3 top-3 text-gray-400 w-4 h-4" />
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleInputChange}
                                            required
                                            rows={5}
                                            className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                                            placeholder="پیام خود را بنویسید..."
                                        />
                                    </div>
                                </div> */}

                                {/* <button
                                    type="submit"
                                    disabled={formStatus === 'submitting'}
                                    className={`w-full py-4 px-6 rounded-xl font-bold text-white transition-all duration-200 ${
                                        formStatus === 'submitting' 
                                            ? 'bg-gray-400 cursor-not-allowed' 
                                            : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:-translate-y-1 hover:shadow-lg'
                                    }`}
                                >
                                    {formStatus === 'submitting' ? (
                                        <span className="flex items-center justify-center">
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                            در حال ارسال...
                                        </span>
                                    ) : (
                                        <span className="flex items-center justify-center">
                                            <FaPaperPlane className="w-5 h-5 ml-2" />
                                            ارسال پیام
                                        </span>
                                    )}
                                </button> */}

                                {/* Form Status Messages */}
                                {/* {formStatus === 'success' && (
                                    <div className="flex items-center justify-center p-4 bg-green-50 border border-green-200 rounded-xl">
                                        <FaCheckCircle className="w-5 h-5 text-green-600 ml-2" />
                                        <span className="text-green-700 font-medium">پیام شما با موفقیت ارسال شد!</span>
                                    </div>
                                )}

                                {formStatus === 'error' && (
                                    <div className="flex items-center justify-center p-4 bg-red-50 border border-red-200 rounded-xl">
                                        <FaExclamationCircle className="w-5 h-5 text-red-600 ml-2" />
                                        <span className="text-red-700 font-medium">خطا در ارسال پیام. لطفاً دوباره تلاش کنید.</span>
                                    </div>
                                )}
                            </form>
                        </div> */}

                        {/* Map Section */}
                        <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                            <div className="text-center mb-8">
                                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                                    موقعیت ما
                                </h2>
                                <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
                            </div>

                            {/* Google Maps Embed */}
                            <div className="relative h-96 bg-gray-100 rounded-2xl overflow-hidden">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.1234567890123!2d51.42345678901234!3d35.69678901234567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzXCsDQxJzQ4LjQiTiA1McKwMjUnMjQuNCJF!5e0!3m2!1sen!2sir!4v1234567890123!5m2!1sen!2sir"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="نوبین - آدرس دفتر مرکزی"
                                ></iframe>
                                
                                {/* Overlay with clickable link */}
                                <div className="absolute inset-0 bg-black/0 hover:bg-black/5 transition-all duration-300 flex items-center justify-center">
                                    <a
                                        href="https://maps.app.goo.gl/aV5uWgC3SqkqNJ2P9?g_st=it"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="opacity-0 hover:opacity-100 transition-opacity duration-300 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transform hover:scale-105 shadow-lg"
                                    >
                                        <span className="flex items-center">
                                            <FaMapMarkerAlt className="w-5 h-5 ml-2" />
                                            مشاهده در نقشه گوگل
                                        </span>
                                    </a>
                                </div>
                                
                                {/* Decorative Elements */}
                                <div className="absolute top-4 right-4 w-8 h-8 bg-blue-500 rounded-full animate-pulse"></div>
                                <div className="absolute bottom-4 left-4 w-6 h-6 bg-purple-500 rounded-full animate-bounce"></div>
                            </div>

                            {/* Address Details */}
                            <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                                <h4 className="font-bold text-gray-900 mb-2">آدرس کامل:</h4>
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    تهران، میدان انقلاب، خیابان ۱۲ فروردین، نبش کوچه مهر، پلاک ۱۸، واحد ۳
                                </p>
                                
                                {/* Direct Google Maps Link */}
                                <a
                                    href="https://maps.app.goo.gl/aV5uWgC3SqkqNJ2P9?g_st=it"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:-translate-y-1 hover:shadow-lg"
                                >
                                    <FaMapMarkerAlt className="w-5 h-5 ml-2" />
                                    مشاهده در نقشه گوگل
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* FAQ Section */}
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 sm:p-12 text-white mt-16 shadow-xl">
                        <div className="text-center">
                            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                                سوالات متداول
                            </h2>
                            <p className="text-xl leading-relaxed max-w-4xl mx-auto">
                                اگر سوالی دارید، می‌توانید از طریق فرم تماس یا شماره‌های موجود با ما در ارتباط باشید. 
                                تیم پشتیبانی ما آماده پاسخگویی به شماست.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
