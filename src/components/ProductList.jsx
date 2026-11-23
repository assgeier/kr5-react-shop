import { Grid, Typography } from '@mui/material';
import ProductCard from './ProductCard.jsx';

function ProductList({ products, onAdd }) {
  if (products.length === 0) {
    return (
      <Typography variant="h6" color="text.secondary" align="center" sx={{ py: 4 }}>
        Товары не найдены
      </Typography>
    );
  }

  return (
    <Grid container spacing={3}>
      {products.map((product) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
          <ProductCard product={product} onAdd={onAdd} />
        </Grid>
      ))}
    </Grid>
  );
}

export default ProductList;