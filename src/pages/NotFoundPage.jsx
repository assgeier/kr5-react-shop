import { Link } from 'react-router-dom';

function NotFoundPage() {
    return (
        <div style={{ textAlign: 'center', padding: '40px' }}>
            <h1>404 — Страница не найдена</h1>
            <p>Такой страницы не существует.</p>
            <Link to="/">Вернуться на главную</Link>
        </div>
    );
}

export default NotFoundPage;