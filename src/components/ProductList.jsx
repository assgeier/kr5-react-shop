import ProductCard from './ProductCard.jsx';

// products — массив, переданный через props из App
function ProductList({ products }) {
  // Если массив пуст — показываем сообщение, а не пустую сетку
  if (products.length === 0) {
    return <p className="products-empty">Товары не найдены.</p>;
  }

  return (
    <section className="products">
      <h2 className="products__title">Каталог товаров</h2>
      <div className="products-grid">
        {products.map((product) => (
          // key — устойчивый id товара (не индекс массива!)
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

export default ProductList;