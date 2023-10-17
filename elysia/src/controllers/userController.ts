import ELysia from "elysia";
const USER = require('../models/userModel.ts');
const jwt = require('jsonwebtoken');

//Create and save a new User with an unique username
export const userController = (app: ELysia) => {
    app.post("/users", async (req: any) => {
        const { username, password } = req.body
        const newUser = new USER({ username, password })
        await newUser.save()
        return newUser
    })

    //Login with an existing User
    app.post("/users/login", async (req: any) => {
        const { username, password } = req.body
        const user = await USER.findOne({ username })
        if (!user) {
            return "User not found"
        }
        if (user.password !== password) {
            return "Wrong password"
        }
        const token = jwt.sign({ _id: user._id }, "secret")
        return token
    })

    //Get all Users
    app.get("/users", async () => {
        const users = await USER.find()
        return users
    })

    //Get a specific User
    app.get("/users/:id", async (req: any) => {
        const { id } = req.params
        const user = await USER.findById(id)
        return user
    })

    //Update a specific User
    app.put("/users/:id", async (req: any) => {
        const { id } = req.params
        const { username, password } = req.body
        const user = await USER.findByIdAndUpdate(id, { username, password }, { new: true })
        return user
    })

    //Delete a specific User
    app.delete("/users/:id", async (req: any) => {
        const { id } = req.params
        const user = await USER.findByIdAndDelete(id)
        return user
    })
}