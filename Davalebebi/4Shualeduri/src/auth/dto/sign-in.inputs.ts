import { InputType, PickType } from "@nestjs/graphql";
import { SignUpInput } from "./sign-up.input.js";

@InputType()
export class SignInInput extends PickType(SignUpInput, ["email", "password"]){}