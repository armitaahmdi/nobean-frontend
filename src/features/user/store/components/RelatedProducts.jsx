import ProductCard from "./ProductCard";

const RelatedProducts = ({ products, currentProductId }) => {
    // Filter out current product and get related products based on categories
    const currentProduct = products.find(p => p.id === currentProductId);
    if (!currentProduct) return null;

    const relatedProducts = products
        .filter(p => p.id !== currentProductId)
        .filter(p => p.categories.some(category => currentProduct.categories.includes(category)))
        .slice(0, 4);

    if (relatedProducts.length === 0) return null;

    return (
        <div className="mt-12">
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">محصولات مشابه</h2>
                <p className="text-gray-600 text-center">محصولات مرتبط با {currentProduct.title}</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default RelatedProducts;
