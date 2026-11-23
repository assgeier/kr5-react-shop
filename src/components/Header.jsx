import { AppBar, Toolbar, Typography, Button, Badge, Box } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <AppBar position="static" elevation={1} sx={{ mb: 4 }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
          React Shop
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Button color="inherit" component={Link} to="/">
            Главная
          </Button>
          <Button color="inherit" component={Link} to="/catalog">
            Каталог
          </Button>
          <Button color="inherit" component={Link} to="/order">
            Заявка
          </Button>
          
          <Button color="inherit" component={Link} to="/cart">
            <Badge badgeContent={0} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;