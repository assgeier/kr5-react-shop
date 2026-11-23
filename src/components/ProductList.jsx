import { Box, Typography } from '@mui/material';
import ProductCard from './ProductCard.jsx';

function ProductList({ products, onAddToCart }) {
  if (products.length === 0) {
    return (
      <Typography variant="h6" color="text.secondary" align="center" sx={{ py: 4 }}>
        Товары не найдены
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        display: 'grid',
        // Эта строка делает ячейки одинаковыми и адаптивными
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: 3, // Отступы между карточками
      }}
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
      ))}
    </Box>
  );
}

export default ProductList;