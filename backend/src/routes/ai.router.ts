import BaseRouter, {type RouteConfig} from "./router.js";
import AuthMiddleware from "../middlewares/auth.middleware.js";
import aiService from "../services/ai.service.js";

class AiRoutes extends BaseRouter{
    protected routes(): RouteConfig[] {
        return[
            {
                method:'post',
                path:'/ai',
                middlewares:[
                    AuthMiddleware.authenticateUser
                ],
                handler: aiService.ask
            },
        ]
    }
}

export default new AiRoutes().router