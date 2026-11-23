import { useState } from 'react';
import CatalogControls from '../components/CatalogControls.jsx';
import ProductList from '../components/ProductList.jsx';
import { getPreparedProducts } from '../utils/productUtils.js';
import { products as allProducts } from '../data/products.js';

function CatalogPage() {
  // 1. Создаем состояния
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortType, setSortType] = useState('default');
  const [addedCount, setAddedCount] = useState(0); // Счетчик добавленных

  // Получаем уникальные категории
  const categories = [...new Set(allProducts.map((p) => p.category))];

  // 2. Вычисляем видимые товары (производное значение)
  const visibleProducts = getPreparedProducts(
    allProducts,
    searchQuery,
    selectedCategory,
    sortType
  );

  // 3. Обработчик добавления
  const handleAdd = () => {
    setAddedCount((prevCount) => prevCount + 1);
  };

  return (
    <div className="catalog-page">
      <h1>Каталог товаров</h1>
      
      {/* Вывод счетчика */}
      <p className="catalog-counter">Добавлено товаров: {addedCount}</p>

      {/* Компонент управления */}
      <CatalogControls
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        sortType={sortType}
        setSortType={setSortType}
        categories={categories}
      />

      {/* Вывод количества найденных */}
      <p className="catalog-count">Найдено товаров: {visibleProducts.length}</p>

      {/* Список товаров */}
      <ProductList products={visibleProducts} onAdd={handleAdd} />
    </div>
  );
}

export default CatalogPage;