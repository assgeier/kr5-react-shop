import ProductCard from './ProductCard.jsx';

function ProductList({ products, onAdd }) {
    if (products.length === 0) {
        return <p className="products-empty">Товары не найдены. Попробуйте изменить параметры поиска.</p>;
    }

    return (
        <div className="products-grid">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} onAdd={onAdd} />
            ))}
        </div>
    );
}

export default ProductList;