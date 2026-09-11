export interface MovieSummary {
    imdbId: string;
    title: string;
    genres: string[];
    releaseDate: string | null;
    budget: string | null;
}
export interface MovieDetails {
    imdbId: string;
    title: string;
    description: string | null;
    releaseDate: string | null;
    budget: string | null;
    runtime: number | null;
    averageRating: number | null;
    genres: string[];
    originalLanguage: string | null;
    productionCompanies: string[];
}
export interface MovieDetailsRow {
    imdbId: string;
    title: string;
    description: string | null;
    releaseDate: string | null;
    budget: number | null;
    runtime: number | null;
    averageRating: number | null;
    genres: string | null;
    originalLanguage: string | null;
    productionCompanies: string | null;
}
export interface GetMoviesOptions {
    page: number;
    year?: number;
    genre?: string;
    order: "asc" | "desc";
}
export interface PaginatedMovies {
    data: MovieSummary[];
    pagination: {
        page: number;
        pageSize: number;
        total: number;
        totalPages: number;
    }
}