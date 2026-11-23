import Header from './components/Header.jsx';
import ProductList from './components/ProductList.jsx';
import { products } from './data/products.js';
import './App.css';

function App() {
  return (
    <div className="app">
      <Header />
      <main className="app__main">
        <ProductList products={products} />
      </main>
      <footer className="site-footer">
        <p>React Shop — учебный проект, практика №19</p>
      </footer>
    </div>
  );
}

export default App;