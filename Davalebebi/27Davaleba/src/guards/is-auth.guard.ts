import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

@Injectable()
export class IsAuthGuard implements CanActivate{
    constructor(private jwtService: JwtService){}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest()
        const token = this.getTokenFromHeaders(req.headers)
        if(!token){
            throw new UnauthorizedException("No Permission")
        }

        try{
            const payLoad = this.jwtService.verify(token, {secret: process.env.JWT_SECRET})
            req.userId = payLoad.userId
        }catch(e){
            throw new UnauthorizedException("No Permission")
        }

        return true
    }

    getTokenFromHeaders(headers){
        const authorization = headers["authorization"]
        if(!authorization){
            return null
        }

        const [type, token] = authorization.split(" ")
        if(!token){
            return null
        }
        return type === "Bearer" ? token : null
    }
}