export const apiUrl = window.location.href.includes('localhost')
    ? 'http://localhost:3000' // sempre que rodar local é necessário o banco e backend local
    : import.meta.env.VITE_API_URL;
