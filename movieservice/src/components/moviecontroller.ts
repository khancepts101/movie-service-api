import type {NextFunction, Request, Response} from "express"
import MovieService from "./movieservice.js"
class MovieController {
    constructor(private readonly movieService: MovieService) {}


 getMovies = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const movies = await this.movieService.getMovies();
        return res.status(200).json({data: movies})
    } catch (error: unknown) {
        next(error);
    }
};
}
export default MovieController;


