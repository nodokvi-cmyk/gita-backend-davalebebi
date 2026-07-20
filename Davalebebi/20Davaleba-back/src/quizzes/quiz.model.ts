import mongoose from "mongoose"

export type QuestionType = {
    question: string,
    options: string[],
    correctAnswer: number
}

export type QuizType = {
    title: string,
    category: string,
    questions: QuestionType[]
}

const questionSchema = new mongoose.Schema<QuestionType>({
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

const quizSchema = new mongoose.Schema<QuizType>({
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    questions: [questionSchema]
})

const quizModel = mongoose.model<QuizType>("quiz", quizSchema)
export default quizModel