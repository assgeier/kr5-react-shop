const API_BASE = '/products.json';

export async function requestJson(url, options = {}) {
    const response = await fetch(url, options);
    if (!response.ok) {
        throw new Error(`Ошибка HTTP: ${response.status}`);
    }
    return response.json();
}

export async function getProducts(signal) {
    return requestJson(API_BASE, { signal });
}

export async function getProductById(productId, signal) {
    const products = await getProducts(signal);
    const product = products.find((item) => item.id === Number(productId));
    if (!product) {
        throw new Error('Товар не найден');
    }
    return product;
}