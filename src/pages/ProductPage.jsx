import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById } from '../api/productsApi.js';

function ProductPage() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    async function loadProduct() {
      setIsLoading(true);
      setError('');
      setProduct(null);

      try {
        const data = await getProductById(productId, controller.signal);
        setProduct(data);
      } catch (err) {
        if (err.name === 'AbortError') return;
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    loadProduct();

    return () => controller.abort();
  }, [productId]);

  if (isLoading) return <p className="status-message">Загрузка товара...</p>;
  if (error) return <p className="error-message">Ошибка: {error}</p>;
  if (!product) return <p className="error-message">Товар не найден</p>;

  return (
    <div className="product-page">
      <Link to="/catalog" className="back-link">← Назад в каталог</Link>
      <div className="product-detail">
        <img src={product.image} alt={product.title} className="product-detail__image" />
        <div className="product-detail__info">
          <h1>{product.title}</h1>
          <p className="product-detail__category">Категория: {product.category}</p>
          <p className="product-detail__price">{product.price} руб.</p>
          <p className="product-detail__description">{product.description}</p>
          <p className="product-detail__stock">
            {product.isAvailable ? '✅ В наличии' : '❌ Нет в наличии'}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;