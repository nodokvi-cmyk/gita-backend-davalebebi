import { Transform } from "class-transformer"
import { IsNotEmpty, IsNumber, IsString } from "class-validator"


export class CreateFilmDto {
    
    @IsNotEmpty()
    @IsString()
    title!: string

    @IsNotEmpty()
    @IsString()
    genre!: string

    @IsNotEmpty()
    @IsNumber()
    @Transform(({value}) => Number(value))
    year!: number

    @IsNotEmpty()
    @IsString()
    director!: string
}
