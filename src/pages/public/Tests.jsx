// import TestsList from "../../features/user/tests/pages/TestsList";
// import translate from "../../locale/translate"
// import { useDispatch, useSelector } from "react-redux";
// import { fetchTests } from "../../features/user/tests/testsSlice";
// import { testsFilterConfig } from "../../components/filter/filterConfig";
// import FilterablePaginatedList from "../../components/filter/FilterablePaginatedList";
// import TestsHeroSection from "../../components/tests/TestsHeroSection";
// import PopularTestsSection from "../../components/tests/PopularTestsSection";
// import EducationalContentSection from "../../components/tests/EducationalContentSection";
// import QuickTestFinder from "../../components/tests/QuickTestFinder";
// import TestimonialsSection from "../../components/tests/TestimonialsSection";
// import { useRef, useEffect } from "react";
// import { useSearchParams } from "react-router-dom";

// export default function Tests() {
//   const dispatch = useDispatch();
//   const { tests, loading, error } = useSelector((store) => store.tests)
//   const allTestsRef = useRef(null);
//   const quickTestFinderRef = useRef(null);
//   const [searchParams] = useSearchParams();

//   // Check if user is coming from pagination (has page parameter)
//   const isFromPagination = searchParams.has('page');

//   const handleViewAllTests = () => {
//     allTestsRef.current?.scrollIntoView({ behavior: 'smooth' });
//   };

//   const handleStartTest = () => {
//     quickTestFinderRef.current?.scrollIntoView({ behavior: 'smooth' });
//   };

//   // Scroll to top when first visiting the page (not from pagination)
//   useEffect(() => {
//     if (!isFromPagination) {
//       window.scrollTo({ top: 0, behavior: 'smooth' });
//     }
//   }, [isFromPagination]);

//   return (
//     <>
//       {/* Hero Section */}
//       <TestsHeroSection tests={tests} />
      
//       {/* Popular Tests Section */}
//       <PopularTestsSection onViewAllTests={handleViewAllTests} />
      
//       {/* Educational Content Section */}
//       <EducationalContentSection />
      
//       {/* Quick Test Finder Section */}
//       <div ref={quickTestFinderRef} className="w-full bg-gray-50 py-16">
//         <div className="max-w-7xl mx-auto px-4">
//           <QuickTestFinder />
//         </div>
//       </div>
      
//       {/* All Tests Section */}
//       <div ref={allTestsRef} className="w-full">
//         <div className="max-w-7xl mx-auto px-4 py-8">
//           <div className="text-center mb-8">
//             <h2 className="text-3xl font-bold text-gray-900 mb-3">
//               همه آزمون‌ها
//             </h2>
//             <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//               مجموعه کامل آزمون‌های تشخیص اختلالات یادگیری
//             </p>
//           </div>
//         </div>
        
//         {/* Main Content */}
//         <FilterablePaginatedList
//           fetchAction={fetchTests}
//           items={tests}
//           loading={loading}
//           error={error}
//           config={testsFilterConfig}
//           ListComponent={({ data, selectedFilters }) => (
//             <TestsList
//               tests={data}
//               selectedSort={selectedFilters.sortOptions}
//               selectedCategory={selectedFilters.categories}
//               selectedBadge={selectedFilters.target_audience}
//             />
//           )}
//           seo={translate.tests}
//           filtersProps={{ dispatch }}
//           scrollToTop={false}
//           scrollToElement={allTestsRef.current}
//         />
//       </div>
      
//       {/* Testimonials Section */}
//       <TestimonialsSection onStartTest={handleStartTest} />
//     </>
//   )
// }

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaCheckCircle, FaClock, FaQuestionCircle, FaChartLine, FaUsers, FaStar, FaBook, FaLightbulb } from "react-icons/fa";
import { BiTargetLock } from "react-icons/bi";
import CommentSection from "../../components/shared/CommentSection";

const LASSI_TEST_ID = 17; // شناسه آزمون LASSI

export default function Tests() {
  const navigate = useNavigate();
  const { isAuthenticated, token } = useSelector((state) => state.auth);

    const handleStartTest = () => {
        // اگر کاربر لاگین نکرده، به صفحه لاگین هدایت کن
        if (!isAuthenticated || !token) {
            navigate("/login");
            return;
        }
        navigate(`/exam/${LASSI_TEST_ID}`);
    };

    const features = [
        {
            icon: <FaQuestionCircle className="text-3xl text-lightBlue" />,
            title: "80 سوال",
            description: "پرسشنامه جامع با 80 سوال استاندارد"
        },
        {
            icon: <FaChartLine className="text-3xl text-secondaryBlue" />,
            title: "10 مولفه",
            description: "ارزیابی در 10 بعد مختلف راهبردهای یادگیری"
        },
        {
            icon: <BiTargetLock className="text-3xl text-lightYellow" />,
            title: "مقیاس لیکرت",
            description: "پاسخ‌دهی با مقیاس 5 درجه‌ای"
        },
        {
            icon: <FaClock className="text-3xl text-green-500" />,
            title: "25-30 دقیقه",
            description: "زمان تقریبی پاسخگویی به آزمون"
        }
    ];

    const components = [
        "نگرش و اعتقادات",
        "انگیزش",
        "مدیریت زمان",
        "اضطراب",
        "تمرکز",
        "پردازش اطلاعات",
        "انتخاب ایده اصلی",
        "کمک‌های مطالعاتی",
        "خودآزمایی",
        "آزمون‌گیری"
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
            {/* Hero Section */}
            <div className="relative rounded-xl bg-gradient-to-r from-lightBlue to-secondaryBlue text-white py-16 md:py-24 overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
                
                <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
                    <div className="text-center max-w-4xl mx-auto">
                        <div className="inline-block mb-4 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                            آزمون استاندارد روانشناسی
                        </div>
                        <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                            پرسشنامه راهبردهای مطالعه و یادگیری
                            <span className="block text-2xl md:text-3xl mt-2 text-blue-100">
                                (LASSI)
                            </span>
                        </h1>
                        <p className="text-lg md:text-xl text-blue-50 mb-8 leading-relaxed">
                            ابزاری استاندارد برای ارزیابی و بهبود راهبردهای یادگیری و مهارت‌های مطالعه
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <button
                                onClick={handleStartTest}
                                className="px-8 py-4 bg-white text-lightBlue font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
                            >
                                <FaCheckCircle />
                                {isAuthenticated ? 'شروع آزمون' : 'ورود و شروع آزمون'}
                            </button>
                            <button
                                onClick={() => document.getElementById('details').scrollIntoView({ behavior: 'smooth' })}
                                className="px-8 py-4 bg-white/20 backdrop-blur-sm text-white font-medium rounded-xl hover:bg-white/30 transition-all duration-300 flex items-center gap-2"
                            >
                                <FaBook />
                                اطلاعات بیشتر
                            </button>
                        </div>
                        
                        {!isAuthenticated && (
                            <div className="mt-4 text-center">
                                <p className="text-blue-100 text-sm">
                                    برای شرکت در آزمون ابتدا وارد شوید
                                </p>
                            </div>
                        )}

                        {/* Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                                <div className="text-3xl font-bold mb-1">80</div>
                                <div className="text-sm text-blue-100">سوال</div>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                                <div className="text-3xl font-bold mb-1">10</div>
                                <div className="text-sm text-blue-100">مولفه</div>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                                <div className="text-3xl font-bold mb-1">30</div>
                                <div className="text-sm text-blue-100">دقیقه</div>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                                <div className="flex items-center justify-center gap-1">
                                    <FaStar className="text-lightYellow text-xl" />
                                    <div className="text-3xl font-bold">4.8</div>
                                </div>
                                <div className="text-sm text-blue-100">رضایت کاربران</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-16">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:border-lightBlue group"
                        >
                            <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
                                {feature.icon}
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">
                                {feature.title}
                            </h3>
                            <p className="text-sm text-gray-600 leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Introduction Section */}
            <div id="details" className="bg-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                معرفی پرسشنامه
                            </h2>
                            <div className="w-24 h-1 bg-gradient-to-r from-lightBlue to-secondaryBlue mx-auto rounded-full"></div>
                        </div>

                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-lg p-8 md:p-12 space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-lightBlue to-secondaryBlue rounded-full flex items-center justify-center">
                                    <FaBook className="text-white text-xl" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                                        پرسشنامه استاندارد راهبردهای مطالعه و یادگیری (LASSI)
                                    </h3>
                                    <p className="text-gray-700 leading-relaxed text-justify">
                                        پرسشنامه راهبردهای مطالعه و یادگیری، دارای <strong>80 گویه</strong> و <strong>10 مؤلفه</strong> می‌باشد که با یک مقیاس لیکرت پنج درجه‌ای (اصلاً در مورد من صدق نمی‌کند تا کاملاً در مورد من صدق می‌کند) و هر ماده دارای ارزشی بین 1 تا 5 است.
                                    </p>
                                </div>
                            </div>

                            <div className="bg-white rounded-xl p-6 shadow-sm">
                                <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                    <FaQuestionCircle className="text-lightBlue" />
                                    نمونه سؤال:
                                </h4>
                                <p className="text-gray-700 italic pr-4 border-r-4 border-lightBlue leading-relaxed">
                                    "برای کمک به یادسپاری اصول جدیدی که در کلاس می‌آموزم، تمرین می‌کنم که آنها را به کار بگیرم."
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Concept Definition Section */}
            <div className="bg-gradient-to-b from-gray-50 to-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 border border-gray-100">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center">
                                    <FaLightbulb className="text-white text-xl" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900">
                                    تعریف مفهومی متغیر پرسشنامه
                                </h3>
                            </div>
                            
                            <div className="space-y-6">
                                <div>
                                    <h4 className="text-lg font-bold text-lightBlue mb-3">
                                        راهبردهای یادگیری و مطالعه
                                    </h4>
                                    <p className="text-gray-700 leading-relaxed text-justify">
                                        یکی از دلایل افت و شکست تحصیلی می‌تواند به ضعف مهارت‌های مطالعه و یادگیری دانشجویان مربوط باشد. در چند سال اخیر، پردازش اطلاعات به عنوان یکی از نظریه‌های یادگیری مورد توجه زیادی قرار گرفته است.
                                    </p>
                                </div>

                                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
                                    <p className="text-gray-700 leading-relaxed text-justify">
                                        بر اساس این نظریه راهبردهایی وجود دارد که با بهره‌گیری از آن‌ها می‌توان یادگیری را تسهیل نمود. <strong>راهبردهای یادگیری شامل تفکر، رفتار، عقاید یا احساساتی است که کسب، درک، انتقال بعدی دانش و مهارت‌های جدید را تسهیل می‌کند.</strong>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Components Grid */}
            <div className="bg-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            10 مؤلفه پرسشنامه LASSI
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            این آزمون راهبردهای یادگیری شما را در 10 بعد مختلف ارزیابی می‌کند
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
                        {components.map((component, index) => (
                            <div
                                key={index}
                                className="bg-gradient-to-br from-white to-blue-50 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-5 border border-gray-100 hover:border-lightBlue group"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-lightBlue to-secondaryBlue text-white rounded-full flex items-center justify-center font-bold text-sm group-hover:scale-110 transition-transform">
                                        {index + 1}
                                    </div>
                                    <div className="text-sm font-bold text-gray-900 leading-tight">
                                        {component}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="rounded-xl bg-gradient-to-r from-lightBlue to-secondaryBlue py-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 text-center">
                    <div className="flex justify-center mb-6">
                        <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                            <FaUsers className="text-white text-4xl" />
                        </div>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        آماده برای شروع هستید؟
                    </h2>
                    <p className="text-lg text-blue-50 mb-8 max-w-2xl mx-auto">
                        با شرکت در این آزمون، راهبردهای یادگیری خود را بشناسید و مسیر پیشرفت تحصیلی خود را هموار کنید
                    </p>
                    <button
                        onClick={handleStartTest}
                        className="px-10 py-4 bg-white text-lightBlue font-bold rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center gap-3 mx-auto text-lg"
                    >
                        <FaCheckCircle className="text-xl" />
                        {isAuthenticated ? 'شروع آزمون LASSI' : 'ورود و شروع آزمون LASSI'}
                    </button>
                    <div className="mt-6 text-blue-100 text-sm">
                        <FaClock className="inline ml-2" />
                        تنها 25-30 دقیقه از وقت شما
                    </div>
                </div>
            </div>

            {/* Trust Section */}
            <div className="bg-gray-50 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                    <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 text-gray-600">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-lightBlue mb-1">+5000</div>
                            <div className="text-sm">شرکت‌کننده</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-lightBlue mb-1">4.8/5</div>
                            <div className="text-sm">امتیاز کاربران</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-lightBlue mb-1">استاندارد</div>
                            <div className="text-sm">آزمون معتبر</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-lightBlue mb-1">رایگان</div>
                            <div className="text-sm">دسترسی آزاد</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Comments Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-16">
                <CommentSection entityType="test" entityId={LASSI_TEST_ID} />
            </div>
        </div>
    );
}