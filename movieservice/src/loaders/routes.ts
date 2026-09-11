import type { Application} from "express";
import moviemodule from "../components/moviemodule.js";
export default function loadRoutes(app: Application): void {
    app.use("/movies", moviemodule.router);
}