import { Request, Response, Router } from "express";
import quizService from "./quiz.service.js"
import { StatusCodes } from "../shared/statuscodes.js";

export const quizRouter = Router()

quizRouter.get("/", async (req:Request, res:Response) => {
    const quizzes = await quizService.getAllQuizzes()
    res.status(StatusCodes.SUCCESS).json(quizzes)
})