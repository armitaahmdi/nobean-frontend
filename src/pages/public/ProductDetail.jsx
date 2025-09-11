import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { fetchProducts } from "../../features/user/store/productsSlice";
import LoadingState from "../../components/ui/LoadingState";
import ErrorState from "../../components/ui/ErrorState";
import ProductDetailCard from "../../features/user/store/pages/ProductDetailCard";
import RelatedProducts from "../../features/user/store/components/RelatedProducts";
import HelmetSeo from "../../helper/helmet";
import translate from "../../locale/translate";
import { useBreadcrumb } from "../../contexts/BreadcrumbContext";

export default function ProductDetail() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector((state) => state.products);
    const { setPageTitle, clearPageTitle } = useBreadcrumb();

    useEffect(() => {
        if (products.length === 0) {
            dispatch(fetchProducts());
        }
    }, [dispatch, products.length]);

    const productId = Number(id); 
    const product = products.find((p) => p.id === productId);
    
    // Set breadcrumb title when product is loaded
    useEffect(() => {
        if (product) {
            setPageTitle(product.title);
        }
        
        // Clean up when component unmounts
        return () => {
            clearPageTitle();
        };
    }, [product, setPageTitle, clearPageTitle]);
    
    if (loading) return <LoadingState />;
    if (error) return <ErrorState />;
    if (!product) return <div className="text-center py-10">محصول پیدا نشد.</div>;

    return (
        <>
            <HelmetSeo 
                title={`${product.title} | ${translate.productDetail.title}`}
                description={`${product.description} - ${translate.productDetail.description}`}
                keywords={`${product.title}, ${product.categories.join(', ')}, ${translate.productDetail.keywords}`}
            />
            <div className="max-w-7xl mx-auto px-4 py-6">
                <ProductDetailCard product={product} />
                <RelatedProducts products={products} currentProductId={product.id} />
            </div>
        </>
    );
}
