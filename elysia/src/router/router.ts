import Elysia from "elysia";
import { pokemonController } from "../controllers/pokemonController";
import { userController } from "../controllers/userController";

export const pkmRouter = (app: Elysia) => {
    pokemonController(app)
}

export const userRouter = (app: Elysia) => {
    userController(app)
}