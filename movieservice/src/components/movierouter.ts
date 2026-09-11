import {Router, type Router as ExpressRouter} from "express"
import MovieController from "./moviecontroller.js";

class MovieRouter{
    private readonly movieController: MovieController;
    constructor(movieController: MovieController) {
        this.movieController = movieController;
    }

    getRouter(): ExpressRouter{
        const router = Router();
        router.route('/').get(this.movieController.getMovies);
        return router
    }
}
export default MovieRouter;