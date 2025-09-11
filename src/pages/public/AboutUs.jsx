import React, { useEffect } from 'react';
import { FaBrain, FaChartLine, FaUserGraduate, FaUsers, FaShieldAlt, FaLightbulb, FaHeart, FaRocket, FaPuzzlePiece } from 'react-icons/fa';
import HelmetSeo from '../../helper/helmet';
import translate from '../../locale/translate';
import { useBreadcrumb } from '../../contexts/BreadcrumbContext';

export default function AboutUs() {
    const { setPageTitle, clearPageTitle } = useBreadcrumb();

    // Set breadcrumb title
    useEffect(() => {
        setPageTitle("درباره ما");
        
        return () => {
            clearPageTitle();
        };
    }, [setPageTitle, clearPageTitle]);

    const features = [
        {
            icon: FaBrain,
            title: "تست‌های معتبر روان‌شناسی",
            description: "اجرای ارزیابی‌های استاندارد برای شناخت دقیق نقاط قوت و نیازهای رشدی."
        },
        {
            icon: FaChartLine,
            title: "داشبورد تحلیلی شفاف",
            description: "نمایش نتایج با نمودارها و بینش‌های عملیاتی برای تصمیم‌گیری بهتر."
        },
        {
            icon: FaUserGraduate,
            title: "مسیر رشد شخصی‌سازی شده",
            description: "دوره‌ها، تمرین‌ها و محتوای تعاملی متناسب با پروفایل هر دانش‌آموز."
        },
        {
            icon: FaUsers,
            title: "مشاوره تخصصی",
            description: "همراهی متخصصان برای تفسیر نتایج و طراحی مداخله مؤثر."
        }
    ];

    const advantages = [
        {
            icon: FaLightbulb,
            title: "علم‌محور و معتبر",
            description: "اتکا به ابزارها و روش‌های روان‌سنجی استاندارد."
        },
        {
            icon: FaRocket,
            title: "شخصی‌سازی با تکنولوژی",
            description: "استفاده از الگوریتم‌های هوشمند برای پیشنهاد مسیر رشد منحصربه‌فرد."
        },
        {
            icon: FaHeart,
            title: "تجربه کاربری ساده و انسانی",
            description: "طراحی برای والدینِ پرمشغله و مربیانِ دغدغه‌مند."
        },
        {
            icon: FaShieldAlt,
            title: "حفظ حریم خصوصی",
            description: "نگهداری امن داده‌ها و احترام به محرمانگی اطلاعات خانواده‌ها."
        }
    ];

    return (
        <>
            <HelmetSeo 
                title="درباره ما - نوبین"
                description="نوبین یک استارتاپ نوآور در حوزه روان‌شناسی و آموزش است که با هدف تحول در نحوه یادگیری، شناخت و پرورش دانش‌آموزان شکل گرفته."
                keywords="نوبین, روان‌شناسی, آموزش, استارتاپ, تست روان‌شناسی, مشاوره تخصصی"
            />
            
            <div className="min-h-screen">
                {/* Hero Banner Section */}
                <div className="max-w-7xl mx-auto px-4 py-8">
                    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700">
                    {/* Geometric Background Pattern */}
                    <div className="absolute inset-0 opacity-15">
                        <div className="absolute inset-0" style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M40 40c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm0 0c0 11.046 8.954 20 20 20s20-8.954 20-20-8.954-20-20-20-20 8.954-20 20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                        }}></div>
                    </div>
                    
                    {/* Animated Floating Shapes */}
                    <div className="absolute top-4 left-8 w-16 h-16 bg-gradient-to-r from-white/20 to-blue-300/30 rounded-full blur-sm animate-pulse"></div>
                    <div className="absolute top-8 right-12 w-12 h-12 bg-gradient-to-r from-purple-300/30 to-pink-300/30 rounded-full blur-sm animate-bounce"></div>
                    <div className="absolute bottom-6 left-1/3 w-20 h-20 bg-gradient-to-r from-indigo-300/20 to-blue-300/20 rounded-full blur-md animate-pulse"></div>
                    <div className="absolute bottom-4 right-1/4 w-14 h-14 bg-gradient-to-r from-white/15 to-purple-300/25 rounded-full blur-sm animate-bounce"></div>
                    
                    {/* Decorative Lines */}
                    <div className="absolute top-1/2 left-0 w-32 h-0.5 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -rotate-12"></div>
                    <div className="absolute top-1/3 right-0 w-24 h-0.5 bg-gradient-to-r from-transparent via-white/20 to-transparent transform rotate-12"></div>
                    
                    <div className="relative px-4 py-12 sm:py-16">
                        <div className="flex flex-col lg:flex-row items-center justify-between text-white">
                            {/* Left Content */}
                            <div className="flex-1 text-center lg:text-right lg:mr-4 mb-8 lg:mb-0">
                                {/* Logo/Brand */}
                                <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl mb-6 shadow-2xl border border-white/30 relative">
                                    <FaBrain className="w-10 h-10 text-white" />
                                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-ping"></div>
                                </div>
                                
                                {/* Main Title */}
                                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 drop-shadow-lg">
                                    نوبین
                                </h1>
                                
                                {/* Subtitle */}
                                <p className="text-xl sm:text-2xl font-medium mb-4 max-w-2xl mx-auto lg:mx-0 leading-relaxed drop-shadow-md">
                                    بینشی نو در رفتار و مهارت
                                </p>
                                
                                {/* Decorative Line */}
                                <div className="w-24 h-1 bg-gradient-to-r from-white to-blue-200 mx-auto lg:mx-0 rounded-full shadow-lg"></div>
                            </div>
                            
                            {/* Right Visual Elements */}
                            <div className="flex-1 flex justify-center lg:justify-start">
                                <div className="relative">
                                    {/* Main Circle */}
                                    <div className="w-48 h-48 bg-gradient-to-br from-white/10 to-transparent rounded-full border border-white/20 backdrop-blur-sm flex items-center justify-center relative overflow-hidden">
                                        {/* Inner rotating elements */}
                                        <div className="absolute inset-4 border border-white/10 rounded-full animate-spin" style={{animationDuration: '20s'}}></div>
                                        <div className="absolute inset-8 border border-white/5 rounded-full animate-spin" style={{animationDuration: '15s', animationDirection: 'reverse'}}></div>
                                        
                                        {/* Center content */}
                                        <div className="text-center z-10">
                                            <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center mb-3 mx-auto shadow-lg relative">
                                                <FaLightbulb className="w-8 h-8 text-white" />
                                                <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-pulse"></div>
                                            </div>
                                            <p className="text-sm font-medium text-white/90">شناخت</p>
                                        </div>
                                        
                                        {/* Floating dots around circle */}
                                        <div className="absolute top-4 left-1/2 w-2 h-2 bg-white/60 rounded-full transform -translate-x-1/2 animate-pulse"></div>
                                        <div className="absolute bottom-4 left-1/2 w-2 h-2 bg-white/60 rounded-full transform -translate-x-1/2 animate-pulse" style={{animationDelay: '0.5s'}}></div>
                                        <div className="absolute left-4 top-1/2 w-2 h-2 bg-white/60 rounded-full transform -translate-y-1/2 animate-pulse" style={{animationDelay: '1s'}}></div>
                                        <div className="absolute right-4 top-1/2 w-2 h-2 bg-white/60 rounded-full transform -translate-y-1/2 animate-pulse" style={{animationDelay: '1.5s'}}></div>
                                    </div>
                                    
                                    {/* Side decorative elements */}
                                    <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-yellow-400/60 to-orange-400/60 rounded-full blur-sm animate-bounce"></div>
                                    <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-r from-green-400/60 to-blue-400/60 rounded-full blur-sm animate-bounce" style={{animationDelay: '0.7s'}}></div>
                                    
                                    {/* Additional floating elements */}
                                    <div className="absolute top-8 -left-8 w-4 h-4 bg-gradient-to-r from-pink-400/50 to-purple-400/50 rounded-full animate-pulse" style={{animationDelay: '1.2s'}}></div>
                                    <div className="absolute bottom-8 -right-8 w-5 h-5 bg-gradient-to-r from-cyan-400/50 to-blue-400/50 rounded-full animate-pulse" style={{animationDelay: '0.8s'}}></div>
                                    
                                    {/* Connecting lines */}
                                    <div className="absolute top-1/4 -left-6 w-12 h-0.5 bg-gradient-to-r from-transparent via-white/20 to-transparent transform rotate-45"></div>
                                    <div className="absolute bottom-1/4 -right-6 w-10 h-0.5 bg-gradient-to-r from-transparent via-white/15 to-transparent transform -rotate-45"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Bottom Wave */}
                    <div className="absolute bottom-0 left-0 right-0">
                        <svg className="w-full h-12 text-white" viewBox="0 0 1200 120" preserveAspectRatio="none">
                            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" fill="currentColor"></path>
                        </svg>
                    </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="max-w-7xl mx-auto px-4 py-16">
                    {/* Introduction */}
                    <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-12 mb-16 border border-gray-100">
                        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
                            <p className="text-xl mb-6 text-center font-medium text-gray-800">
                                نوبین یک استارتاپ نوآور در حوزه روان‌شناسی و آموزش است که با هدف تحول در نحوه یادگیری، شناخت و پرورش دانش‌آموزان شکل گرفته.
                            </p>
                            <p className="mb-6">
                                ما با تکیه بر روان‌شناسی علمی، فناوری هوشمند و طراحی تجربه کاربری دقیق، پلتفرمی ساخته‌ایم که والدین و مربیان را به تصویری روشن و قابل اقدام از ویژگی‌های رفتاری و یادگیری کودک می‌رساند.
                            </p>
                            <p className="mb-6">
                                در نوبین، فقط به سنجش اکتفا نمی‌کنیم. پس از اجرای تست‌های روان‌شناسی معتبر، نتایج در قالب تحلیل‌های بصری و قابل فهم ارائه می‌شود و بر اساس آن، برنامه‌های تربیتی و آموزشی شخصی‌سازی شده، محتوای تعاملی و مشاوره تخصصی پیشنهاد می‌گردد تا هر کودک مسیر رشد مخصوص به خود را دنبال کند.
                            </p>
                        </div>
                    </div>

                    {/* What We Offer */}
                    <div className="mb-16">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                                نوبین چه ارائه می‌دهد؟
                            </h2>
                            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {features.map((feature, index) => (
                                <div 
                                    key={index}
                                    className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
                                >
                                    <div className="flex items-start space-x-4 space-x-reverse">
                                        <div className="flex-shrink-0">
                                            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                                                <feature.icon className="w-6 h-6 text-white" />
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900 mb-3">
                                                {feature.title}
                                            </h3>
                                            <p className="text-gray-600 leading-relaxed">
                                                {feature.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Why Nobin */}
                    <div className="mb-16">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                                چرا نوبین؟
                            </h2>
                            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {advantages.map((advantage, index) => (
                                <div 
                                    key={index}
                                    className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-blue-100"
                                >
                                    <div className="flex items-start space-x-4 space-x-reverse">
                                        <div className="flex-shrink-0">
                                            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                                                <advantage.icon className="w-6 h-6 text-white" />
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900 mb-3">
                                                {advantage.title}
                                            </h3>
                                            <p className="text-gray-600 leading-relaxed">
                                                {advantage.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Mission */}
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 sm:p-12 text-white mb-16 shadow-xl">
                        <div className="text-center">
                            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                                مأموریت ما
                            </h2>
                            <p className="text-xl leading-relaxed max-w-4xl mx-auto">
                                کمک به والدین، مدارس و متخصصان تا با تصویر دقیق، راهکار عملی و پیگیری مداوم، زمینه شکوفایی توانمندی‌های نسل آینده را فراهم کنند.
                            </p>
                        </div>
                    </div>

                    {/* Call to Action */}
                    <div className="text-center bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-gray-100">
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                            همراه شوید
                        </h2>
                        <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
                            اگر والدین یک دانش‌آموز هستید، مدرسه‌ای را مدیریت می‌کنید یا روان‌شناس و مربی هستید، نوبین کنار شماست تا شناخت را به اقدام مؤثر تبدیل کنید.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
