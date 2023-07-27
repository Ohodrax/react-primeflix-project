// Global API Url: https://api.themoviedb.org/3/
// Global API Get List: movie/now_playing?api_key=9da8edeb724986a2babdf50fef776ddd&language=pt-BR

import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
});

export default api;