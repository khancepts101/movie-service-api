import MovieController from './moviecontroller.js'
import MovieService from './movieservice.js'
import MovieRouter from './movierouter.js'

const movieService = new MovieService();
const movieController = new MovieController(movieService);
const movieRouter = new MovieRouter(movieController);

export default {
    service: movieService,
    controller: movieController,
    router: movieRouter.getRouter()
}