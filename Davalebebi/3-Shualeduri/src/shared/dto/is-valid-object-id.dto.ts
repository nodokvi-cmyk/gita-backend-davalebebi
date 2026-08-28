import { IsMongoId } from "class-validator";


export class IsValidObjectId {
    @IsMongoId({message: "Use MongoDB ID"})
    id!: string
}