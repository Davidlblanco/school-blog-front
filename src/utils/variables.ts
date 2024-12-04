export const apiUrl = window.location.href.includes('localhost')
    ? 'http://localhost:3000' // sempre que rodar local é necessário o banco e backend local
    : 'https://school-blog-back-1727553447.onrender.com';
