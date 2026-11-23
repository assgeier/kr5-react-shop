import { TextField, FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';

function CatalogControls({
  searchQuery, setSearchQuery,
  selectedCategory, setSelectedCategory,
  sortType, setSortType,
  categories
}) {
  return (
    <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
      <TextField
        label="Поиск по названию"
        variant="outlined"
        size="small"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{ flex: '1 1 200px' }}
      />

      <FormControl size="small" sx={{ minWidth: 160 }}>
        <InputLabel>Категория</InputLabel>
        <Select
          value={selectedCategory}
          label="Категория"
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <MenuItem value="all">Все категории</MenuItem>
          {categories.map((cat) => (
            <MenuItem key={cat} value={cat}>{cat}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl size="small" sx={{ minWidth: 200 }}>
        <InputLabel>Сортировка</InputLabel>
        <Select
          value={sortType}
          label="Сортировка"
          onChange={(e) => setSortType(e.target.value)}
        >
          <MenuItem value="default">Без сортировки</MenuItem>
          <MenuItem value="price-asc">Цена: по возрастанию</MenuItem>
          <MenuItem value="price-desc">Цена: по убыванию</MenuItem>
          <MenuItem value="title">По названию (А-Я)</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

export default CatalogControls;