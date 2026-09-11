import prisma, { attachRatingsDatabase } from "../database/prisma.js";
import type { Prisma } from "@prisma/client";
import type {
    GetMoviesOptions,
    MovieDetails,
    MovieDetailsRow,
    PaginatedMovies,
} from "./movietypes.js";
const PAGE_SIZE = 50;
class MovieService {
    private normalizeItems(rawValue: string | null): string[] {
        if (!rawValue) {
            return [];
        }

        try {
            const values = JSON.parse(rawValue) as Array<{ name: string }>;

            if (!Array.isArray(values)) {
                return [];
            }

            return values.map((value) => value.name);
        } catch {
            return [];
        }
    }
    private formatBudget(budget: number | null): string | null {
        if (budget === null) {
            return null;
        }

        return `$${budget.toFixed(2)}`;
    }
    async getMovies(options: GetMoviesOptions): Promise<PaginatedMovies> {
        const { page, year, genre, order } = options;
        const skip = (page - 1) * PAGE_SIZE;
        const where: Prisma.moviesWhereInput = {};

        if (year) {
            where.releaseDate = {
                startsWith: `${year}-`,
            };
        }

        if (genre) {
            where.genres = {
                contains: `"name": "${genre}"`,
            };
        }
        const orderBy: Prisma.moviesOrderByWithRelationInput = year
            ? { releaseDate: order }
            : { movieId: "asc" };

        const [total, movies] = await prisma.$transaction([
            prisma.movies.count({
                where,
            }),
            prisma.movies.findMany({
                where,
                skip,
                take: PAGE_SIZE,
                orderBy,
                select: {
                    imdbId: true,
                    title: true,
                    genres: true,
                    releaseDate: true,
                    budget: true,
                },
            }),
        ]);

        const data = movies.map((movie) => ({
            ...movie,
            genres: this.normalizeItems(movie.genres),
            budget: this.formatBudget(movie.budget),
        }));

        return {
            data,
            pagination: {
                page,
                pageSize: PAGE_SIZE,
                total,
                totalPages: Math.ceil(total / PAGE_SIZE),
            },
        }
    }
    async getMovieDetails(movieId: number): Promise<MovieDetails | null> {
        await attachRatingsDatabase();

        const movies = await prisma.$queryRaw<MovieDetailsRow[]>`
    SELECT
      m.imdbId,
      m.title,
      m.overview AS description,
      m.releaseDate,
      m.budget,
      m.runtime,
      ROUND(AVG(r.rating), 2) AS averageRating,
      m.genres,
      m.language AS originalLanguage,
      m.productionCompanies
    FROM main.movies AS m
    LEFT JOIN ratings_db.ratings AS r
      ON r.movieId = m.movieId
    WHERE m.movieId = ${movieId}
    GROUP BY m.movieId
  `;

        const movie = movies[0];

        if (!movie) {
            return null;
        }

        return {
            ...movie,
            genres: this.normalizeItems(movie.genres),
            productionCompanies: this.normalizeItems(movie.productionCompanies),
            budget: this.formatBudget(movie.budget),
        };
    }
}

export default MovieService;