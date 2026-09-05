import { Transform } from "class-transformer"
import { IsNotEmpty, IsNumber, IsString } from "class-validator"


export class CreateDirectorDto {

    @IsNotEmpty()
    @IsString()
    name!: string

    @IsNotEmpty()
    @IsNumber()
    @Transform(({value}) => Number(value))
    age!: number
}
