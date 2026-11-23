import { Box, Typography, Button, Container, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import KeyboardIcon from '@mui/icons-material/Keyboard';

function HomePage() {
  return (
    <Box>
      {/* Hero-секция с фото */}
      <Paper
        sx={{
          position: 'relative',
          backgroundColor: 'grey.900',
          color: '#fff',
          mb: 4,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundImage: 'url(/images/keyboard-1.jpg)', // Используем фото товара
          borderRadius: 4,
          overflow: 'hidden',
        }}
      >
        {/* Затемнение фона для читаемости текста */}
        <Box
          sx={{
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            zIndex: 1,
          }}
        />
        
        <Box
          sx={{
            position: 'relative',
            zIndex: 2,
            p: { xs: 4, md: 8 },
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            maxWidth: 'md',
          }}
        >
          <KeyboardIcon sx={{ fontSize: 60, mb: 2, color: 'primary.light' }} />
          <Typography variant="h2" component="h1" gutterBottom fontWeight="bold">
            MechKey Shop
          </Typography>
          <Typography variant="h5" sx={{ mb: 4, opacity: 0.9 }}>
            Твой проводник в мир идеального звука и тактильных ощущений. Собираем кастомные клавиатуры, продаем свитчи, кейкапы и аксессуары.
          </Typography>
          <Button
            component={Link}
            to="/catalog"
            variant="contained"
            size="large"
            disableElevation
            sx={{ borderRadius: 8, px: 4, py: 1.5 }}
          >
            Перейти в каталог
          </Button>
        </Box>
      </Paper>

      {/* Блок с преимуществами */}
      <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 3 }}>
        Почему мы?
      </Typography>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 3 }}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom color="primary">
            Только оригиналы
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Мы работаем напрямую с производителями свитчей и кейкапов. Никаких подделок.
          </Typography>
        </Paper>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom color="primary">
            Быстрая доставка
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Отправляем заказы в день оплаты. Бережная упаковка гарантирована.
          </Typography>
        </Paper>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom color="primary">
            Сборка под ключ
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Поможем собрать клавиатуру вашей мечты и настроить прошивку.
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
}

export default HomePage;