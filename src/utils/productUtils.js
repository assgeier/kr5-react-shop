// Функция для получения списка товаров с учетом поиска, категории и сортировки
export function getPreparedProducts(products, searchQuery, selectedCategory, sortType) {
    // 1. Фильтрация
    let result = products.filter((product) => {
        const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    // 2. Сортировка (создаем копию массива, чтобы не мутировать исходный)
    result = [...result];

    if (sortType === 'price-asc') {
        result.sort((a, b) => a.price - b.price);
    } else if (sortType === 'price-desc') {
        result.sort((a, b) => b.price - a.price);
    } else if (sortType === 'title') {
        result.sort((a, b) => a.title.localeCompare(b.title));
    }

    return result;
}