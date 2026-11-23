function formatPrice(price) {
  return `${price.toLocaleString('ru-RU')} руб.`;
}

// Добавляем onAdd в props
function ProductCard({ product, onAdd }) {
  return (
    <article className="product-card">
      <img className="product-card__image" src={product.image} alt={product.title} />
      <div className="product-card__body">
        <span className="product-card__category">{product.category}</span>
        <h3 className="product-card__title">{product.title}</h3>
        <p className="product-card__description">{product.description}</p>
        <div className="product-card__footer">
          <span className="product-card__price">{formatPrice(product.price)}</span>
          {/* Кнопка добавления */}
          <button className="product-card__btn" onClick={() => onAdd(product)}>
            Добавить
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;