import { useState, useEffect } from 'react';
import { Typography, Alert, Button, Box, CircularProgress } from '@mui/material';
import CatalogControls from '../components/CatalogControls.jsx';
import ProductList from '../components/ProductList.jsx';
import { getPreparedProducts } from '../utils/productUtils.js';
import { getProducts } from '../api/productsApi.js';

function CatalogPage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [reloadKey, setReloadKey] = useState(0);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortType, setSortType] = useState('default');

  useEffect(() => {
    const controller = new AbortController();
    async function loadData() {
      setIsLoading(true);
      setError('');
      try {
        const data = await getProducts(controller.signal);
        setProducts(data);
      } catch (err) {
        if (err.name === 'AbortError') return;
        setError(err.message || 'Не удалось загрузить товары');
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
    return () => controller.abort();
  }, [reloadKey]);

  const handleRetry = () => setReloadKey((prev) => prev + 1);

  const categories = [...new Set(products.map((p) => p.category))];
  const visibleProducts = getPreparedProducts(products, searchQuery, selectedCategory, sortType);

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Каталог товаров
      </Typography>

      {isLoading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Alert 
          severity="error" 
          action={<Button color="inherit" size="small" onClick={handleRetry}>Повторить</Button>}
          sx={{ mb: 3 }}
        >
          {error}
        </Alert>
      )}

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
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Найдено товаров: {visibleProducts.length}
          </Typography>
          <ProductList products={visibleProducts} />
        </>
      )}
    </Box>
  );
}

export default CatalogPage;