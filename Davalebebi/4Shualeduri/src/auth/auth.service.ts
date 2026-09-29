import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../users/schema/user.schema.js';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { SignUpInput } from './dto/sign-up.input.js';
import * as bcrypt from "bcrypt"
import { SignUpPayload } from './payload/sign-up.payload.js';
import { SignInInput } from './dto/sign-in.inputs.js';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        private jwtService: JwtService
    ){}

    async signUp(signUpInput: SignUpInput){
        const existingUser = await this.userModel.findOne({email: signUpInput.email})
        if(existingUser) throw new BadRequestException("This email is already in use")

        const hashedPassword = await bcrypt.hash(signUpInput.password, 10)

        const newUser = await this.userModel.create({
            ...signUpInput,
            password: hashedPassword
        })

        const payLoad = {
            userId: newUser._id
        }
        
        const token = await this.jwtService.signAsync(payLoad, {expiresIn: "1h"})

        return {accessToken: token, user: newUser}
    }

    async signIn(signInInput: SignInInput){
        const existingUser = await this.userModel.findOne({email: signInInput.email}).select("+password")
        if(!existingUser) throw new BadRequestException("Email or Password is incorrect")

        const isCorrectPassword = await bcrypt.compare(signInInput.password, existingUser.password)
        if(!isCorrectPassword) throw new BadRequestException("Email or Password is incorrect")

        const payLoad = {
            userId: existingUser._id
        }
        
        const token = await this.jwtService.signAsync(payLoad, {expiresIn: "1h"})   
        
        return {accessToken: token}
    }

    async getCurrentUser(userId: string){
        const user = await this.userModel.findById(userId)
        if(!user) throw new NotFoundException("User not found")
        
        return user
    }
}
