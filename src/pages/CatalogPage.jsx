import { useState, useEffect } from 'react';
import CatalogControls from '../components/CatalogControls.jsx';
import ProductList from '../components/ProductList.jsx';
import { getPreparedProducts } from '../utils/productUtils.js';
import { getProducts } from '../api/productsApi.js';

function CatalogPage() {
    // Состояния для API
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [reloadKey, setReloadKey] = useState(0);

    // Состояния фильтров
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [sortType, setSortType] = useState('default');

    // Загрузка данных
    useEffect(() => {
        const controller = new AbortController();

        async function loadData() {
            setIsLoading(true);
            setError('');

            try {
                const data = await getProducts(controller.signal);
                setProducts(data);
            } catch (err) {
                if (err.name === 'AbortError') return; // Игнорируем отмену
                setError(err.message || 'Не удалось загрузить товары');
            } finally {
                // В случае отмены finally может сработать при размонтировании
                // Но React 18 безопасно обрабатывает setState после размонтирования
                setIsLoading(false);
            }
        }

        loadData();

        return () => {
            controller.abort(); // Отмена при размонтировании
        };
    }, [reloadKey]);

    // Повторная загрузка
    const handleRetry = () => {
        setReloadKey((prev) => prev + 1);
    };

    // Уникальные категории
    const categories = [...new Set(products.map((p) => p.category))];

    // Вычисление видимых товаров
    const visibleProducts = getPreparedProducts(
        products,
        searchQuery,
        selectedCategory,
        sortType
    );

    return (
        <div className="catalog-page">
            <h1>Каталог товаров</h1>

            {/* 1. Состояние загрузки */}
            {isLoading && <p className="status-message">Загрузка товаров...</p>}

            {/* 2. Состояние ошибки */}
            {error && (
                <div className="error-message">
                    <p>{error}</p>
                    <button onClick={handleRetry}>Попробовать снова</button>
                </div>
            )}

            {/* 3. Успешное состояние */}
            {!isLoading && !error && (
                <>
                    <CatalogControls
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        selectedCategory={selectedCategory}
                        setSelectedCategory={setSelectedCategory}
                        sortType={sortType}
                        setSortType={setSortType}
                        categories={categories}
                    />

                    <p className="catalog-count">Найдено товаров: {visibleProducts.length}</p>

                    <ProductList products={visibleProducts} />
                </>
            )}
        </div>
    );
}

export default CatalogPage;