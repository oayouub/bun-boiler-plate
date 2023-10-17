import { Elysia } from "elysia";
import { pkmRouter } from "./router/pkmRouter";
import { userRouter } from "./router/pkmRouter";
export const app = new Elysia()

const port = 3000
const mongoose = require("mongoose")
mongoose.connect('mongodb+srv://aouahid123:abcdefg@cluster0.lsvegxn.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true })
.then(() => console.log("🦊 Connected to MongoDB"))
.catch((err: any) => console.log(err))

const cors = require('cors')
cors(app)

const bodyParser = require('body-parser')
bodyParser(app)

//Set up routes
pkmRouter(app);
userRouter(app);

app.get("/", () => "Hello Elysia")

app.listen(port, () => console.log(`🦊 Elysia is running at http://localhost:${port}`))

