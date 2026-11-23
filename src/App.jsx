import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Header from './components/Header.jsx';
import CatalogPage from './pages/CatalogPage.jsx';
import ProductPage from './pages/ProductPage.jsx';
import CartPage from './pages/CartPage.jsx';
import OrderPage from './pages/OrderPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <nav className="nav">
          <Link to="/">Главная</Link>
          <Link to="/catalog">Каталог</Link>
          <Link to="/cart">Корзина</Link>
          <Link to="/order">Заявка</Link>
        </nav>
        <main className="app__main">
          <Routes>
            <Route path="/" element={<h1>Добро пожаловать в React Shop</h1>} />
            <Route path="/catalog" element={<CatalogPage />} />
            <Route path="/product/:productId" element={<ProductPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/order" element={<OrderPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <footer className="site-footer">
          <p>React Shop — учебный проект (Практики 20–23+)</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;