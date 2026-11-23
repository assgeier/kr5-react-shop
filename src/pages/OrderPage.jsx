import { useState } from 'react';
import { TextField, Button, Alert, Stack, Typography, Box, CircularProgress } from '@mui/material';

function OrderPage({ cartItems = [] }) {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Маска для телефона (только цифры)
  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/\D/g, ''); // Удаляем всё, кроме цифр
    if (value.length > 11) value = value.slice(0, 11);
    
    // Форматируем: +7 (999) 123-45-67
    let formatted = '';
    if (value.length > 0) formatted = '+7';
    if (value.length > 1) formatted += ` (${value.slice(1, 4)}`;
    if (value.length > 4) formatted += `) ${value.slice(4, 7)}`;
    if (value.length > 7) formatted += `-${value.slice(7, 9)}`;
    if (value.length > 9) formatted += `-${value.slice(9, 11)}`;
    
    setFormData((prev) => ({ ...prev, phone: formatted }));
    if (errors.phone) setErrors((prev) => ({ ...prev, phone: '' }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Введите имя';
    
    // Проверка e-mail через regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) newErrors.email = 'Введите корректный email';
    
    // Проверка телефона (минимум 11 цифр)
    const phoneDigits = formData.phone.replace(/\D/g, '');
    if (phoneDigits.length < 11) newErrors.phone = 'Введите корректный телефон';

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setSuccess(false);
      return;
    }

    // Имитация отправки
    setIsSubmitting(true);
    setTimeout(() => {
      console.log('Заявка отправлена:', { user: formData, cart: cartItems });
      setSuccess(true);
      setIsSubmitting(false);
      setFormData({ name: '', email: '', phone: '' });
      setErrors({});
      setTimeout(() => setSuccess(false), 5000);
    }, 1500); // Задержка 1.5 сек
  };

  return (
    <Box sx={{ maxWidth: 500, mx: 'auto' }}>
      <Typography variant="h4" component="h1" gutterBottom>Оформление заявки</Typography>
      
      {success && <Alert severity="success" sx={{ mb: 3 }}>Заявка успешно отправлена!</Alert>}

      <form onSubmit={handleSubmit} noValidate>
        <Stack spacing={2}>
          <TextField
            label="Ваше имя" name="name" value={formData.name} onChange={handleChange}
            error={Boolean(errors.name)} helperText={errors.name} fullWidth
          />
          <TextField
            label="Email" name="email" type="email" value={formData.email} onChange={handleChange}
            error={Boolean(errors.email)} helperText={errors.email} fullWidth
          />
          <TextField
            label="Телефон" name="phone" value={formData.phone} onChange={handlePhoneChange}
            error={Boolean(errors.phone)} helperText={errors.phone || 'Формат: +7 (999) 123-45-67'} fullWidth
          />
          <Button 
            type="submit" variant="contained" size="large" disableElevation 
            disabled={isSubmitting}
            startIcon={isSubmitting && <CircularProgress size={20} color="inherit" />}
          >
            {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
          </Button>
        </Stack>
      </form>
    </Box>
  );
}

export default OrderPage;