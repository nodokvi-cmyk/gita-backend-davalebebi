import { PartialType } from "@nestjs/mapped-types";
import { CreateUserDto } from "./create-user.dto";
import { SignUpDto } from "../../auth/dto/sign-up.dto";


export class UpdateUserDto extends PartialType(SignUpDto){}