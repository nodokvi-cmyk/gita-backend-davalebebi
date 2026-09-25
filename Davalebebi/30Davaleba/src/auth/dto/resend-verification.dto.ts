import { PickType } from "@nestjs/mapped-types";
import { VerifyUserDto } from "./verify-user.dto";


export class ResendVerificationDto extends PickType(VerifyUserDto, ["email"]){}