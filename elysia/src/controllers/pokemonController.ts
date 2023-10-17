import Elysia from "elysia";

const PKM = require('../models/pokemonModel.ts');
const { authenticate } = require('../middlewares/auth.ts');

export const pokemonController = (app: Elysia) => {
    app.get("/pokemon", async () => {
        const pokemons = await PKM.find()
        return pokemons
    })

    app.post("/pokemons", async (req: any) => {
        const { name, type, level } = req.body
        const newPokemon = new PKM({ name, type, level })
        await newPokemon.save()
        return newPokemon
    })

    app.get("/pokemons/:id", async (req: any) => {
        const { id } = req.params
        const pokemon = await PKM.findById(id)
        return pokemon
    })

    app.put("/pokemons/:id", async (req: any) => {
        const { id } = req.params
        const { name, type, level } = req.body
        const pokemon = await PKM.findByIdAndUpdate(id, { name, type, level }, { new: true })
        return pokemon
    })

    app.delete("/pokemons/:id", async (req: any) => {
        const { id } = req.params
        const pokemon = await PKM.findByIdAndDelete(id)
        return pokemon
    })
}