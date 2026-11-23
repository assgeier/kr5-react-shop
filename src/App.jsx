import Header from './components/Header.jsx';
import CatalogPage from './pages/CatalogPage.jsx';
import './App.css';

function App() {
  return (
    <div className="app">
      <Header />
      <main className="app__main">
        <CatalogPage />
      </main>
      <footer className="site-footer">
        <p>React Shop — учебный проект (Практика 20)</p>
      </footer>
    </div>
  );
}

export default App;