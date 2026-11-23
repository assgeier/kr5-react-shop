import { useState } from 'react';
import { TextField, Button, Alert, Stack, Typography, Box } from '@mui/material';

function OrderPage() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Сбрасываем ошибку при вводе
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Введите имя';
    if (!formData.email.includes('@')) newErrors.email = 'Введите корректный email';
    if (!formData.phone.trim()) newErrors.phone = 'Введите телефон';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setSuccess(false);
    } else {
      // Имитация отправки
      console.log('Отправлено:', formData);
      setSuccess(true);
      setFormData({ name: '', email: '', phone: '' });
      setErrors({});
      // Скрываем сообщение через 5 секунд
      setTimeout(() => setSuccess(false), 5000);
    }
  };

  return (
    <Box sx={{ maxWidth: 500, mx: 'auto' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Оформление заявки
      </Typography>

      {success && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Заявка успешно отправлена!
        </Alert>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <Stack spacing={2}>
          <TextField
            label="Ваше имя"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={Boolean(errors.name)}
            helperText={errors.name}
            fullWidth
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={Boolean(errors.email)}
            helperText={errors.email}
            fullWidth
          />
          <TextField
            label="Телефон"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            error={Boolean(errors.phone)}
            helperText={errors.phone}
            fullWidth
          />
          <Button type="submit" variant="contained" size="large" disableElevation>
            Отправить заявку
          </Button>
        </Stack>
      </form>
    </Box>
  );
}

export default OrderPage;