import { type Request, type Response, type RequestHandler } from "express";
import AiService from '../controllers/ai.controller.js'

class AiController {
    public ask: RequestHandler = async (req, res) => {
        try{
            const {question} = req.body
            if (!question){
                res.status(400).json({
                    message:"question is required"
                })
                return
            }
            const answer = await AiService.ask(question)
            res.json({
                answer
            })
        }catch(error){
            console.log(error)
            res.status(500).json({
                message:'Iternal error server'
            })
        }
    }
}
export default new AiController()