export const apiUrl =
    import.meta.env.MODE === 'production'
        ? 'https://school-blog-back-1727553447.onrender.com'
        : 'http://localhost:3000';
