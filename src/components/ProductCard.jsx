import { Card, CardContent, CardMedia, CardActions, Typography, Chip, Button, Box } from '@mui/material';

function formatPrice(price) {
  return `${price.toLocaleString('ru-RU')} руб.`;
}

function ProductCard({ product, onAddToCart }) {
  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <CardMedia component="img" height="160" image={product.image} alt={product.title} sx={{ objectFit: 'cover' }} />
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Chip label={product.category} size="small" variant="outlined" />
          <Chip label={product.isAvailable ? 'В наличии' : 'Нет'} size="small" color={product.isAvailable ? 'success' : 'error'} />
        </Box>
        <Typography variant="h6" component="h3" gutterBottom>{product.title}</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>{product.description}</Typography>
        <Typography variant="h6" color="primary.main">{formatPrice(product.price)}</Typography>
      </CardContent>
      <CardActions sx={{ p: 2, pt: 0 }}>
        <Button fullWidth variant="contained" disableElevation onClick={() => onAddToCart(product)} disabled={!product.isAvailable}>
          {product.isAvailable ? 'Добавить в корзину' : 'Нет в наличии'}
        </Button>
      </CardActions>
    </Card>
  );
}

export default ProductCard;