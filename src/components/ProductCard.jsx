// Форматирование цены (обычная JS-функция, используется как выражение в JSX)
function formatPrice(price) {
  return `${price.toLocaleString('ru-RU')} руб.`;
}

// Данные приходят через props (деструктуризация объекта product)
function ProductCard({ product }) {
  return (
    <article className="product-card">
      <img
        className="product-card__image"
        src={product.image}
        alt={product.title}
        loading="lazy"
      />

      <div className="product-card__body">
        <span className="product-card__category">{product.category}</span>
        <h3 className="product-card__title">{product.title}</h3>
        <p className="product-card__description">{product.description}</p>

        <div className="product-card__footer">
          <span className="product-card__price">{formatPrice(product.price)}</span>
          <span
            className={
              product.inStock
                ? 'product-card__stock product-card__stock--in'
                : 'product-card__stock product-card__stock--out'
            }
          >
            {product.inStock ? 'В наличии' : 'Нет в наличии'}
          </span>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;