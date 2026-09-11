import type { NextFunction, Request, Response } from "express"
import MovieService from "./movieservice.js";
import type { GetMoviesOptions } from "./movietypes.js";
class MovieController {
    constructor(private readonly movieService: MovieService) { }

    private parseMovieOptions(req: Request): GetMoviesOptions | null {
        const page = Number(req.query.page ?? 1);
        const year = req.query.year === undefined ? undefined : Number(req.query.year)
        const genre = req.query.genre === undefined ? undefined : String(req.query.genre).trim();;
        const order = req.query.order ?? "asc";
        if (!Number.isInteger(page) || page < 1) {
            return null;
        }
        if (year !== undefined && (!Number.isInteger(year) || year < 1000 || year > 9999)) {
            return null;
        }
        if (genre === "") {
            return null;
        }
        if (order !== "asc" && order !== "desc") {
            return null;
        }
        const options: GetMoviesOptions = {
            page,
            order,
        };

        if (year) {
            options.year = year;
        }

        if (genre) {
            options.genre = genre;
        }

        return options;
    }
    getMovies = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        const options = this.parseMovieOptions(req);

        if (!options) {
            res.status(400).json({
                error: "Invalid query parameters",
            });
            return;
        }

        try {
            const result = await this.movieService.getMovies(options);
            res.status(200).json(result);
        } catch (error: unknown) {
            next(error);
        }
    };
    getMovieDetails = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const movieId = Number(req.params.movieId);
        if (!Number.isInteger(movieId) || movieId < 1) {
            res.status(400).json({
                error: "movieId must be a positive integer",
            });
            return;
        }
        try {
            const movie = await this.movieService.getMovieDetails(movieId);
            if (!movie) {
                res.status(404).json({
                    error: "Movie not found",
                });
                return;
            }
            res.status(200).json({
                data: movie,
            });

        } catch (error: unknown) {
            next(error);
        }
    }
}
export default MovieController;


