const ProductCard = ({ product }) => {
    const finalPrice = product.discount
        ? product.price - (product.price * product.discount) / 100
        : product.price;

    return (
        <div className="border rounded p-4 shadow hover:shadow-lg transition">
            <img src={product.image} alt={product.title} className="w-full h-48 object-cover rounded" />
            <h3 className="mt-2 font-bold">{product.title}</h3>
            <p className="text-sm text-gray-600">{product.description}</p>
            <div className="mt-2">
                {product.discount && (
                    <span className="text-red-500 font-semibold mr-2">{product.discount}% تخفیف</span>
                )}
                <span className="font-bold">{finalPrice.toLocaleString()} تومان</span>
            </div>
            <div className="mt-1 text-yellow-500">
                {product.ratingAverage ? `⭐ ${product.ratingAverage}` : "بدون امتیاز"}
            </div>
        </div>
    );
};

export default ProductCard;
