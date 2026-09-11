export interface MovieSummary {
    movieId: number;
    imdbId: string;
    title: string;
    genres: string[]
    releaseDate: string | null;
    budget: number | null;
}
class MovieService {
    async getMovies(): Promise<MovieSummary[]> {
        return [];
    }
}

export default MovieService;