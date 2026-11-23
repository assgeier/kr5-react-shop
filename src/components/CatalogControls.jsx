function CatalogControls({
  searchQuery, setSearchQuery,
  selectedCategory, setSelectedCategory,
  sortType, setSortType,
  categories
}) {
  return (
    <div className="catalog-controls">
      {/* Поиск */}
      <input
        type="text"
        placeholder="Поиск по названию..."
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
        className="catalog-controls__input"
      />

      {/* Фильтр категорий */}
      <select
        value={selectedCategory}
        onChange={(event) => setSelectedCategory(event.target.value)}
        className="catalog-controls__select"
      >
        <option value="all">Все категории</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      {/* Сортировка */}
      <select
        value={sortType}
        onChange={(event) => setSortType(event.target.value)}
        className="catalog-controls__select"
      >
        <option value="default">Без сортировки</option>
        <option value="price-asc">Цена: по возрастанию</option>
        <option value="price-desc">Цена: по убыванию</option>
        <option value="title">По названию (А-Я)</option>
      </select>
    </div>
  );
}

export default CatalogControls;