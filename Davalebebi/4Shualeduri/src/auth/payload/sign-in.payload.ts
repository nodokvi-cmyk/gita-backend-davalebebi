import { ObjectType, PickType } from "@nestjs/graphql";
import { SignUpPayload } from "./sign-up.payload.js";


@ObjectType()
export class SignInPayload extends PickType(SignUpPayload, ["accessToken"]){}