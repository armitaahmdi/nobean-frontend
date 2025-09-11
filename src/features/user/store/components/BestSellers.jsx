import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';

export default function BestSellers({ products }) {
    // Sort products by rating and get top 4
    const bestSellers = [...products]
        .filter(product => product.ratingAverage > 0)
        .sort((a, b) => b.ratingAverage - a.ratingAverage)
        .slice(0, 4);

    if (bestSellers.length === 0) {
        return null;
    }

    return (
        <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">پرفروش‌ترین‌ها</h2>
                </div>
                <Link
                    to="/store?sort=rating"
                    className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-2 transition-colors"
                >
                    مشاهده همه
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {bestSellers.map((product) => (
                    <div key={product.id} className="relative">
                        {/* Best Seller Badge */}
                        <div className="absolute -top-2 -right-2 z-10 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                            پرفروش
                        </div>
                        <ProductCard product={product} />
                    </div>
                ))}
            </div>
        </div>
    );
}
