const apiKey: string = '00002c1315abdda70d4477e8e2b88c82';
export const baseImageUrl = (size: string, path: string) => {
    return `https://image.tmdb.org/t/p/${size}${path}`;
};

export const nowPlayingMovies: string = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`;
export const upcomingMovies: string = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}`;
export const popularMovies: string = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`;

export const searchMovies = (keyword: string) => {
    return `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${keyword}`;
};

export const movieDetails = (movieId: number) => {
    return `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`;
};

export const movieCredits = (movieId: number) => {
    return `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`;
};
