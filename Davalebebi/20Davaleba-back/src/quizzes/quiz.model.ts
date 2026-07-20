import mongoose from "mongoose"

export type QuizType = {
    question: string,
    options: string[]
    correctAnswer: number
}

const quizSchema = new mongoose.Schema<QuizType>({
    question: {
        type: String,
        required: true
    },
    options: [{
        type: String,
        required: true
    }],
    correctAnswer: {
        type: Number,
        required: true
    }
})

const quizModel = mongoose.model<QuizType>("quiz", quizSchema)
export default quizModel