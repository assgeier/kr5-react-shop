import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Alert,
  Paper,
  Chip,
  Stack,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { getProductById } from '../api/productsApi.js';

function ProductPage({ onAddToCart }) {
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
        setError(err.message || 'Не удалось загрузить товар');
      } finally {
        setIsLoading(false);
      }
    }

    loadProduct();

    return () => controller.abort();
  }, [productId]);

  // 1. Состояние загрузки
  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  // 2. Состояние ошибки
  if (error) {
    return (
      <Box>
        <Button
          component={Link}
          to="/catalog"
          startIcon={<ArrowBackIcon />}
          sx={{ mb: 3 }}
        >
          Назад в каталог
        </Button>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  // 3. Товар не найден (на случай, если API вернул null)
  if (!product) {
    return (
      <Box>
        <Button
          component={Link}
          to="/catalog"
          startIcon={<ArrowBackIcon />}
          sx={{ mb: 3 }}
        >
          Назад в каталог
        </Button>
        <Alert severity="warning">Товар не найден</Alert>
      </Box>
    );
  }

  // 4. Успешный рендер
  return (
    <Box>
      <Button
        component={Link}
        to="/catalog"
        startIcon={<ArrowBackIcon />}
        sx={{ mb: 3 }}
      >
        Назад в каталог
      </Button>

      <Paper sx={{ p: 4, display: 'flex', gap: 4, flexWrap: 'wrap' }}>
        <Box
          component="img"
          src={product.image}
          alt={product.title}
          sx={{
            width: { xs: '100%', sm: 400 },
            height: 'auto',
            borderRadius: 2,
            objectFit: 'cover',
            bgcolor: 'grey.200',
          }}
        />

        <Stack spacing={2} sx={{ flex: 1, minWidth: 260 }}>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <Chip label={product.category} variant="outlined" />
            <Chip
              label={product.isAvailable ? 'В наличии' : 'Нет в наличии'}
              color={product.isAvailable ? 'success' : 'error'}
            />
            {product.rating && (
              <Chip label={`★ ${product.rating}`} color="warning" variant="outlined" />
            )}
          </Box>

          <Typography variant="h4" component="h1">
            {product.title}
          </Typography>

          <Typography variant="h5" color="primary.main" fontWeight="bold">
            {product.price.toLocaleString('ru-RU')} руб.
          </Typography>

          <Typography variant="body1" color="text.secondary">
            {product.description}
          </Typography>

          <Box sx={{ pt: 2 }}>
            <Button
              variant="contained"
              size="large"
              disableElevation
              disabled={!product.isAvailable}
              onClick={() => onAddToCart(product)}
            >
              {product.isAvailable ? 'Добавить в корзину' : 'Нет в наличии'}
            </Button>
          </Box>
        </Stack>
      </Paper>
    </Box>
  );
}

export default ProductPage;