import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../productsSlice";
import ProductCard from "../components/ProductCard";

const StorePage = () => {
    const dispatch = useDispatch();
    const { loading, products, error } = useSelector(state => state.products);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    if (loading) return <p>در حال بارگذاری محصولات...</p>;
    if (error) return <p>خطا در بارگذاری: {error}</p>;

    return (
        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map(product => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
};

export default StorePage;
