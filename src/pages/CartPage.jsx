import { Typography, Button, Box, Paper, IconButton, Divider } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Link } from 'react-router-dom';

function CartPage({ cartItems, onRemove, onUpdateQuantity, onClear }) {
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cartItems.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h5" gutterBottom>Корзина пуста</Typography>
        <Button component={Link} to="/catalog" variant="contained" sx={{ mt: 2 }}>Перейти в каталог</Button>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>Корзина</Typography>
      <Button variant="outlined" color="error" onClick={onClear} sx={{ mb: 3 }}>Очистить корзину</Button>

      <Paper sx={{ p: 2, mb: 3 }}>
        {cartItems.map((item, index) => (
          <Box key={item.id}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, py: 2 }}>
              <Box component="img" src={item.image} alt={item.title} sx={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 1 }} />
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="subtitle1">{item.title}</Typography>
                <Typography variant="body2" color="text.secondary">{item.price} руб. / шт.</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <IconButton size="small" onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}>
                  <RemoveIcon fontSize="small" />
                </IconButton>
                <Typography>{item.quantity}</Typography>
                <IconButton size="small" onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>
                  <AddIcon fontSize="small" />
                </IconButton>
              </Box>
              <Typography sx={{ minWidth: 80, textAlign: 'right', fontWeight: 'bold' }}>
                {(item.price * item.quantity).toLocaleString('ru-RU')} руб.
              </Typography>
              <IconButton color="error" onClick={() => onRemove(item.id)}>
                <DeleteIcon />
              </IconButton>
            </Box>
            {index < cartItems.length - 1 && <Divider />}
          </Box>
        ))}
      </Paper>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5">Итого: {total.toLocaleString('ru-RU')} руб.</Typography>
        <Button component={Link} to="/order" variant="contained" size="large">Оформить заявку</Button>
      </Box>
    </Box>
  );
}

export default CartPage;