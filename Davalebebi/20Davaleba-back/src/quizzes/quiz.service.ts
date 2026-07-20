import quizModel from "./quiz.model.js"


const getAllQuizzes = async () => {
    const quizzes = await quizModel.find()
    return quizzes
}

export default {getAllQuizzes}