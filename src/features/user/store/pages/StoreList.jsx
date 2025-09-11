import ProductCard from "../components/ProductCard";

export default function StoreList({ data, selectedFilters }) {
    return (
        <div className="rounded-[20px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 p-2 sm:p-4">
            {data.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
}
