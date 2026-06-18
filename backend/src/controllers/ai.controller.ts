import OpenAI from "openai";

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
})

class AiService {
    async ask(question: string){
        const response = await client.responses.create({
            model: 'gpt-4',
            input: question
        })

        return response.output_text
    }
}

export default new AiService();