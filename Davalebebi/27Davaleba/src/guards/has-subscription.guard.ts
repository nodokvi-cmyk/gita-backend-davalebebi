import { BadRequestException, CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { Request } from "express";
import { Observable } from "rxjs";
import { UserService } from "../users/user.service";


// @Injectable()
// export class HasSubscriptionByEmail implements CanActivate{
//     constructor(private readonly userService: UserService){}
//     async canActivate(context: ExecutionContext): Promise<boolean>  {
//         const req: Request = context.switchToHttp().getRequest()

//         req["hasSubscription"] = false

//         const email = req.headers["email"]
//         if(!email || typeof email !== "string"){
//             return true
//         }

//         const user = await this.userService.findByEmail(email)

//         if(user && new Date(user.subscriptionEndDate) > new Date()){
//             req["hasSubscription"] = true
//         }

//         return true
//     }
// }