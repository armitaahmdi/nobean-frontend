import { useSelector } from 'react-redux';
import familyIcon from '../../../../assets/images/storeIcons/family.png';
import teacherIcon from '../../../../assets/images/storeIcons/teacher.png';
import studentIcon from '../../../../assets/images/storeIcons/students.png';

export default function ShoppingByCategory({ onCategorySelect }) {
    const { products } = useSelector((store) => store.products);

    const categories = [
        {
            id: 'family',
            title: 'خانواده',
            description: 'محصولات مناسب برای خانواده',
            icon: familyIcon,
            color: 'from-blue-500 to-blue-600',
            bgColor: 'from-blue-50 to-blue-100',
            hoverColor: 'from-blue-600 to-blue-700'
        },
        {
            id: 'teacher',
            title: 'معلم',
            description: 'ابزارهای آموزشی برای معلمان',
            icon: teacherIcon,
            color: 'from-green-500 to-green-600',
            bgColor: 'from-green-50 to-green-100',
            hoverColor: 'from-green-600 to-green-700'
        },
        {
            id: 'student',
            title: 'دانش آموز',
            description: 'محصولات یادگیری برای دانش‌آموزان',
            icon: studentIcon,
            color: 'from-purple-500 to-purple-600',
            bgColor: 'from-purple-50 to-purple-100',
            hoverColor: 'from-purple-600 to-purple-700'
        }
    ];

    // Calculate dynamic counts for each category
    const getCategoryCount = (categoryTitle) => {
        return products.filter(product => product.target_audience === categoryTitle).length;
    };

    return (
        <div className="mb-12">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-3">خرید بر اساس دسته‌بندی</h2>
                <p className="text-gray-600 text-lg">محصولات مناسب برای هر گروه</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {categories.map((category) => (
                    <button
                        key={category.id}
                        onClick={() => onCategorySelect(category.title)}
                        className="group relative overflow-hidden rounded-3xl p-8 bg-white hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 hover:border-gray-200 w-full text-right"
                    >
                        {/* Background gradient */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${category.bgColor} opacity-30 group-hover:opacity-50 transition-opacity duration-500`}></div>
                        
                        {/* Decorative elements */}
                        <div className="absolute top-4 right-4 w-20 h-20 rounded-full bg-white/20 group-hover:bg-white/30 transition-colors duration-500"></div>
                        <div className="absolute bottom-4 left-4 w-16 h-16 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors duration-500"></div>
                        
                        {/* Content */}
                        <div className="relative z-10 text-center">
                            {/* Icon container with enhanced styling */}
                            <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl text-white mb-6 group-hover:scale-110 transition-all duration-500 group-hover:shadow-xl`}>
                                <img 
                                    src={category.icon} 
                                    alt={category.title}
                                    className="w-10 h-10 object-contain"
                                />
                            </div>
                            
                            <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-gray-700 transition-colors duration-300">
                                {category.title}
                            </h3>
                            
                            <p className="text-gray-600 mb-4 text-base leading-relaxed">
                                {category.description}
                            </p>
                            
                            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gray-100 group-hover:bg-gray-200 transition-colors duration-300">
                                <span className="text-sm font-semibold text-gray-700">
                                    {getCategoryCount(category.title)} محصول
                                </span>
                            </div>
                        </div>
                        
                        {/* Hover effect overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-gray-800 opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-3xl"></div>
                        
                        {/* Arrow indicator */}
                        <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <svg className="w-6 h-6 text-gray-400 group-hover:text-gray-600 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
}
