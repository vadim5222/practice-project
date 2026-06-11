import express, {type Express } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/auth.router.js";
import appConfig from "./config/app.config.js";
import userRoutes from "./routes/user.router.js";


class App {
    private app: Express;

    constructor() {
        this.app = express()
        this.initMiddlewares();
        this.initRoutes()
    }

    private initMiddlewares() {
        this.app.use(express.json())
        this.app.use(cookieParser())
        this.app.use(cors({
            origin: [
                'http://localhost:3000',
            ],
            methods: ['GET', 'POST', 'DELETE'],
            credentials: true
        }))
    }

    private initRoutes() {
        this.app.use('/api/auth/', authRoutes)
        this.app.use('/api/user/', userRoutes)
    }

    public start() {
        const {port, host} = appConfig;

        this.app.listen(port, host, () => {
            console.log(`Сервен запущен на http://${host}:${port}`)
        })
    }
}

export default App